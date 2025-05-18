/** 是否是base64本地地址 */
export declare function isBaseUrl(str: string): boolean;
/** 是否是小程序本地地址 */
export declare function isTmpUrl(str: string): boolean;
/** 是否是网络地址 */
export declare function isNetworkUrl(str: string): boolean;
export declare function downloadImgUrl(url: string): Promise<string>;
