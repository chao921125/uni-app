import "../chunk-GSFXI7XO.js";
const globalPlugins = [];
function getCurrentInstance(selector) {
	const pages = getCurrentPages();
	const page = pages[pages.length - 1];
	if (page[`__dp_${selector}`]) return page[`__dp_${selector}`];
}
function setCurrentInstance(dp, ps) {
	const pages = getCurrentPages();
	const page = pages[pages.length - 1];
	page[`__dp_${dp.id}`] = dp;
	const onUnload = page.onUnload;
	page.onUnload = function () {
		ps.run("beforeUnmount");
		dp.stop();
		onUnload();
		ps.run("unmounted");
	};
}
function onReady(callback) {
	const pages = getCurrentPages();
	const page = pages[pages.length - 1];
	console.log(page.$vm);
}
export { getCurrentInstance, globalPlugins, onReady, setCurrentInstance };
