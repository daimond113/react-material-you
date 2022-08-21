import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "@emotion/react",
			babel: {
				plugins: ["@emotion/babel-plugin"],
			},
		}),
		dts(),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			name: "ReactMaterialYou",
			fileName: "react-material-you",
		},
		rollupOptions: {
			external: (id) =>
				["react", "react-dom"].includes(id) || id.startsWith("@emotion/"),
			plugins: [visualizer({ filename: "size-vis.html" })],
			output: {
				globals: {
					react: "React",
				},
			},
		},
	},
})
