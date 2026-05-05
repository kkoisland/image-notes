import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
	base: command === "build" ? "/image-notes/c5b84e1f034aca86/" : "/",
	plugins: [react(), tailwindcss()],
}));
