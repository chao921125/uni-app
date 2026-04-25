// utils/format.d.ts

export type TrimType = "trim" | "all" | "left" | "right";
export type CurrencyCode = "CNY" | "USD" | "EUR" | "GBP" | "JPY" | "HKD" | "TWD" | "KRW";
export type MaskType = "phone" | "id" | "card" | "email" | "name" | "bank" | "custom";
export type UnitType = "byte" | "length" | "time";

export interface MoneyOptions {
	decimal?: number;
	currency?: CurrencyCode;
	symbol?: string;
	prefix?: string;
	suffix?: string;
	thousandSep?: string;
	decimalPoint?: string;
	round?: boolean;
	showZero?: boolean;
}

export interface MaskOptions {
	type?: MaskType;
	start?: number;
	end?: number;
	symbol?: string;
	length?: number;
	custom?: RegExp | ((str: string) => string);
}

export interface TruncateOptions {
	length?: number;
	omission?: string;
	byByte?: boolean;
	position?: "start" | "end" | "middle";
}

export interface UnitOptions {
	type?: UnitType;
	decimal?: number;
	units?: string[];
}

export interface FormatChain {
	// 字符串
	trim(type?: TrimType): FormatChain;
	removeSpace(): FormatChain;
	capitalize(): FormatChain;
	camelToKebab(): FormatChain;
	kebabToCamel(): FormatChain;
	truncate(options?: TruncateOptions): FormatChain;

	// 金额
	money(options?: MoneyOptions): FormatChain;
	moneyShort(options?: MoneyOptions): FormatChain;
	percent(options?: { decimal?: number; multiply?: boolean; suffix?: string }): FormatChain;

	// 脱敏
	phone(symbol?: string): FormatChain;
	idCard(symbol?: string): FormatChain;
	bankCard(symbol?: string): FormatChain;
	email(symbol?: string): FormatChain;
	name(symbol?: string): FormatChain;
	mask(options?: MaskOptions): FormatChain;

	// 类型转换
	toString(defaultValue?: string): FormatChain;
	toNumber(defaultValue?: number): FormatChain;
	toBoolean(): FormatChain;
	toArray(): FormatChain;

	// 控制流
	if(condition: boolean | ((val: any) => boolean), fn: (val: any) => any): FormatChain;
	default(defaultValue: any): FormatChain;

	// 获取值
	value(): any;
}

export interface FormatAPI {
	// 字符串处理
	trim(str: string, type?: TrimType): string;
	removeSpace(str: string): string;
	capitalize(str: string): string;
	camelToKebab(str: string): string;
	kebabToCamel(str: string): string;
	truncate(str: string, options?: TruncateOptions): string;

	// 金额格式化
	money(amount: number | string, options?: MoneyOptions): string;
	moneyShort(amount: number | string, options?: MoneyOptions): string;
	percent(value: number | string, options?: { decimal?: number; multiply?: boolean; suffix?: string }): string;

	// 隐私脱敏
	phone(str: string, symbol?: string): string;
	idCard(str: string, symbol?: string): string;
	bankCard(str: string, symbol?: string): string;
	email(str: string, symbol?: string): string;
	name(str: string, symbol?: string): string;
	mask(str: string, options?: MaskOptions): string;

	// 类型转换
	toString(val: any, defaultValue?: string): string;
	toNumber(val: any, defaultValue?: number): number;
	toBoolean(val: any): boolean;
	toArray(val: any): any[];
	toObject(val: any, defaultValue?: object): object;

	// 验证工具
	isEmpty(val: any): boolean;
	isPhone(str: string): boolean;
	isIdCard(str: string): boolean;
	isEmail(str: string): boolean;
	isUrl(str: string): boolean;
	isNumber(str: string): boolean;
	isChinese(str: string): boolean;

	// 其他工具
	randomStr(length?: number, chars?: string): string;
	uuid(): string;
	clone<T>(obj: T): T;

	// 链式调用
	chain(val: any): FormatChain;
}

declare const format: FormatAPI;
export default format;
