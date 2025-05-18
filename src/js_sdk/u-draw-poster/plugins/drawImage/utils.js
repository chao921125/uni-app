import "../../chunk-GSFXI7XO.js";
function isBaseUrl(str) {
	return /^\s*data:(?:[a-z]+\/[\d+.a-z-]+(?:;[a-z-]+=[\da-z-]+)?)?(?:;base64)?,([\s\w!$%&'()*+,./:;=?@~-]*?)\s*$/i.test(str);
}
function isTmpUrl(str) {
	return /http:\/\/temp\/wx/.test(str);
}
function isNetworkUrl(str) {
	return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w#%&+,./:=?@^~-]*[\w#%&+/=?@^~-])?$/.test(str);
}
function downloadImgUrl(url) {
	const isLocalFile = isBaseUrl(url) || isTmpUrl(url) || !isNetworkUrl(url);
	return new Promise((resolve, reject) => {
		if (isLocalFile) return resolve(url);
		uni.downloadFile({
			url,
			success: (res) => resolve(res.tempFilePath),
			fail: reject,
		});
	});
}
export { downloadImgUrl, isBaseUrl, isNetworkUrl, isTmpUrl };
