import "../../chunk-GSFXI7XO.js";
import uQRCode from "./uQRCode";
const plugin = {
	name: "__ctx-drawQrCode__",
	mounted: ({ ctx, canvas }) => {
		ctx.drawQrCode = (options) => {
			uQRCode.make.call(uQRCode, canvas, ctx, options);
		};
	},
};
const errorCorrectLevel = uQRCode.errorCorrectLevel;
var drawQrCode_default = () => plugin;
export { drawQrCode_default as default, errorCorrectLevel };
