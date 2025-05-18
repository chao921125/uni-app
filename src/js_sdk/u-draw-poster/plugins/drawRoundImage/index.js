import { __async } from "../../chunk-GSFXI7XO.js";
const plugin = {
	name: "__ctx-drawRoundImage__",
	mounted: ({ ctx }) => {
		ctx.drawRoundImage = (url, x, y, w, h, r = 15) =>
			__async(void 0, null, function* () {
				var _a;
				ctx.save();
				(_a = ctx.setFillStyle) == null ? void 0 : _a.call(ctx, "transparent");
				ctx.fillStyle = "transparent";
				ctx.fillRoundRect(x, y, w, h, r);
				ctx.clip();
				const result = yield ctx.drawImage(url, x, y, w, h);
				ctx.restore();
				return result;
			});
	},
};
var drawRoundImage_default = () => plugin;
export { drawRoundImage_default as default };
