import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// In a real app, use existing process.env.GEMINI_API_KEY
// For this session, we will use the user-provided key if not found.
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyD9EaWBjRRWhbq-6l-Fygy2Rsb03nhVEQ4";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAgriculturalNews() {
    try {
        const prompt = `Gnerate 6 realistic and recent-sounding agricultural news headlines and summaries for farmers in Tamil Nadu, India.
    Return the response as a valid JSON array of objects with this structure:
    [
      {
        "id": number,
        "title": "English Title",
        "titleTa": "Tamil Translation of Title",
        "summary": "Short English summary",
        "summaryTa": "Short Tamil summary",
        "date": "YYYY-MM-DD" (use today's date)
      }
    ]
    Do not include markdown code blocks. Just the JSON string.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // Clean up if markdown is present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini News Error:", error);
        return null; // Fallback will be handled by the caller
    }
}

export async function generateMarketPrices() {
    try {
        const prompt = `Generate realistic market prices for these 6 crops in Tamil Nadu markets: Rice, Cotton, Turmeric, Coconut, Tomato, Onion.
    Return the response as a valid JSON array of objects with this structure:
    [
       {
        "id": number,
        "name": "English Name",
        "nameTa": "Tamil Name",
        "market": "City Name (e.g. Madurai)",
        "marketTa": "City Name in Tamil",
        "price": number (in INR),
        "trend": "up" | "down" | "stable"
      }
    ]
    Do not include markdown code blocks. Just the JSON string.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Price Error:", error);
        return null;
    }
}

export async function analyzeCropImage(imageBase64: string) {
    try {
        // We need to strip the header if present (e.g. "data:image/jpeg;base64,")
        const base64Data = imageBase64.split(',')[1] || imageBase64;

        const prompt = `Analyze this image of a crop. 
    1. Identify the crop name.
    2. Detect if there is any disease.
    3. If disease, name it, estimate severity, and provide a remedy.
    4. Provide confidence score (0-100).
    5. Translate all text fields to Tamil as well.
    
    Return JSON format:
    {
      "crop": "string",
      "cropTa": "string",
      "disease": "string",
      "diseaseTa": "string",
      "severity": "Low" | "Medium" | "High",
      "severityTa": "Tamil translation",
      "remedy": "string",
      "remedyTa": "string",
      "confidence": number
    }
    If no crop is found, return { "error": "No crop detected" }.
    Do not include markdown.`;

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/jpeg",
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const text = result.response.text();
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Scan Error:", error);
        return {
            crop: "Unknown",
            cropTa: "தெரியவில்லை",
            disease: "Error analyzing image",
            diseaseTa: "பிழை",
            severity: "Unknown",
            severityTa: "தெரியவில்லை",
            remedy: "Please try again.",
            remedyTa: "மீண்டும் முயற்சிக்கவும்.",
            confidence: 0
        };
    }
}
