import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getMarketPrices, getAgriculturalNews } from "./services/marketData";
import { analyzeCropImage } from "./services/geminiService";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.get("/api/prices", async (_req, res) => {
    try {
      const prices = await getMarketPrices();
      res.json(prices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prices" });
    }
  });

  app.get("/api/news", async (_req, res) => {
    try {
      const news = await getAgriculturalNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post("/api/scan", async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ message: "Image data is required" });
      }

      const result = await analyzeCropImage(image);
      res.json(result);
    } catch (error) {
      console.error("Scan API Error:", error);
      res.status(500).json({ message: "Failed to analyze image" });
    }
  });

  return httpServer;
}
