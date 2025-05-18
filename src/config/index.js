export default {
	loadFontFace: () => {
		uni.loadFontFace({
			family: "PingFang Bold",
			source: "url('https://github.com/chao921125/vue-vite/raw/main/src/assets/fonts/PingFang_Bold.ttf')",
		});
		uni.loadFontFace({
			family: "PingFang Regular",
			source: "url('https://github.com/chao921125/vue-vite/raw/main/src/assets/fonts/PingFang_Regular.ttf')",
		});
	},
};
