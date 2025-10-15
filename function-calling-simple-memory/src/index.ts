import dotenv from "dotenv";
dotenv.config();
import { loadMemory } from "./memory";
import { chatWithMemory } from "./agent";

async function main() {
	await loadMemory();
	//await chatWithMemory("Hello! Who am I?");
	/* await chatWithMemory(
		"My name is Joel and I am an educator and developer and composer."
	); */
	await chatWithMemory("My name is Joel and I work as a chef");
}

main();
