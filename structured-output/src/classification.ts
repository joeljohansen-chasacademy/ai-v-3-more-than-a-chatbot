// This example demonstrates classification with structured outputs
// We'll classify different musical instruments and provide additional context

import { GoogleGenAI, Type } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

async function classificationWithStructuredOutput() {
	const ai = new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});

	console.log("=== Example 1: Simple Classification ===");
	const response1 = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: "What type of instrument is an oboe?",
		config: {
			responseMimeType: "text/x.enum",
			responseSchema: {
				type: Type.STRING,
				enum: ["Percussion", "String", "Woodwind", "Brass", "Keyboard"],
			},
		},
	});

	console.log("Oboe classification:", response1.text);

	console.log(
		"\n=== Example 2: Multi-class Classification with Confidence ==="
	);
	const instruments = ["piano", "tomato"];

	for (const instrument of instruments) {
		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: `Classify the ${instrument} and provide your confidence level.`,
			config: {
				responseMimeType: "application/json",
				responseSchema: {
					type: Type.OBJECT,
					properties: {
						instrument: {
							type: Type.STRING,
							description: "The name of the instrument",
						},
						category: {
							type: Type.STRING,
							enum: ["Percussion", "String", "Woodwind", "Brass", "Keyboard"],
							description: "The category of the instrument",
						},
						confidence: {
							type: Type.NUMBER,
							minimum: 0,
							maximum: 1,
							description: "Confidence level from 0 to 1",
						},
						reasoning: {
							type: Type.STRING,
							description: "Brief explanation for the classification",
						},
					},
					required: ["instrument", "category", "confidence", "reasoning"],
				},
			},
		});

		if (!response.text) {
			throw new Error("No response text received");
		}

		const classification = JSON.parse(response.text);
		console.log(
			`${classification.instrument}: ${classification.category} (confidence: ${(
				classification.confidence * 100
			).toFixed(1)}%)`
		);
		console.log(`  Reasoning: ${classification.reasoning}`);
	}

	console.log("\n=== Example 3: Sentiment Analysis ===");
	const reviews = [
		"I absolutely love this violin! The sound is beautiful and it's perfect for beginners.",
		"This trumpet is okay, but the build quality could be better for the price.",
		"Terrible product. Broke after just one week of use. Would not recommend.",
	];

	for (const review of reviews) {
		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: `Analyze the sentiment of this product review: "${review}"`,
			config: {
				responseMimeType: "application/json",
				responseSchema: {
					type: Type.OBJECT,
					properties: {
						sentiment: {
							type: Type.STRING,
							enum: ["Positive", "Negative", "Neutral"],
							description: "The overall sentiment of the review",
						},
						score: {
							type: Type.NUMBER,
							minimum: -1,
							maximum: 1,
							description:
								"Sentiment score from -1 (very negative) to 1 (very positive)",
						},
						keyPhrases: {
							type: Type.ARRAY,
							items: {
								type: Type.STRING,
							},
							description: "Key phrases that influenced the sentiment",
						},
						summary: {
							type: Type.STRING,
							description: "Brief summary of the review sentiment",
						},
						recommendations: {
							type: Type.STRING,
							description: "What other products can be recommended.",
						},
					},
					required: [
						"sentiment",
						"score",
						"keyPhrases",
						"summary",
						"recommendations",
					],
				},
			},
		});

		if (!response.text) {
			throw new Error("No response text received");
		}

		const analysis = JSON.parse(response.text);
		console.log(`Review: "${review.substring(0, 50)}..."`);
		console.log(
			`Sentiment: ${analysis.sentiment} (score: ${analysis.score.toFixed(2)})`
		);
		console.log(`Key phrases: ${analysis.keyPhrases.join(", ")}`);
		console.log(`Summary: ${analysis.summary}\n`);
		console.log(`Recommendations: ${analysis.recommendations}\n`);
	}
}

classificationWithStructuredOutput();
