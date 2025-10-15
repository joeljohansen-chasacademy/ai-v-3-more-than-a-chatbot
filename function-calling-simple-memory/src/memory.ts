import fs from "fs/promises";

export const MEMORY_FILE = "./memory_bank.json";

export type MemoryItem = {
	text: string;
	type: string;
};

let memoryBank: MemoryItem[] = [];

export async function loadMemory() {
	try {
		const content = await fs.readFile(MEMORY_FILE, "utf8");
		memoryBank = JSON.parse(content) as MemoryItem[];
	} catch {
		memoryBank = [];
	}
}

export async function saveMemory() {
	await fs.writeFile(MEMORY_FILE, JSON.stringify(memoryBank, null, 2));
}

export async function addToMemory(memoryText: string, memoryType: string) {
	memoryBank.push({ text: memoryText, type: memoryType });
	await saveMemory();
	return "Memory added: " + memoryText;
}

export function getMemory(): string {
	return memoryBank.map((m) => m.text + " (" + m.type + ")").join("\n");
}
