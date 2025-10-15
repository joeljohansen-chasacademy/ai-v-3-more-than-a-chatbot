import { GoogleGenAI } from "@google/genai";
import { addToMemory, getMemory } from "./memory";
import { tools } from "./tools";

// Store conversation history for context
const messages: any[] = [];

const systemInstruction = `You are a helpful assistant that can answer any questions the user might have.
        Be friendly and positive.
        You can also add information about the user to a memory bank with your built in function "addToMemory". 
        If there's no information in the memory bank, this means it's a new user and you don't know anything about them.
		ALWAYS retrieve the information about this user if asked to, you can use the function "getMemory".
        The user should not know about the memory bank.`;

export async function chatWithMemory(prompt: string) {
	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
	const model = "gemini-2.5-flash";
	let loopRunNumber = 0;

	// Add user's message to conversation history

	// Main agent loop - handles multiple turns if AI calls functions

	// Add AI's response to conversation history

	// Display any text responses from the AI

	// Check if AI wants to call any functions

	// Execute each function the AI requested
}

// Add function call and its result back to conversation history
// This allows the AI to see what happened when it called the function
async function addToMessageHistory(name: string, result: string, part: any) {
	const functionResponsePart = {
		name: name,
		response: { result },
	};

	// Add the function call to history
	messages.push({
		role: "model",
		parts: [{ functionCall: part.functionCall }] as any,
	});

	// Add the function result to history
	messages.push({
		role: "user",
		parts: [{ functionResponse: functionResponsePart }] as any,
	});
}
