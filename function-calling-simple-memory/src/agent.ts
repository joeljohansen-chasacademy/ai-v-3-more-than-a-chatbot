import { GoogleGenAI } from "@google/genai";
import { addToMemory, getMemory } from "./memory";
import { tools } from "./tools";

// Store conversation history for context
const messages: any[] = [];

const systemInstruction = `You are a helpful assistant that can answer any questions the user might have.
        Be friendly and positive.
        You can also add information about the user to a memory bank with your built in function "addToMemory". 
		BEFORE ADDING INFORMATION: Load the memory with "getMemory" and if the information already is there, don't add it again.
        If there's no information in the memory bank, this means it's a new user and you don't know anything about them.
		ALWAYS retrieve the information about this user if asked to, you can use the function "getMemory".
        The user should not know about the memory bank.`;

export async function chatWithMemory(prompt: string) {
	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
	const model = "gemini-2.5-flash";
	let loopRunNumber = 0;

	// Add user's message to conversation history

	messages.push({
		role: "user",
		parts: [{ text: prompt }],
	});

	while (loopRunNumber < 10) {
		console.log("Loop number: ", loopRunNumber);
		console.log("=============== MESSAGES =================");
		console.log("Messages is: ", JSON.stringify(messages, null, 2));
		console.log("=============== MESSAGES END =================");
		loopRunNumber++;
		// Main agent loop - handles multiple turns if AI calls functions
		const response = await ai.models.generateContent({
			model,
			contents: messages,
			config: {
				systemInstruction: { text: systemInstruction },
				tools,
				thinkingConfig: { thinkingBudget: 0 },
			},
		});

		//console.log("Response is: ", JSON.stringify(response, null, 2));

		// Add AI's response to conversation history
		const assistantMessage = response.candidates?.[0].content;

		/*
	Assistant message kommer antingen vara:
	"content": {
        "parts": [
          {
            "functionCall": {
              "args": {
                "memoryType": "personal information",
                "memoryText": "The user's name is Joel."
              },
              "name": "addToMemory"
            }
          }
        ],
        "role": "model"
      },

	  eller:
	  "content": {
        "parts": [
          {
            "text": "Här är modellens svar"
          }
        ],
        "role": "model"
      },
	*/

		messages.push(
			assistantMessage as {
				role: string;
				parts: {
					text: string;
					functionCall?: { name: string; args: any; id: string };
				}[];
			}
		);

		if (assistantMessage?.parts) {
			// Display any text responses from the AI
			assistantMessage.parts
				.filter((p) => p.text)
				.forEach((p) => console.log("Assistant response: ", p.text));

			const functionParts = assistantMessage.parts.filter(
				(p) => p.functionCall
			);

			if (functionParts.length === 0) {
				break;
			}

			// Check if AI wants to call any functions
			for (const part of functionParts) {
				const { name, args } = part.functionCall!;

				// Execute each function the AI requested
				if (name === "addToMemory") {
					const result = await addToMemory(
						args?.memoryText as string,
						args?.memoryType as string
					);
					console.log("Result from addToMemory: ", result);
					addToMessageHistory(name, result, part);
				} else if (name === "getMemory") {
					const result = await getMemory();
					console.log("Result from getMemory: ", result);
					addToMessageHistory(name, result, part);
				} else {
					console.warn("Unknown tool call");
				}
			}
		}
	}
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
