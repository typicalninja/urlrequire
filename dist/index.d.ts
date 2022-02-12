import miniget from "miniget";
declare const Cache: any;
declare function _requireAsync(scriptUrl: string, options?: {
    requestOptions: miniget.Options | undefined;
    patchRequire: boolean | Function;
}): Promise<unknown>;
declare function _requireSync(scriptUrl: string, options?: {
    patchRequire: boolean | Function;
    requestOptions: {} | undefined;
}): any;
export default _requireAsync;
export { _requireSync as requireSync, Cache as requireCache, _requireAsync as requireAsync, };
