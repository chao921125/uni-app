// utils/date.d.ts

export type DateInput = string | number | Date;
export type FormatToken =
	| "YYYY"
	| "YY"
	| "MM"
	| "M"
	| "DD"
	| "D"
	| "HH"
	| "H"
	| "hh"
	| "h"
	| "mm"
	| "m"
	| "ss"
	| "s"
	| "SSS"
	| "S"
	| "A"
	| "a"
	| "dddd"
	| "ddd"
	| "dd"
	| "MMMM"
	| "MMM"
	| "Q"
	| "W"
	| "w"
	| "X"
	| "x";

export interface FormatOptions {
	locale?: "zh" | "en";
}

export interface FromNowOptions {
	locale?: "zh" | "en";
	suffix?: boolean;
	hideJustNow?: boolean;
}

export interface CountdownResult {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	total: number;
	expired: boolean;
}

export interface DateChain {
	format(fmt?: string, opts?: FormatOptions): string;
	fromNow(opts?: FromNowOptions): string;
	friendly(): string;
	add(amount: number, unit: TimeUnit): DateChain;
	diff(target: DateInput, unit?: TimeUnit, abs?: boolean): number;
	isToday(): boolean;
	isYesterday(): boolean;
	isThisWeek(): boolean;
	isThisMonth(): boolean;
	startOfDay(): DateChain;
	endOfDay(): DateChain;
	value(): Date;
	timestamp(): number;
	unix(): number;
}

export type TimeUnit = "year" | "month" | "day" | "hour" | "minute" | "second" | "week" | "ms";

export interface DateUtilsAPI {
	// 核心
	parse(input: DateInput): Date;
	format(input: DateInput, format?: string, options?: FormatOptions): string;
	fromNow(input: DateInput, options?: FromNowOptions): string;
	friendly(input: DateInput): string;

	// 计算
	add(input: DateInput, amount: number, unit?: TimeUnit): Date;
	diff(input1: DateInput, input2: DateInput, unit?: TimeUnit, abs?: boolean): number;

	// 判断
	isToday(input: DateInput): boolean;
	isYesterday(input: DateInput): boolean;
	isTomorrow(input: DateInput): boolean;
	isThisWeek(input: DateInput): boolean;
	isThisMonth(input: DateInput): boolean;
	isThisYear(input: DateInput): boolean;
	isBetween(input: DateInput, start: DateInput, end: DateInput, unit?: TimeUnit): boolean;
	isBefore(input: DateInput, compare: DateInput, unit?: TimeUnit): boolean;
	isAfter(input: DateInput, compare: DateInput, unit?: TimeUnit): boolean;

	// 特殊日期
	getStartOfDay(input: DateInput): Date;
	getEndOfDay(input: DateInput): Date;
	getStartOfMonth(input: DateInput): Date;
	getEndOfMonth(input: DateInput): Date;
	getStartOfWeek(input: DateInput, weekStartsOn?: 0 | 1): Date;
	getEndOfWeek(input: DateInput, weekStartsOn?: 0 | 1): Date;

	// 业务
	countdown(endTime: DateInput): CountdownResult;
	getAge(birthDate: DateInput): number;
	getZodiac(month: number | DateInput, day?: number): string;
	getChineseZodiac(year: number | DateInput): string;
	isWorkday(input: DateInput, holidays?: string[], workdays?: string[]): boolean;
	getWorkdaysBetween(start: DateInput, end: DateInput, holidays?: string[]): number;

	// 范围
	range(start: DateInput, end: DateInput, unit?: TimeUnit, format?: string): Array<string | Date>;

	// 链式调用
	chain(input: DateInput): DateChain;
}

declare const dateUtils: DateUtilsAPI;
export default dateUtils;
