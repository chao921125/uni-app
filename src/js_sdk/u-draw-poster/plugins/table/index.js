import { __spreadValues } from "../../chunk-GSFXI7XO.js";
var table_default = (options) => {
	const plugin = {
		name: "__dp-table__",
		beforeMount: (dp) => {
			var _a, _b, _c;
			dp.table = {
				height: (_a = options == null ? void 0 : options.height) != null ? _a : 0,
				padding: (_b = options == null ? void 0 : options.padding) != null ? _b : 8,
				margin: (_c = options == null ? void 0 : options.margin) != null ? _c : 0,
			};
		},
		mounted: (dp) => {
			dp.createLayer = (afterOptions, rowList) => {
				const height = dp.table.height;
				const margin = dp.table.margin;
				const padding = dp.table.padding;
				const containerWidth = dp.canvas.width - margin * 2;
				const options2 = __spreadValues(
					{
						background: "#fff",
						columnY: height || margin,
						self: true,
						line: true,
						lineHeight: 0,
						border: true,
					},
					afterOptions,
				);
				const baseRowOptions = {
					text: "",
					font: "24px sans-serif",
					color: "#333",
					width: 0,
					align: "left",
				};
				let maxRowHeight = 0;
				let columnOffsetX = margin;
				const layers = rowList.map((afterRowOptions = {}, index) => {
					const rowOptions = __spreadValues(__spreadValues({}, baseRowOptions), afterRowOptions);
					let columnX = 0;
					let columnW = 0;
					let fontOffsetX = 0;
					let fontMaxWidth = 100;
					options2.lineHeight = options2.lineHeight || Number(rowOptions.font.replace(/[^\d.]/g, ""));
					if (options2.self) {
						columnX = containerWidth - containerWidth / (index + 1) + margin;
						columnW = containerWidth / rowList.length;
						if (columnX > 0 && columnX < containerWidth - columnW) columnX = columnW * index + margin;
						if (rowOptions.align === "left") fontOffsetX = columnX + padding;
						if (rowOptions.align === "center") fontOffsetX = columnX + columnW / 2;
						if (rowOptions.align === "right") fontOffsetX = columnX + columnW - padding;
						fontMaxWidth = columnW - padding * 3;
					}
					if (!options2.self) {
						columnW = rowOptions.width;
						columnX = columnOffsetX;
						fontMaxWidth = columnW - padding * 3;
						if (rowOptions.align === "left") fontOffsetX = columnOffsetX + padding;
						if (rowOptions.align === "center") fontOffsetX = columnOffsetX + rowOptions.width / 2;
						if (rowOptions.align === "right") fontOffsetX = columnOffsetX + rowOptions.width - padding;
						columnOffsetX += rowOptions.width;
					}
					dp.ctx.font = rowOptions.font;
					const fonts = dp.ctx.fillWarpText({
						content: rowOptions.text,
						maxWidth: fontMaxWidth,
						lineHeight: options2.lineHeight,
						x: fontOffsetX,
						y: options2.columnY,
						layer: 10,
						draw: false,
					});
					const rowHeight = options2.lineHeight * fonts.length + padding * 3;
					if (rowHeight > maxRowHeight) maxRowHeight = rowHeight;
					return {
						font: rowOptions.font,
						color: rowOptions.color,
						align: rowOptions.align,
						border: options2.border,
						background: options2.background,
						lineHeight: options2.lineHeight,
						line: options2.line,
						fonts,
						columnY: options2.columnY,
						columnX,
						columnW,
						columnH: maxRowHeight,
						margin,
						padding,
					};
				});
				dp.draw((ctx) =>
					layers.forEach((rowOptions) => {
						ctx.font = rowOptions.font;
						ctx.fillStyle = rowOptions.background;
						ctx.strokeStyle = "#333";
						ctx.textBaseline = "middle";
						ctx.textAlign = rowOptions.align;
						ctx.fillRect(rowOptions.columnX, rowOptions.columnY, rowOptions.columnW, rowOptions.columnH);
						if (rowOptions.border) dp.ctx.strokeRect(margin, rowOptions.columnY, dp.canvas.width - margin, maxRowHeight);
						if (rowOptions.line && rowOptions.columnX !== margin) {
							ctx.moveTo(rowOptions.columnX, rowOptions.columnY);
							ctx.lineTo(rowOptions.columnX, rowOptions.columnY + rowOptions.columnH);
							ctx.stroke();
							ctx.beginPath();
						}
						ctx.fillStyle = rowOptions.color;
						rowOptions.fonts.forEach((fontInfo) => {
							const textTotal = rowOptions.fonts.length - 1;
							const textMiddleY = (textTotal * rowOptions.lineHeight) / 2;
							let fontOffsetY = fontInfo.y + rowOptions.columnH / 2;
							fontOffsetY -= textMiddleY;
							ctx.fillText(fontInfo.text, fontInfo.x, fontOffsetY);
						});
					}),
				);
				if (options2.columnY === 0 || options2.columnY === margin) maxRowHeight += margin;
				dp.table.height += maxRowHeight;
				return maxRowHeight;
			};
			const render = dp.render;
			dp.render = function () {
				return new Promise((resolve, reject) => {
					setTimeout(() => render().then(resolve).catch(reject), 20);
				});
			};
		},
		created: (dp) => (dp.table.height = 0),
	};
	return plugin;
};
export { table_default as default };
