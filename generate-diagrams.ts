import {
	existsSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

const DIAGRAMS_DIR = "./public/diagrams";
const OUTPUT = "./public/diagrams.json";

function toTitle(filename: string): string {
	const base = filename.replace(".excalidraw.svg", "");
	return base
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function toDate(filePath: string): string {
	const stat = statSync(filePath);
	const date = stat.birthtime.getTime() > 0 ? stat.birthtime : stat.mtime;
	return date.toISOString().split("T")[0];
}

type Diagram = {
	id: string;
	title: string;
	filename: string;
	path: string;
	createdAt: string;
	categories?: string[];
	hidden?: boolean;
};

const existing: Record<string, Diagram> = {};
if (existsSync(OUTPUT)) {
	const data = JSON.parse(readFileSync(OUTPUT, "utf-8")) as Diagram[];
	for (const d of data) {
		existing[d.filename] = d;
	}
}

const files = readdirSync(DIAGRAMS_DIR)
	.filter((f) => f.endsWith(".excalidraw.svg"))
	.sort();

const diagrams = files.map((filename) => {
	const filePath = join(DIAGRAMS_DIR, filename);
	if (existing[filename]) {
		const { updatedAt: legacyDate, ...rest } = existing[filename] as Diagram & {
			updatedAt?: string;
		};
		return {
			...rest,
			id: rest.id ?? randomUUID(),
			createdAt: rest.createdAt ?? legacyDate ?? toDate(filePath),
		};
	}
	return {
		id: randomUUID(),
		title: toTitle(filename),
		filename,
		path: `diagrams/${filename}`,
		createdAt: toDate(filePath),
	};
});

writeFileSync(OUTPUT, `${JSON.stringify(diagrams, null, "\t")}\n`);
execSync(`pnpm exec biome format --write ${OUTPUT}`, { stdio: "ignore" });
console.log(`Generated ${diagrams.length} diagrams → ${OUTPUT}`);
