import { Type } from "@google/genai";

export const addToMemorySchema = {
	name: "addToMemory",
	description:
		"When the user tells you something factual about themselves, their life, or their preferences, call this function. Keep the memoryText short and concise.",
	parameters: {
		type: Type.OBJECT,
		properties: {
			memoryText: {
				type: Type.STRING,
				description: "Text to add to the memory bank",
			},
			memoryType: {
				type: Type.STRING,
				description:
					"The type of memory, eg. preferences, work, personal information etc.",
			},
		},
		required: ["memoryText", "memoryType"],
	},
};

export const getMemorySchema = {
	name: "getMemory",
	description:
		"Retrieve all information that you currently have about this user",
	parameters: {
		type: Type.OBJECT,
		properties: {},
	},
};

export const tools = [
	{ functionDeclarations: [addToMemorySchema, getMemorySchema] },
];
