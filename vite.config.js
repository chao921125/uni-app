import { defineConfig } from "vite";
import path from "path";
import uni from "@dcloudio/vite-plugin-uni";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [uni()],
	build: {
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: false,
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ["legacy-js-api"],
				api: "modern-compiler", // or "modern"
			},
			sass: {
				silenceDeprecations: ["legacy-js-api"],
				api: "modern-compiler", // or "modern"
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
		// dedupe: "", // 一般SSR+ESM使用
		// conditions: "",
		// mainFields: "",
		// extensions: "",
		// preserveSymlinks: "",
	},
	server: {
		port: 2223,
		strictPort: true,
		open: true,
		proxy: {
			"/api": {
				target: "http://jsonplaceholder.typicode.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
