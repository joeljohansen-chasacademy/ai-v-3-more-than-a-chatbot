import { GoogleGenAI, Type } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

async function informationExtraction() {
	const ai = new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});

	// Vi har data
	const unstructuredText = `
	Johann Sebastian Bach was a German composer and musician of the Baroque period. Born on March 31, 1685, in Eisenach, Germany, 
	Bach came from a family of musicians and became one of the most influential composers in Western music history. 
	He died on July 28, 1750, in Leipzig, Germany, at the age of 65. Bach's works include the Brandenburg Concertos, 
	the Goldberg Variations, the Mass in B minor, and hundreds of cantatas. He was known for his mastery of counterpoint, 
	harmony, and musical form. Bach held various positions as organist and music director throughout his life, including 
	positions in Weimar, Köthen, and Leipzig. His music was largely forgotten after his death but was rediscovered in 
	the 19th century and is now considered among the greatest achievements in Western music.
	`;

	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: `Extract structured information about the composer from this text: ${unstructuredText}`,
		config: {
			responseMimeType: "application/json",
			responseSchema: {
				type: Type.OBJECT,
				properties: {
					name: {
						type: Type.STRING,
						description: "Full name of the composer",
					},
					dateOfBirth: {
						type: Type.STRING,
						description: "Date of birth in YYYY-MM-DD format",
					},
					dateOfDeath: {
						type: Type.STRING,
						description: "Date of death in YYYY-MM-DD format",
					},
					ageAtDeath: {
						type: Type.NUMBER,
						description: "Age at death in years",
					},
					nationality: {
						type: Type.STRING,
						description: "Nationality or country of origin",
					},
					period: {
						type: Type.STRING,
						description: "Musical period or era",
					},
					notableWorks: {
						type: Type.ARRAY,
						items: {
							type: Type.STRING,
						},
						description: "List of famous compositions or works",
					},
					biography: {
						type: Type.STRING,
						description:
							"A concise biography summarizing key life events and achievements",
					},
					professions: {
						type: Type.ARRAY,
						items: {
							type: Type.STRING,
						},
						description: "Professional roles and positions held",
					},
				},
				required: [
					"name",
					"dateOfBirth",
					"dateOfDeath",
					"nationality",
					"period",
					"biography",
				],
			},
		},
	});

	if (!response.text) {
		throw new Error("No response text received");
	}

	const composerData = JSON.parse(response.text);

	console.log("Extracted Composer Information:");
	console.log("==============================");
	console.log(`Name: ${composerData.name}`);
	console.log(`Born: ${composerData.dateOfBirth}`);
	console.log(
		`Died: ${composerData.dateOfDeath} (age ${composerData.ageAtDeath})`
	);
	console.log(`Nationality: ${composerData.nationality}`);
	console.log(`Period: ${composerData.period}`);
	console.log(`\nNotable Works:`);
	composerData.notableWorks.forEach((work: string, index: number) => {
		console.log(`  ${index + 1}. ${work}`);
	});
	console.log(`\nProfessions:`);
	composerData.professions.forEach((profession: string, index: number) => {
		console.log(`  ${index + 1}. ${profession}`);
	});
	console.log(`\nBiography:`);
	console.log(composerData.biography);

	console.log("\n" + "=".repeat(50));
	console.log("Raw JSON Response:");
	console.log(JSON.stringify(composerData, null, 2));
}

informationExtraction();
