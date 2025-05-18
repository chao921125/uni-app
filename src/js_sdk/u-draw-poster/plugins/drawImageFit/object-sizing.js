import "../../chunk-GSFXI7XO.js";
function concreteRect(style, intrinsicSize, specifiedSize) {
	var _a, _b;
	const isContain = style.objectFit === "contain";
	const specifiedPosition = style.specifiedPosition || [0, 0];
	const intrinsicRatio = intrinsicSize.width / intrinsicSize.height;
	const specifiedRatio = specifiedSize.width / specifiedSize.height;
	let concreteScale = 1;
	if ((intrinsicRatio > specifiedRatio && style.objectFit === "contain") || (intrinsicRatio <= specifiedRatio && style.objectFit === "cover")) concreteScale = specifiedSize.width / intrinsicSize.width;
	else if ((intrinsicRatio > specifiedRatio && style.objectFit === "cover") || (intrinsicRatio <= specifiedRatio && style.objectFit === "contain")) concreteScale = specifiedSize.height / intrinsicSize.height;
	else throw new Error("Unkonwn concreteScale");
	const concreteRectWidth = intrinsicSize.width * concreteScale;
	const concreteRectHeight = intrinsicSize.height * concreteScale;
	const xRelativeOrigin = { left: 0, center: 0.5, right: 1 }[((_a = style.intrinsicPosition) == null ? void 0 : _a[0]) || "center"];
	const yRelativeOrigin = { top: 0, center: 0.5, bottom: 1 }[((_b = style.intrinsicPosition) == null ? void 0 : _b[1]) || "center"];
	let concreteRectLeft = (specifiedSize.width - concreteRectWidth) * xRelativeOrigin;
	let concreteRectTop = (specifiedSize.height - concreteRectHeight) * yRelativeOrigin;
	if (isContain) {
		concreteRectLeft += specifiedPosition[0];
		concreteRectTop += specifiedPosition[1];
	}
	const dist2src = (distX, distY) => [
		/* srcX = */
		(distX - concreteRectLeft) / concreteScale,
		/* srcY = */
		(distY - concreteRectTop) / concreteScale,
	];
	const [srcLeft, srcTop] = dist2src(0, 0);
	const [srcRight, srcBottom] = dist2src(specifiedSize.width, specifiedSize.height);
	return {
		sx: Math.max(srcLeft, 0),
		sy: Math.max(srcTop, 0),
		sw: Math.min(srcRight - srcLeft, intrinsicSize.width),
		sh: Math.min(srcBottom - srcTop, intrinsicSize.height),
		dx: isContain ? Math.max(concreteRectLeft, 0) : specifiedPosition[0],
		dy: isContain ? Math.max(concreteRectTop, 0) : specifiedPosition[1],
		dw: Math.min(concreteRectWidth, specifiedSize.width),
		dh: Math.min(concreteRectHeight, specifiedSize.height),
	};
}
export { concreteRect };
