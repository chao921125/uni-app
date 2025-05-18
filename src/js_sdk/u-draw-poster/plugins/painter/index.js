import { __async } from "../../chunk-GSFXI7XO.js";
const plugin = {
	name: "__dp-painter__",
	mounted: (dp) => {
		dp.painter = (contents) => {
			dp.draw((ctx) =>
				__async(void 0, null, function* () {
					var _a, _b;
					for (let i = 0; i < contents.length; i++) {
						const info = contents[i];
						const left = (_a = info.left) != null ? _a : 0;
						const top = (_b = info.top) != null ? _b : 0;
						if (info.type === "rect") {
							const { background, width, height, radius } = info;
							ctx.fillStyle = background || "#000000";
							ctx.fillRoundRect(left, top, width, height, radius || 0);
						}
						if (info.type === "image") {
							yield ctx.drawImageFit(info.src, {
								objectFit: info.objectFit || "cover",
								intrinsicPosition: info.position || ["center", "center"],
								specifiedPosition: [left, top],
								specifiedSize: {
									width: info.width,
									height: info.height,
								},
								radius: info.radius,
							});
						}
						if (info.type === "text") {
							ctx.fillStyle = info.color || "#000000";
							ctx.font = `            ${info.fontStyle || "normal"}             ${info.fontWeight || "normal"}             ${info.fontSize || 30}             ${info.fontFamily || "serial"}            `;
							ctx.fillText(info.content, left, top, info.width);
						}
						if (info.type === "line-feed-text") {
							ctx.fillStyle = info.color || "#000000";
							ctx.font = `            ${info.fontStyle || "normal"}             ${info.fontWeight || "normal"}             ${info.fontSize || 30}             ${info.fontFamily || "serial"}            `;
							ctx.fillWarpText({
								x: info.left,
								y: info.top,
								layer: info.lineClamp,
								lineHeight: info.lineHeight,
								maxWidth: info.width,
								content: info.content,
							});
						}
						if (info.type === "qr-code") {
							if (typeof ctx.drawQrCode !== "function") {
								console.error("--- \u5F53\u524D\u672A\u5F15\u5165qr-code\u6269\u5C55, \u5C06\u81EA\u52A8\u7701\u7565\u8BE5\u4E8C\u7EF4\u7801\u7ED8\u5236 ---");
								return;
							}
							ctx.drawQrCode({
								x: left,
								y: top,
								size: info.size,
								text: info.content,
								margin: info.margin || 5,
								backgroundColor: info.backgroundColor || "#ffffff",
								foregroundColor: info.foregroundColor || "#000000",
							});
						}
					}
				}),
			);
		};
	},
};
var painter_default = () => plugin;
export { painter_default as default };
