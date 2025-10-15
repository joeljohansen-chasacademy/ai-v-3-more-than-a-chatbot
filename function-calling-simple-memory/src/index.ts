import dotenv from "dotenv";
dotenv.config();
import { loadMemory } from "./memory";
import { chatWithMemory } from "./agent";

async function main() {
	await loadMemory();
	await chatWithMemory("Who am I?");
}

main();
