declare function isInstalled(packageName: string): boolean;
declare function isUrl(string: string): boolean;
declare function optionalRequire(packageName: string): any;
declare const RequireTypes: {
    async: string[];
    sync: string[];
};
export { isInstalled, isUrl, optionalRequire, RequireTypes };
