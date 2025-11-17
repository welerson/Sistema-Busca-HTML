import { GoogleGenAI } from "@google/genai";
import { ResultData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROMPT_TEMPLATE = `
Você é um agente especialista em extração de dados. Sua tarefa é analisar o código-fonte HTML fornecido e extrair as informações solicitadas pelo usuário.

Você DEVE retornar os dados extraídos em um formato JSON válido.
- Se os dados forem tabulares ou uma lista de itens semelhantes, retorne um array de objetos JSON.
- Se os dados forem uma única informação, retorne um objeto JSON com uma chave descritiva.
- Se você não conseguir encontrar as informações solicitadas, retorne um array JSON vazio \`[]\` ou um objeto JSON com uma chave \`message\` explicando o motivo, como \`{"message": "A informação solicitada não pôde ser encontrada no HTML fornecido."}\`.

Não inclua quaisquer explicações, saudações ou formatação markdown (como \`\`\`json ... \`\`\`) em sua resposta. Apenas a saída JSON bruta.

---
CONSULTA DO USUÁRIO:
{query}

---
CÓDIGO-FONTE HTML:
{html}
`;

export const extractDataFromHtml = async (html: string, query: string): Promise<ResultData> => {
    try {
        const fullPrompt = PROMPT_TEMPLATE
            .replace('{query}', query)
            .replace('{html}', html);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });

        const rawText = response.text.trim();

        // Sometimes the model still wraps the output in markdown
        const cleanedText = rawText.replace(/^```json\s*|```$/g, '').trim();

        if (!cleanedText) {
             return { message: "A IA retornou uma resposta vazia." };
        }

        try {
            return JSON.parse(cleanedText);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            console.error("Raw response from AI:", rawText);
            // Return the raw text if it's not valid JSON, so the user can see what went wrong.
            return { message: "A IA retornou um JSON inválido.", response: rawText };
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Falha ao comunicar com a API do Gemini.");
    }
};
