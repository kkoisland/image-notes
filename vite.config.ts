import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
	base: command === "build" ? "/diagram-notes/c0e725e58e9b8e30/" : "/",
	plugins: [react(), tailwindcss()],
}));
