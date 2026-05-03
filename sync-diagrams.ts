import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const SRC = "/Users/keiko/Code/github/best-practice-note/tech_box/diagrams";
const DEST = "./public/diagrams";

mkdirSync(DEST, { recursive: true });

const srcFiles = new Set(
	readdirSync(SRC).filter((f) => f.endsWith(".excalidraw.svg")),
);
const destFiles = readdirSync(DEST).filter((f) =>
	f.endsWith(".excalidraw.svg"),
);

for (const file of destFiles) {
	if (!srcFiles.has(file)) {
		rmSync(join(DEST, file));
		console.log(`Removed: ${file}`);
	}
}

for (const file of srcFiles) {
	copyFileSync(join(SRC, file), join(DEST, file));
}

console.log(`Synced ${srcFiles.size} diagrams → ${DEST}`);
