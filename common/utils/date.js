/**
 * UniApp 日期处理工具模块
 * 功能：格式化/解析/相对时间/日期计算/范围判断/倒计时
 * 特点：链式调用 / 多格式支持 / 国际化 / 性能缓存
 */

// ==================== 常量配置 ====================
const UNITS = {
	year: 31557600000, // 365.25 * 24 * 60 * 60 * 1000
	month: 2629800000, // 30.44 * 24 * 60 * 60 * 1000
	day: 86400000, // 24 * 60 * 60 * 1000
	hour: 3600000, // 60 * 60 * 1000
	minute: 60000, // 60 * 1000
	second: 1000,
};

const WEEK_DAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const WEEK_DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 格式化令牌映射
const TOKEN_MAP = {
	YYYY: (d) => d.getFullYear(),
	YY: (d) => String(d.getFullYear()).slice(-2),
	MM: (d) => pad(d.getMonth() + 1),
	M: (d) => d.getMonth() + 1,
	DD: (d) => pad(d.getDate()),
	D: (d) => d.getDate(),
	HH: (d) => pad(d.getHours()),
	H: (d) => d.getHours(),
	hh: (d) => pad(d.getHours() % 12 || 12),
	h: (d) => d.getHours() % 12 || 12,
	mm: (d) => pad(d.getMinutes()),
	m: (d) => d.getMinutes(),
	ss: (d) => pad(d.getSeconds()),
	s: (d) => d.getSeconds(),
	SSS: (d) => pad(d.getMilliseconds(), 3),
	S: (d) => d.getMilliseconds(),
	A: (d) => (d.getHours() >= 12 ? "PM" : "AM"),
	a: (d) => (d.getHours() >= 12 ? "pm" : "am"),
	dddd: (d, locale) => (locale === "en" ? WEEK_DAYS_EN : WEEK_DAYS)[d.getDay()],
	ddd: (d, locale) => (locale === "en" ? WEEK_DAYS_EN : WEEK_DAYS)[d.getDay()].slice(0, 3),
	dd: (d, locale) => (locale === "en" ? WEEK_DAYS_EN : WEEK_DAYS)[d.getDay()],
	MMMM: (d, locale) => (locale === "en" ? MONTHS_EN : MONTHS)[d.getMonth()],
	MMM: (d, locale) => (locale === "en" ? MONTHS_EN : MONTHS)[d.getMonth()].slice(0, 3),
	MM: (d) => pad(d.getMonth() + 1),
	Q: (d) => Math.floor(d.getMonth() / 3) + 1, // 季度
	W: (d) => getWeekOfYear(d), // 年内第几周
	w: (d) => d.getDay() || 7, // 周几（1-7，周一为1）
	X: (d) => Math.floor(d.getTime() / 1000), // Unix 时间戳（秒）
	x: (d) => d.getTime(), // Unix 时间戳（毫秒）
};

// ==================== 工具函数 ====================

/**
 * 数字补零
 */
function pad(num, size = 2) {
	num = String(num);
	return num.length >= size ? num : "0".repeat(size - num.length) + num;
}

/**
 * 获取日期是年内第几周（ISO 8601）
 */
function getWeekOfYear(date) {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	const dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

/**
 * 解析日期字符串（支持多种格式）
 */
function parseDate(input) {
	if (!input) return new Date();
	if (input instanceof Date) return new Date(input.getTime());
	if (typeof input === "number") return new Date(input);

	const str = String(input).trim();

	// 1. 纯数字时间戳（秒/毫秒）
	if (/^\d+$/.test(str)) {
		const ts = Number(str);
		// 10 位秒级时间戳转毫秒
		return new Date(ts < 1e10 ? ts * 1000 : ts);
	}

	// 2. ISO 格式：2024-01-15T10:30:00Z
	if (str.includes("T") || str.endsWith("Z")) {
		const d = new Date(str);
		if (!isNaN(d.getTime())) return d;
	}

	// 3. 常见格式：2024-01-15 10:30:00 / 2024/01/15
	const parts = str
		.split(/[^0-9]+/)
		.filter(Boolean)
		.map(Number);
	if (parts.length >= 3) {
		const [year, month, day, hour = 0, minute = 0, second = 0] = parts;
		const d = new Date(year, month - 1, day, hour, minute, second);
		if (!isNaN(d.getTime())) return d;
	}

	// 4. 相对时间：'1 hour ago', '2 天前'
	const relativeMatch = str.match(/^(\d+)\s*(年|月|天|日|小时|分钟|秒|秒前|分钟前|小时前|天前|月前|年前|ago)?/i);
	if (relativeMatch) {
		const [, num, unit] = relativeMatch;
		const value = Number(num);
		const now = Date.now();

		if (/年|year/i.test(unit)) return new Date(now - value * UNITS.year);
		if (/月|month/i.test(unit)) return new Date(now - value * UNITS.month);
		if (/天|日|day/i.test(unit)) return new Date(now - value * UNITS.day);
		if (/小时|hour/i.test(unit)) return new Date(now - value * UNITS.hour);
		if (/分钟|minute/i.test(unit)) return new Date(now - value * UNITS.minute);
		if (/秒|second|ago/i.test(unit)) return new Date(now - value * UNITS.second);
	}

	// 5. 特殊字符串：'today', 'yesterday', 'tomorrow'
	const now = new Date();
	now.setHours(0, 0, 0, 0);

	if (str === "today" || str === "今天") return now;
	if (str === "yesterday" || str === "昨天") return new Date(now.getTime() - UNITS.day);
	if (str === "tomorrow" || str === "明天") return new Date(now.getTime() + UNITS.day);

	// 6. 降级：直接 new Date
	const d = new Date(str);
	return isNaN(d.getTime()) ? new Date() : d;
}

// ==================== 核心模块 ====================

export const DateUtils = {
	/**
	 * 解析任意格式为 Date 对象
	 * @param {string|number|Date} input
	 * @returns {Date}
	 */
	parse(input) {
		return parseDate(input);
	},

	/**
	 * 格式化日期
	 * @param {string|number|Date} input - 日期输入
	 * @param {string} format - 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
	 * @param {Object} options - 配置项
	 * @returns {string}
	 */
	format(input, format = "YYYY-MM-DD HH:mm:ss", options = {}) {
		const { locale = "zh" } = options;
		const date = parseDate(input);

		// 快速格式（性能优化）
		if (format === "timestamp") return date.getTime();
		if (format === "unix") return Math.floor(date.getTime() / 1000);

		let result = format;
		// 按令牌长度降序替换，避免短令牌干扰长令牌（如 MM 在 M 之前）
		const tokens = Object.keys(TOKEN_MAP).sort((a, b) => b.length - a.length);

		for (const token of tokens) {
			if (result.includes(token)) {
				const replacer = TOKEN_MAP[token];
				const value = replacer(date, locale);
				result = result.replace(new RegExp(token, "g"), value);
			}
		}

		return result;
	},

	/**
	 * 相对时间（几分钟前、几小时前）
	 * @param {string|number|Date} input
	 * @param {Object} options
	 * @returns {string}
	 */
	fromNow(input, options = {}) {
		const {
			locale = "zh",
			suffix = true, // 是否添加"前/后"
			hideJustNow = false, // 是否隐藏"刚刚"
		} = options;

		const date = parseDate(input);
		const diff = Date.now() - date.getTime();
		const absDiff = Math.abs(diff);
		const isFuture = diff < 0;

		// 小于 10 秒
		if (absDiff < 10000) {
			return hideJustNow ? this.format(date, "HH:mm") : "刚刚";
		}

		// 查找合适单位
		for (const [unit, ms] of Object.entries(UNITS)) {
			if (absDiff >= ms) {
				const value = Math.floor(absDiff / ms);
				const unitMap =
					locale === "en"
						? { year: "year", month: "month", day: "day", hour: "hour", minute: "minute", second: "second" }
						: { year: "年", month: "个月", day: "天", hour: "小时", minute: "分钟", second: "秒" };

				const unitText = unitMap[unit];
				const result = `${value}${unitText}`;

				if (!suffix) return result;
				if (locale === "en") {
					return isFuture ? `in ${result}` : `${result} ago`;
				}
				return isFuture ? `${result}后` : `${result}前`;
			}
		}

		return "刚刚";
	},

	/**
	 * 友好时间显示（今天/昨天/本周/日期）
	 * @param {string|number|Date} input
	 * @returns {string}
	 */
	friendly(input) {
		const date = parseDate(input);
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const diffDays = Math.floor((inputDate - today) / UNITS.day);

		if (diffDays === 0) return `今天 ${this.format(date, "HH:mm")}`;
		if (diffDays === -1) return `昨天 ${this.format(date, "HH:mm")}`;
		if (diffDays === -2) return `前天 ${this.format(date, "HH:mm")}`;
		if (diffDays >= -6 && diffDays < 0) return `${WEEK_DAYS[date.getDay()]} ${this.format(date, "HH:mm")}`;

		// 同一年显示月日，不同年显示年月日
		return now.getFullYear() === date.getFullYear() ? this.format(date, "MM-DD HH:mm") : this.format(date, "YYYY-MM-DD HH:mm");
	},

	/**
	 * 日期计算：加减时间
	 * @param {string|number|Date} input
	 * @param {number} amount - 数量（正数加，负数减）
	 * @param {string} unit - 单位：year/month/day/hour/minute/second
	 * @returns {Date}
	 */
	add(input, amount, unit = "day") {
		const date = parseDate(input);
		const d = new Date(date.getTime());

		switch (unit) {
			case "year":
				d.setFullYear(d.getFullYear() + amount);
				break;
			case "month":
				d.setMonth(d.getMonth() + amount);
				break;
			case "day":
				d.setDate(d.getDate() + amount);
				break;
			case "hour":
				d.setHours(d.getHours() + amount);
				break;
			case "minute":
				d.setMinutes(d.getMinutes() + amount);
				break;
			case "second":
				d.setSeconds(d.getSeconds() + amount);
				break;
			case "week":
				d.setDate(d.getDate() + amount * 7);
				break;
		}

		return d;
	},

	/**
	 * 日期差值计算
	 * @param {string|number|Date} input1
	 * @param {string|number|Date} input2
	 * @param {string} unit - 返回单位：ms/second/minute/hour/day/month/year
	 * @param {boolean} abs - 是否返回绝对值
	 * @returns {number}
	 */
	diff(input1, input2, unit = "day", abs = true) {
		const d1 = parseDate(input1).getTime();
		const d2 = parseDate(input2).getTime();
		let diff = d1 - d2;
		if (abs) diff = Math.abs(diff);

		const unitMap = {
			ms: 1,
			second: 1000,
			minute: 60000,
			hour: 3600000,
			day: 86400000,
			week: 604800000,
			month: 2629800000,
			year: 31557600000,
		};

		return Math.floor(diff / (unitMap[unit] || 86400000));
	},

	/**
	 * 判断是否为今天/昨天/明天
	 */
	isToday(input) {
		const d = parseDate(input);
		const now = new Date();
		return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
	},

	isYesterday(input) {
		const d = parseDate(input);
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		return d.getFullYear() === yesterday.getFullYear() && d.getMonth() === yesterday.getMonth() && d.getDate() === yesterday.getDate();
	},

	isTomorrow(input) {
		const d = parseDate(input);
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return d.getFullYear() === tomorrow.getFullYear() && d.getMonth() === tomorrow.getMonth() && d.getDate() === tomorrow.getDate();
	},

	/**
	 * 判断是否本周/本月/今年
	 */
	isThisWeek(input) {
		const d = parseDate(input);
		const now = new Date();
		return getWeekOfYear(d) === getWeekOfYear(now) && d.getFullYear() === now.getFullYear();
	},

	isThisMonth(input) {
		const d = parseDate(input);
		const now = new Date();
		return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
	},

	isThisYear(input) {
		const d = parseDate(input);
		return d.getFullYear() === new Date().getFullYear();
	},

	/**
	 * 获取特殊日期
	 */
	getStartOfDay(input) {
		const d = parseDate(input);
		d.setHours(0, 0, 0, 0);
		return d;
	},

	getEndOfDay(input) {
		const d = parseDate(input);
		d.setHours(23, 59, 59, 999);
		return d;
	},

	getStartOfMonth(input) {
		const d = parseDate(input);
		d.setDate(1);
		d.setHours(0, 0, 0, 0);
		return d;
	},

	getEndOfMonth(input) {
		const d = parseDate(input);
		d.setMonth(d.getMonth() + 1, 0); // 下月0日 = 本月最后一天
		d.setHours(23, 59, 59, 999);
		return d;
	},

	getStartOfWeek(input, weekStartsOn = 1) {
		// weekStartsOn: 0=周日, 1=周一
		const d = parseDate(input);
		const day = d.getDay();
		const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
		d.setDate(d.getDate() - diff);
		d.setHours(0, 0, 0, 0);
		return d;
	},

	getEndOfWeek(input, weekStartsOn = 1) {
		const start = this.getStartOfWeek(input, weekStartsOn);
		return this.add(start, 6, "day");
	},

	/**
	 * 日期范围判断
	 */
	isBetween(input, start, end, unit = "ms") {
		const t = parseDate(input).getTime();
		const s = parseDate(start).getTime();
		const e = parseDate(end).getTime();
		return t >= s && t <= e;
	},

	isBefore(input, compare, unit = "ms") {
		return parseDate(input).getTime() < parseDate(compare).getTime();
	},

	isAfter(input, compare, unit = "ms") {
		return parseDate(input).getTime() > parseDate(compare).getTime();
	},

	/**
	 * 倒计时计算
	 * @param {string|number|Date} endTime - 结束时间
	 * @returns {Object} { days, hours, minutes, seconds, total }
	 */
	countdown(endTime) {
		const end = parseDate(endTime).getTime();
		const now = Date.now();
		const diff = end - now;

		if (diff <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, expired: true };
		}

		return {
			days: Math.floor(diff / UNITS.day),
			hours: Math.floor((diff % UNITS.day) / UNITS.hour),
			minutes: Math.floor((diff % UNITS.hour) / UNITS.minute),
			seconds: Math.floor((diff % UNITS.minute) / UNITS.second),
			total: diff,
			expired: false,
		};
	},

	/**
	 * 年龄计算
	 */
	getAge(birthDate) {
		const birth = parseDate(birthDate);
		const now = new Date();
		let age = now.getFullYear() - birth.getFullYear();
		const m = now.getMonth() - birth.getMonth();
		if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
			age--;
		}
		return age < 0 ? 0 : age;
	},

	/**
	 * 星座计算
	 */
	getZodiac(month, day) {
		if (typeof month === "string" || month instanceof Date) {
			const d = parseDate(month);
			month = d.getMonth() + 1;
			day = d.getDate();
		}

		const zodiacArr = ["摩羯座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"];
		const zodiacDay = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];

		return day < zodiacDay[month - 1] ? zodiacArr[month - 1] : zodiacArr[month];
	},

	/**
	 * 生肖计算（按农历年，简化版按公历年）
	 */
	getChineseZodiac(year) {
		if (typeof year === "string" || year instanceof Date) {
			year = parseDate(year).getFullYear();
		}
		const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
		return animals[(year - 1900) % 12];
	},

	/**
	 * 获取时间区间列表（用于日历/报表）
	 * @param {string|Date} start - 开始日期
	 * @param {string|Date} end - 结束日期
	 * @param {string} unit - 单位：day/hour/minute
	 * @param {string} format - 返回格式
	 * @returns {Array<string|Date>}
	 */
	range(start, end, unit = "day", format = null) {
		const startDate = parseDate(start);
		const endDate = parseDate(end);
		const result = [];
		let current = new Date(startDate.getTime());

		while (current <= endDate) {
			result.push(format ? this.format(current, format) : new Date(current.getTime()));
			current = this.add(current, 1, unit);
		}

		return result;
	},

	/**
	 * 工作日判断（排除周末，可扩展节假日）
	 */
	isWorkday(input, holidays = [], workdays = []) {
		const d = parseDate(input);
		const dateStr = this.format(d, "YYYY-MM-DD");

		// 优先判断特殊日期
		if (workdays.includes(dateStr)) return true;
		if (holidays.includes(dateStr)) return false;

		// 默认周六日休息
		const day = d.getDay();
		return day !== 0 && day !== 6;
	},

	/**
	 * 计算工作日天数（排除周末）
	 */
	getWorkdaysBetween(start, end, holidays = []) {
		let count = 0;
		const current = parseDate(start);
		const endDate = parseDate(end);

		while (current <= endDate) {
			if (this.isWorkday(current, holidays)) {
				count++;
			}
			current.setDate(current.getDate() + 1);
		}

		return count;
	},

	/**
	 * 链式调用封装（可选）
	 */
	chain(input) {
		const date = parseDate(input);

		return {
			format: (fmt, opts) => DateUtils.format(date, fmt, opts),
			fromNow: (opts) => DateUtils.fromNow(date, opts),
			friendly: () => DateUtils.friendly(date),
			add: (amount, unit) => DateUtils.chain(DateUtils.add(date, amount, unit)),
			diff: (target, unit, abs) => DateUtils.diff(date, target, unit, abs),
			isToday: () => DateUtils.isToday(date),
			isYesterday: () => DateUtils.isYesterday(date),
			isThisWeek: () => DateUtils.isThisWeek(date),
			isThisMonth: () => DateUtils.isThisMonth(date),
			startOfDay: () => DateUtils.chain(DateUtils.getStartOfDay(date)),
			endOfDay: () => DateUtils.chain(DateUtils.getEndOfDay(date)),
			value: () => date,
			timestamp: () => date.getTime(),
			unix: () => Math.floor(date.getTime() / 1000),
		};
	},
};

// ==================== 默认导出（兼容旧写法） ====================
export default DateUtils;
