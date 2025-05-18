import "../../chunk-GSFXI7XO.js";
const plugin = {
	name: "__ctx-strokeRoundRect__",
	mounted: ({ ctx }) => {
		ctx.strokeRoundRect = (x, y, w, h, r) => ctx.roundRect(x, y, w, h, r, false, true);
	},
};
var strokeRoundRect_default = () => plugin;
export { strokeRoundRect_default as default };
