import "../../chunk-GSFXI7XO.js";
const plugin = {
	name: "__ctx-roundRect__",
	mounted: ({ ctx }) => {
		ctx.roundRect = (x, y, w, h, r = 15, fill = false, stroke = false) => {
			if (r === 0) {
				if (stroke) ctx.strokeRect(x, y, w, h);
				if (fill) ctx.fillRect(x, y, w, h);
				return;
			}
			if (w < 2 * r) r = w / 2;
			if (h < 2 * r) r = h / 2;
			ctx.beginPath();
			ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + w - r, y);
			ctx.lineTo(x + w, y + r);
			ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
			ctx.lineTo(x + w, y + h - r);
			ctx.lineTo(x + w - r, y + h);
			ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
			ctx.lineTo(x + r, y + h);
			ctx.lineTo(x, y + h - r);
			ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
			ctx.lineTo(x, y + r);
			ctx.lineTo(x + r, y);
			if (stroke) ctx.stroke();
			if (fill) ctx.fill();
			ctx.closePath();
		};
	},
};
var roundRect_default = () => plugin;
export { roundRect_default as default };
