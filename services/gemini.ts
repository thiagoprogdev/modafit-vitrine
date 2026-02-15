
import { GoogleGenAI, Type } from "@google/genai";

export interface LiveData {
  price: number;
  available: boolean;
  lastCheck: string;
  groundingUrls?: { title?: string; uri: string }[];
}

export interface ProductInfo {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
  rating: number;
  reviews: number;
  groundingUrls?: { title?: string; uri: string }[];
}

// Syncs product price and availability using Google Search grounding
export async function syncProductData(productName: string, currentPrice: number): Promise<LiveData> {
  // Always create instance inside the function as per guidelines to ensure fresh API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Acesse as informações mais recentes na internet para o produto: "${productName}".
    O preço que tenho registrado é R$ ${currentPrice}.
    Verifique se houve alteração no preço praticado na Amazon Brasil hoje.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            price: { type: Type.NUMBER, description: 'Preço atual do produto' },
            available: { type: Type.BOOLEAN, description: 'Disponibilidade em estoque' },
            lastCheck: { type: Type.STRING, description: 'Data e hora da verificação' }
          },
          required: ["price", "available", "lastCheck"]
        }
      },
    });

    // Extract grounding URLs as per Search Grounding rules
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingUrls = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title,
      uri: chunk.web?.uri
    })).filter((link: any) => link.uri);

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return { ...data, groundingUrls };
  } catch (error) {
    console.error("Erro na sincronização Live:", error);
    return { price: currentPrice, available: true, lastCheck: new Date().toLocaleTimeString() };
  }
}

// Fetches detailed product information from a search query or Amazon URL
export async function fetchProductInfo(query: string): Promise<ProductInfo> {
  // Always create instance inside the function as per guidelines to ensure fresh API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Encontre informações detalhadas sobre o produto: "${query}" na Amazon Brasil. 
  Forneça o título oficial, uma breve descrição, preço atual em BRL (numérico), 
  uma URL de imagem do produto, link de afiliado, nota média (rating) e número de avaliações.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            price: { type: Type.NUMBER },
            imageUrl: { type: Type.STRING },
            affiliateLink: { type: Type.STRING },
            rating: { type: Type.NUMBER },
            reviews: { type: Type.NUMBER }
          },
          required: ["title", "description", "price", "imageUrl", "affiliateLink", "rating", "reviews"]
        }
      },
    });

    // Extract grounding URLs as per Search Grounding rules
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingUrls = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title,
      uri: chunk.web?.uri
    })).filter((link: any) => link.uri);

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return { ...data, groundingUrls };
  } catch (error) {
    console.error("Error fetching product info:", error);
    throw error;
  }
}
