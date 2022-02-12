import { AxiosRequestConfig } from "axios";
declare type RequireOptions = {
    requestOptions: AxiosRequestConfig | undefined;
    patchRequire: boolean | Function | string;
    passOptions: boolean | undefined;
};
declare const Cache: any;
declare function _requireAsync(scriptUrl: string, options?: RequireOptions): Promise<unknown>;
declare function _requireSync(scriptUrl: string, options?: RequireOptions): any;
export default _requireAsync;
export { _requireSync as requireSync, Cache as requireCache, _requireAsync as requireAsync, };
