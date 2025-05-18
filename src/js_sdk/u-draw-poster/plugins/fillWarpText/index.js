import { __spreadValues } from "../../chunk-GSFXI7XO.js";
const plugin = {
	name: "__ctx-fillWarpText__",
	mounted: ({ ctx }) => {
		ctx.fillWarpText = (config) => {
			const _config = (config = __spreadValues(
				{
					maxWidth: 100,
					layer: 2,
					lineHeight: +ctx.font.replace(/[^\d.]/g, ""),
					x: 0,
					y: +ctx.font.replace(/[^\d.]/g, "") / 1.2,
					separator: "",
					draw: true,
				},
				config,
			));
			const { content, separator, maxWidth, layer, lineHeight, draw, x, y } = _config;
			if (!content) throw new Error("warpFillText Error: text is empty string");
			const chr = content.split(separator);
			let rows = [];
			let timp = "";
			if (separator) {
				rows = chr;
			} else {
				for (let i = 0; i < chr.length; i++) {
					if (rows.length > layer) break;
					if (ctx.measureText(timp).width < maxWidth) {
						timp += chr[i];
					} else {
						i--;
						rows.push(timp);
						timp = "";
					}
				}
				if (timp) rows.push(timp);
				if (rows.length > layer) {
					rows = rows.slice(0, layer);
					const end = layer - 1;
					for (let i = 0; i < rows[end].length; i++) {
						const currentWidth = ctx.measureText(`${rows[end]}...`).width;
						if (currentWidth > maxWidth) {
							const strEnd = rows[end].length - 1;
							rows[end] = rows[end].slice(0, strEnd);
						} else {
							rows[end] += "...";
							break;
						}
					}
				}
			}
			return rows.map((text, index) => {
				const ellipsisWidth = ctx.measureText("...").width;
				const completeWidth = ctx.measureText(text).width;
				const width = text.endsWith("...") ? completeWidth - ellipsisWidth : completeWidth;
				const info = {
					text,
					y: y + index * lineHeight,
					x,
					h: lineHeight,
					w: width,
				};
				if (draw) ctx.fillText(info.text, info.x, info.y);
				return info;
			});
		};
	},
};
var fillWarpText_default = () => plugin;
export { fillWarpText_default as default };
