// import * as dateFns from 'date-fns';
// import i18n from '../plugins/i18n';
// import NativeShare from 'nativeshare';

export function formatMoneyMillionQuot(money) {
	money = money.toString().replace(/\\,/g, "");
	if (isNaN(money) || money == null || money === "null" || money === "0" || money === 0) return "0";
	money = Math.round(money * 100) / 100 / 1000000;
	if (money < 0) {
		// return '-' + formatMoneyInteger(Math.floor(Math.abs(money)) + '') + `${i18n.t('I18nUnit.million')}`;
	} else {
		// return formatMoneyInteger(Math.floor(money) + '') + `${i18n.t('I18nUnit.million')}`;
	}
}
// 整数位3位一个逗号，无小数位
export function formatMoneyIntegerQuot(money) {
	if (!money) return "0";
	money = money.toString().replace(/\\,/g, "");
	if (isNaN(money) || money == null || money === "null" || money === "0" || money === 0) return "0";
	money = Math.round(money * 100) / 100;
	if (money < 0) {
		return "-" + formatMoneyInteger(Math.floor(Math.abs(money)) + "");
	} else {
		return formatMoneyInteger(Math.floor(money) + "");
	}
}
// 整数位3位一个逗号，小数位保留两位四舍五入0.00
export function formatMoneyQuot(money) {
	if (!money) return "0.00";
	money = money.toString().replace(/\\,/g, "");
	if (isNaN(money) || money == null || money === "null" || money === "0" || money === 0) return "0";
	money = Math.round(money * 100) / 100;
	if (money < 0) {
		return "-" + formatMoneyInteger(Math.floor(Math.abs(money)) + "") + formatMoneyDecimal(Math.abs(money));
	} else {
		return formatMoneyInteger(Math.floor(money) + "") + formatMoneyDecimal(money);
	}
}
function formatMoneyInteger(money) {
	if (money.length <= 3) {
		return money === "" ? "0" : money;
	} else {
		let mod = money.length % 3;
		let output = mod === 0 ? "" : money.toString().substring(0, mod);
		for (let i = 0; i < Math.floor(money.length / 3); i++) {
			if (mod === 0 && i === 0) {
				output += money.toString().substring(mod + 3 * i, mod + 3 * i + 3);
			} else {
				output += "," + money.toString().substring(mod + 3 * i, mod + 3 * i + 3);
			}
		}
		return output;
	}
}
function formatMoneyDecimal(amount) {
	amount = Math.round((amount - Math.floor(amount)) * 100);
	if (amount === 0) {
		return ".00";
	}
	return amount < 10 ? ".0" + amount : "." + amount;
}

// 格式化百分比数值
export function formatRatioRide(value) {
	if (!/\d*\.?\d+/.test(value)) return "-";
	value = Number(value);
	if (isNaN(value) || value === null || value === "null" || value === 0 || value === "0") return "0";
	return Math.round(value * 10000) / 100 + "%";
}

const defaultFmsYear = "yyyy";
const defaultFmsMonth = "yyyy-MM";
const defaultFmsDate = "yyyy-MM-dd";
const defaultFmsDateTime = "yyyy-MM-dd HH:mm:ss";
const defaultFmsYMDHM = "yyyy-MM-dd HH:mm";
const nowDate = new Date();
// 日期格式化，接收传入的fms以及date
export function formatDate(value, fms) {
	if (!value) value = nowDate;
	if (!fms) fms = defaultFmsDate;
	return dateFns.format(new Date(value), fms);
}
// 日期格式化 所有日期格式为yyyy-MM-dd
export function formatMonthLine(value) {
	if (!value) return "";
	return dateFns.format(new Date(value), defaultFmsMonth);
}
export function formatYearLine(value) {
	if (!value) return "";
	return dateFns.format(new Date(value), defaultFmsYear);
}
export function formatDateLine(value) {
	if (!value) return "";
	return dateFns.format(new Date(value), defaultFmsDate);
}
export function formatDateTimeLineColon(value) {
	if (!value) return "";
	return dateFns.format(new Date(value), defaultFmsDateTime);
}
export function formatYMDHM(value) {
	if (!value) return "";
	return dateFns.format(new Date(value.replace("-", "/")), defaultFmsYMDHM);
}
export function formatNowDay2Text(value) {
	if (!value) return "";
	if (getNowDate() === dateFns.format(new Date(value), defaultFmsDate)) {
		// return `${i18n.t('I18nUnit.todayNow')}`;
	}
	return value;
}

// 根据天数获取日期
export function getDays(day) {
	if (!day) return dateFns.format(nowDate, defaultFmsDate);
	let returnDate = "";
	day = Number(day);
	if (day < 0) {
		day = Math.abs(day);
		returnDate = dateFns.format(dateFns.subDays(nowDate, day), defaultFmsDate);
		return returnDate;
	}
	returnDate = dateFns.format(dateFns.addDays(nowDate, day), defaultFmsDate);
	return returnDate;
}
// 根据月数获取日期
export function getMonths(month) {
	if (!month) return dateFns.format(nowDate, defaultFmsDate);
	let returnMonth = "";
	month = Number(month);
	if (month < 0) {
		month = Math.abs(month);
		returnMonth = dateFns.format(dateFns.subMonths(nowDate, month), defaultFmsDate);
		return returnMonth;
	}
	returnMonth = dateFns.format(dateFns.addMonths(nowDate, month), defaultFmsDate);
	return returnMonth;
}
// 根据年数获取日期
export function getYears(year) {
	if (!year) return dateFns.format(nowDate, defaultFmsDate);
	let returnYear = "";
	year = Number(year);
	if (year < 0) {
		year = Math.abs(year);
		returnYear = dateFns.format(dateFns.subYears(nowDate, year), defaultFmsDate);
		return returnYear;
	}
	returnYear = dateFns.format(dateFns.addYears(nowDate, year), defaultFmsDate);
	return returnYear;
}

export function getStartDateTime(value) {
	if (!value) return dateFns.format(nowDate, defaultFmsDateTime);
	return value + " 00:00:00";
}
export function getEndDateTime(value) {
	if (!value) return dateFns.format(nowDate, defaultFmsDateTime);
	return value + " 23:59:59";
}
export function getStartMonthDateTime(value) {
	if (!value) return dateFns.format(nowDate, defaultFmsDateTime);
	let startDateArr = value.split("-");
	value = startDateArr[0] + "-" + startDateArr[1] + "-01";
	return value + " 00:00:00";
}
export function getEndMonthDateTime(value) {
	if (!value) return dateFns.format(nowDate, defaultFmsDateTime);
	let endDateArr = value.split("-");
	let lastDay = new Date(endDateArr[0], endDateArr[1], 0).getDate();
	value = endDateArr[0] + "-" + endDateArr[1] + "-" + lastDay;
	return value + " 23:59:59";
}

export function getClock() {
	return dateFns.format(new Date(), defaultFmsDateTime);
}
export function getNowDate() {
	return dateFns.format(nowDate, defaultFmsDate);
}
export function getNowMonth() {
	return dateFns.getMonth(nowDate) + 1;
}
export function getNowMonthStart() {
	return dateFns.format(dateFns.startOfMonth(nowDate), defaultFmsDate);
}
export function getDayBuyStartEnd(start, end) {
	return dateFns.differenceInDays(new Date(start), new Date(end));
}

export function formatCustomDateBiasLineStr(dateTimeStr) {
	if (!dateTimeStr) return "";
	let dateStr = dateTimeStr.split(" ")[0];
	let date = dateStr.split("-");
	return date[2] + "/" + date[1] + "/" + date[0];
}

export function formatDateDiagonalLineYMD(time) {
	if (!time) return "";
	let date = time.split(" ")[0];
	let dates = date.split("-");
	return dates[1] + "/" + dates[2] + "/" + dates[0];
}
export function formatTimeDiagonalLineYMD(time) {
	if (!time) return "";
	return time.split(" ")[1];
}

export function formatTimerHMS(timer) {
	let hour = 0;
	let min = 0;
	let second = 0;
	// 定义变量 d,h,m,s保存倒计时的时间
	if (timer > 0) {
		// 时
		let h = Math.floor(timer / 1000 / 60 / 60);
		hour = h < 10 ? "0" + h : h;
		// 分
		let m = Math.floor((timer / 1000 / 60) % 60);
		min = m < 10 ? "0" + m : m;
		// 秒
		let s = Math.floor((timer / 1000) % 60);
		second = s < 10 ? "0" + s : s;
		return hour + "h " + min + "m " + second + "s";
	} else {
		hour = "0";
		min = "0";
		second = "0";
		return hour + "h " + min + "m " + second + "s";
	}
}

export function getPrice(value) {
	let returnVal = 0;
	if (!value) return returnVal;
	let price = Number(value);
	if (price < 100) {
		returnVal = price + 10;
	} else if (price < 500) {
		returnVal = price + 25;
	} else if (price < 1000) {
		returnVal = price + 50;
	} else if (price < 5000) {
		returnVal = price + 100;
	} else if (price < 10000) {
		returnVal = price + 500;
	} else {
		returnVal = price + 1000;
	}
	return returnVal;
}

export function toLogin() {
	// const routes = getCurrentPages();
	// //  登录获取url
	// const params = routes[routes.length - 1].__page__.fullPath;
	// return `/pages/login/login?redirect=${encodeURI(params)}`;

	const redirect = window.location.pathname.slice(2) + window.location.search;
	return `/pages/login/login?redirect=${encodeURI(redirect)}`;
}

// auctionStatus 1 官方盲盒订单 drops 2 寄售（包括盲盒和手办）legends x 3 拍卖 auction 4 官方手办订单 sold
export function orderStatusAuction(type) {
	let result = "";
	try {
		type = type.toString();
		if (!type) return "";
		switch (type) {
			case "1":
				result = "BIDING";
				break;
			case "2":
				result = "BID";
				break;
			case "3":
				result = "OUTBID";
				break;
			case "6":
				result = "FAIL";
				break;
			default:
				result = "FINISH";
				break;
		}
		return result;
	} catch (e) {
		return result;
	}
}
export function orderStatus(type) {
	let result = "";
	try {
		type = type.toString();
		if (!type) return "";
		switch (type) {
			case "1":
				result = "UNPAID";
				break;
			case "3":
				result = "CLOSED";
				break;
			case "4":
				result = "PAID";
				break;
			case "5":
				result = "SOLD OUT";
				break;
			case "7":
				result = "IN TRADE";
				break;
			default:
				result = "";
				break;
		}
		return result;
	} catch (e) {
		return result;
	}
}
export function orderType(type) {
	let result = "";
	try {
		type = type.toString();
		if (!type) return "";
		switch (type) {
			case "1":
				result = "DROPS";
				break;
			case "2":
				result = "LEGENDS X";
				break;
			case "3":
				result = "AUCTION";
				break;
			case "4":
				result = "DROPS";
				break;
			case "5":
				result = "SOLD";
				break;
			default:
				result = "";
				break;
		}
		return result;
	} catch (e) {
		return result;
	}
}

export function formatPayMethod(type) {
	let result = "";
	try {
		type = type.toString();
		if (!type) return "";
		switch (type) {
			case "1":
				result = "CREDIT CARD";
				break;
			case "2":
				result = "CRYPTO";
				break;
			case "3":
				result = "BALANCE";
				break;
			default:
				result = "";
				break;
		}
		return result;
	} catch (e) {
		return result;
	}
}

/**
 * 只允许有数字
 * @param val
 * @returns {boolean}
 */
export function validateNumber(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	val = val.trim();
	if (/^\d*$/gi.test(val)) {
		return true;
	}
	return false;
}
/**
 * 只允许有数字、字母（区分大小写）
 * @param val
 * @returns {boolean}
 */
export function validateNumLet(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	val = val.trim();
	if (/^[a-zA-Z\d]*$/gi.test(val)) {
		return true;
	}
	return false;
}
/**
 * 只允许有字母（区分大小写）
 * @param val
 * @returns {boolean}
 */
export function validateLetter(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	val = val.trim();
	if (/^[a-zA-Z\d]*$/gi.test(val)) {
		return true;
	}
	return false;
}
/**
 * 只允许有数字、字母（区分大小写）、汉字
 * @param val
 * @returns {boolean}
 */
export function validateName(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	// val = val.trim();
	// if (/^[a-zA-Z\d\u4e00-\u9fa5]*$/ig.test(val)) {
	//   return true;
	// }
	return true;
}
/**
 * 特殊字符
 * @param val
 * @returns {boolean}
 */
export function validateEsChart(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	// val = val.trim();
	// const reg = new RegExp('[&\'\\\\<>/]', 'ig');
	// if (reg.test(val)) {
	//   return false;
	// }
	return true;
}
export function validateEsChartPwd(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) {
		return false;
	}
	// val = val.trim();
	// const reg = new RegExp('[&\'\\\\<>/]', 'ig');
	// if (reg.test(val)) {
	//   return false;
	// }
	return true;
}
/**
 * 密码 只允许有数字、字母（区分大小写）
 * @param val
 * @returns {boolean}
 */
export function validatePwd(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	val = val.trim();
	if (/[a-zA-Z]+/gi.test(val) && /\d+/gi.test(val)) {
		return true;
	}
	return false;
}
/**
 * 邮箱固定校验格式
 * @param val
 * @returns {boolean}
 */
export function validateEmail(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	val = val.trim();
	if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi.test(val)) {
		return true;
	}
	return false;
}

/**
 * 邮编
 * @param val
 * @returns {boolean}
 */
export function validateZipCode(val) {
	if (val === "null" || val === "undefined" || val === "" || !val) return false;
	if (/^[a-zA-Z\d-\s]*$/gi.test(val)) {
		return true;
	}
	return false;
}

export function getCookie(cName) {
	let name = cName + "=";
	let ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// base64
export function utoa(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}
export function atou(str) {
	return decodeURIComponent(escape(window.atob(str)));
}

/**
 *
 * @param config
 */
export function shareBrowser(shareData) {
	let nativeShare = new NativeShare();
	let shareDataDefault = {
		icon: "",
		link: window.location.href,
		title: "NFT",
		desc: "NFT",
		from: "",
	};
	if (shareData) {
		shareDataDefault = shareData;
	}
	nativeShare.setShareData(shareDataDefault);
	try {
		nativeShare.call();
	} catch (e) {
		uni.showToast({
			title: e.toString(),
			icon: "none",
		});
	}
}

const pcUrl = [
	"auction", // 拍卖
	"latestdrops", // 盲盒列表
	"blindBoxDetail", // 盲盒详情
	"saleDetail", // 手办详情
	"legendsx", // LX
	"sale", // 商品详情
	"numDetail", // 商品单件详情
	"blindDropDetail", // 盲盒单件详情
];
const mUlr = ["pages/auction/auction", "pages/unbox/box-list", "pages/unbox/box-detail", "pages/unbox/sale-detail", "pages/showroom/room-home", "pages/showroom/room-detail", "pages/showroom/num-detail", "pages/showroom/drops-detail"];
export function handlePC2M(path) {
	let returnUrl = "";
	for (let i in pcUrl) {
		if (path.includes(pcUrl[i])) {
			returnUrl = mUlr[i];
			break;
		}
	}
	return returnUrl;
}

export function handleM2PC(path) {
	let returnUrl = "";
	for (let i in mUlr) {
		if (path.includes(mUlr[i])) {
			returnUrl = pcUrl[i];
			break;
		}
	}
	return returnUrl;
}

/**
 * @param {Object} value
 * 类型1单选2多选3判断4填空5简答
 */
export function formatSubjectType(value) {
	let result = "单选题";
	if (!value) return result;
	value = Number(value);
	switch (value) {
		case 1:
			result = "单选题";
			break;
		case 2:
			result = "多选题";
			break;
		case 3:
			result = "判断题";
			break;
		case 4:
			result = "填空题";
			break;
		case 5:
			result = "简答题";
			break;
		default:
			break;
	}
	return result;
}
