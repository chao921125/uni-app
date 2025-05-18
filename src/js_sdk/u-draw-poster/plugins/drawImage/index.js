import { __async } from "../../chunk-GSFXI7XO.js";
import { downloadImgUrl } from "./utils";
const plugin = {
	name: "__ctx-drawImage__",
	mounted: ({ ctx, $options, canvas }) => {
		ctx.drawImageProto = ctx.drawImage;
		ctx.drawImage = (url, sx, sy, sh, sw, dx, dy, dh, dw) =>
			__async(void 0, null, function* () {
				const path = yield downloadImgUrl(url);
				let result = false;
				const baseDrawImage = (imageResource) => {
					const isFit = typeof dx === "number" && typeof dw === "number";
					if (isFit) ctx.drawImageProto(imageResource, sx, sy, sh, sw, dx, dy, dh, dw);
					else ctx.drawImageProto(imageResource, sx, sy, sh, sw);
				};
				if ($options.type === "context") {
					baseDrawImage(path);
					result = true;
				}
				if ($options.type === "2d") {
					result = yield new Promise((resolve) => {
						const image = canvas.createImage();
						image.src = path;
						image.onload = () => {
							baseDrawImage(image);
							resolve(true);
						};
						image.onerror = () => resolve(false);
					});
				}
				return result;
			});
	},
};
var drawImage_default = () => plugin;
export { drawImage_default as default };
