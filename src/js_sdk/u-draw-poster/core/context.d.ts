import type { DrawInstance, DrawOptions } from "./types";
export declare function createContext(options: DrawOptions, wait?: () => Promise<void>): DrawInstance;
