import { GET, POST } from "@/utils/request";

interface IPort {
  port: string;
}

interface IQueryString {
  query: string;
}

interface INameOrMac {
  name_or_mac: string;
}

// 按端口号搜索协议信息。
export function SEARCH_PROTOCOL(params: IPort): Promise<Array<API.ISearchProtocol>> {
  return GET(`/Search/search-protocol`, params);
}

// 根据查询字符串搜索警报。
export function SEARCH_ALERTS(params: IQueryString): Promise<Array<API.ISearchAlert>> {
  return GET(`/Search/search-alert`, params);
}

// 看板日志
export function SEARCH_DEVICE(params: INameOrMac): Promise<Array<API.ISearchDevice>> {
  return GET(`/Search/search-device`, params);
}

// TOTAL 3
const SearchApi = {
  SEARCH_PROTOCOL,
  SEARCH_ALERTS,
  SEARCH_DEVICE,
};

export default SearchApi;
