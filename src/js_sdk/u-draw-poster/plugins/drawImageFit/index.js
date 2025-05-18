import { __async, __spreadValues } from "../../chunk-GSFXI7XO.js";
import { promisify } from "../../utils";
import { concreteRect } from "./object-sizing";
const plugin = {
	name: "__ctx-drawImageFit__",
	mounted: ({ ctx }) => {
		ctx.drawImageFit = (url, options) =>
			__async(void 0, null, function* () {
				var _a, _b, _c;
				const imageInfo = yield promisify(uni.getImageInfo)({ src: url });
				const style = __spreadValues(
					{
						radius: 0,
						objectFit: "cover",
						intrinsicSize: { width: (_a = imageInfo == null ? void 0 : imageInfo.width) != null ? _a : 100, height: (_b = imageInfo == null ? void 0 : imageInfo.height) != null ? _b : 100 },
						specifiedSize: { width: 100, height: 100 },
						intrinsicPosition: ["center", "center"],
						specifiedPosition: [0, 0],
					},
					options,
				);
				const drawInfo = concreteRect(style, style.intrinsicSize, style.specifiedSize);
				if (style.radius > 0) {
					ctx.save();
					(_c = ctx.setFillStyle) == null ? void 0 : _c.call(ctx, "transparent");
					ctx.fillStyle = "transparent";
					ctx.fillRoundRect(style.specifiedPosition[0], style.specifiedPosition[1], style.specifiedSize.width, style.specifiedSize.height, style.radius);
					ctx.clip();
				}
				const result = yield ctx.drawImage(url, ...Object.values(drawInfo));
				if (style.radius > 0) ctx.restore();
				return result;
			});
	},
};
var drawImageFit_default = () => plugin;
export { drawImageFit_default as default };
