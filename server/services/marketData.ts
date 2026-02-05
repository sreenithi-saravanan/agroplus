import { generateAgriculturalNews, generateMarketPrices as fetchGeminiPrices } from "./geminiService";

// Types for our data
export interface MarketPrice {
    id: number;
    name: string;
    nameTa: string;
    market: string;
    marketTa: string;
    price: number;
    trend: 'up' | 'down' | 'stable';
}

export interface NewsItem {
    id: number;
    title: string;
    titleTa: string;
    summary: string;
    summaryTa: string;
    date: string;
}

// MOCK DATA (Fallback)
const FALLBACK_PRICES: MarketPrice[] = [
    { id: 1, name: "Rice (Paddy)", nameTa: "நெல் (பருவம்)", market: "Thanjavur", marketTa: "தஞ்சாவூர்", price: 2300, trend: "up" },
    { id: 2, name: "Cotton", nameTa: "பருத்தி", market: "Coimbatore", marketTa: "கோயம்புத்தூர்", price: 6750, trend: "down" },
    { id: 3, name: "Turmeric", nameTa: "மஞ்சள்", market: "Erode", marketTa: "ஈரோடு", price: 9600, trend: "up" },
    { id: 4, name: "Coconut", nameTa: "தேங்காய்", market: "Pollachi", marketTa: "பொள்ளாச்சி", price: 11800, trend: "down" },
    { id: 5, name: "Tomato", nameTa: "தக்காளி", market: "Ottanchatram", marketTa: "ஒட்டன்சத்திரம்", price: 2200, trend: "up" },
    { id: 6, name: "Onion", nameTa: "வெங்காயம்", market: "Dindigul", marketTa: "திண்டுக்கல்", price: 2600, trend: "up" }
];

const FALLBACK_NEWS: NewsItem[] = [
    { id: 1, title: "Govt Increases MSP for Kharif Crops", titleTa: "காரீஃப் பயிர்களுக்கான குறைந்தபட்ச ஆதரவு விலையை அரசு உயர்த்தியது", summary: "The Cabinet has approved a hike in MSP for paddy and other Kharif crops for the 2024-25 season.", summaryTa: "2024-25 பருவத்திற்கான நெல் மற்றும் பிற காரீஃப் பயிர்களுக்கான குறைந்தபட்ச ஆதரவு விலையை உயர்த்த அமைச்சரவை ஒப்புதல் அளித்துள்ளது.", date: new Date().toISOString().split('T')[0] },
    { id: 2, title: "Heavy Rains Predicted in Delta Districts", titleTa: "டெல்டா மாவட்டங்களில் கனமழை பெய்ய வாய்ப்பு", summary: "IMD has issued an orange alert for Thanjavur, Tiruvarur, and Nagapattinam districts.", summaryTa: "தஞ்சாவூர், திருவாரூர் மற்றும் நாகப்பட்டினம் மாவட்டங்களுக்கு வானிலை ஆய்வு மையம் ஆரஞ்சு எச்சரிக்கை விடுத்துள்ளது.", date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
];

export async function getMarketPrices(): Promise<MarketPrice[]> {
    // 1. Try Gemini AI Generation first
    const aiData = await fetchGeminiPrices();
    if (aiData && Array.isArray(aiData) && aiData.length > 0) {
        return aiData;
    }

    // 2. Fallback to Mock Data with random fluctuation
    return FALLBACK_PRICES.map(item => ({
        ...item,
        price: item.price + Math.floor(Math.random() * 100 - 50),
        trend: Math.random() > 0.5 ? 'up' : (Math.random() > 0.5 ? 'down' : 'stable') as 'up' | 'down' | 'stable'
    }));
}

export async function getAgriculturalNews(): Promise<NewsItem[]> {
    // 1. Try Gemini AI Generation first
    const aiNews = await generateAgriculturalNews();
    if (aiNews && Array.isArray(aiNews) && aiNews.length > 0) {
        return aiNews;
    }

    // 2. Fallback
    return FALLBACK_NEWS;
}
