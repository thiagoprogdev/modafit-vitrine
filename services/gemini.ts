
import { GoogleGenAI } from "@google/genai";

export async function generateMarketingCopy(productName: string, price: number): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Crie uma legenda curta, persuasiva e animada para o Instagram sobre o produto "${productName}" que custa R$ ${price}. 
  Use emojis fitness, fale dos benefícios para o treino e inclua hashtags relevantes. Foque em conversão de vendas.
  Adicione também um 'Call to Action' convidando a pessoa a clicar no link da bio ou comentar 'Eu quero'.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Erro ao gerar legenda.";
  } catch (error) {
    console.error("Erro ao gerar copy:", error);
    return "Não foi possível gerar a legenda no momento.";
  }
}
