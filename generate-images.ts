import {
	existsSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { basename, extname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

const IMAGES_DIR = "./public/images";
const OUTPUT = "./public/images.json";

const SUPPORTED_EXTENSIONS = new Set([
	".svg",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
]);

function toTitle(filename: string): string {
	const base = basename(filename, extname(filename));
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

type Image = {
	id: string;
	title: string;
	filename: string;
	path: string;
	createdAt: string;
	categories?: string[];
	hidden?: boolean;
};

const existing: Record<string, Image> = {};
if (existsSync(OUTPUT)) {
	const data = JSON.parse(readFileSync(OUTPUT, "utf-8")) as Image[];
	for (const d of data) {
		existing[d.filename] = d;
	}
}

const files = readdirSync(IMAGES_DIR)
	.filter((f) => SUPPORTED_EXTENSIONS.has(extname(f).toLowerCase()))
	.sort();

const images = files.map((filename) => {
	const filePath = join(IMAGES_DIR, filename);
	if (existing[filename]) {
		return {
			...existing[filename],
			id: existing[filename].id ?? randomUUID(),
		};
	}
	return {
		id: randomUUID(),
		title: toTitle(filename),
		filename,
		path: `images/${filename}`,
		createdAt: toDate(filePath),
	};
});

writeFileSync(OUTPUT, `${JSON.stringify(images, null, "\t")}\n`);
execSync(`pnpm exec biome format --write ${OUTPUT}`, { stdio: "ignore" });
console.log(`Generated ${images.length} images → ${OUTPUT}`);
