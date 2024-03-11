import { GET, POST } from "@/utils/request";

interface IDashBoardGraphs {
  event_class: string;
  ips: string;
  ports: string;
  ff_name: string;
  start: string;
  end: string;
}

interface IInvestigateLog {
  page_size: string;
  page_index: string;
  event_code: string;
  ips: string;
  ports: string;
  ff_name: string;
  start: string;
  end: string;
}

interface IDashBoardHistory {
  ff_name: string;
  event_class: string;
  start: string;
  end: string;
}

// 返回每小时的选择量，单位为kb（len/8）*1000；
export function DASHBOARD_GRAPHS(params: IDashBoardGraphs): Promise<API.IQuickWinsInvestigateGraph> {
  return POST(`/QuickWins/dashboard_graphs`, params);
}

// 返回所选天数范围内查询的事件数量
export function DASHBOARD_INVESTIGATE_LOG(params: IInvestigateLog): Promise<API.IQuickWinsInvestigateLog> {
  return POST(`/QuickWins/investigate_logs`, params);
}

// 返回排名前20的所选天数范围内的查询事件数量
export function DASHBOARD_HISTORY(params: IDashBoardHistory): Promise<API.IQuickWinsInvestigateLog> {
  return POST(`/QuickWins/dash_history`, params);
}

// 返回请求的事件代码计数 V3
export function DASH_BREAKDOWN(params: IDashBoardGraphs): Promise<API.IQuickWinsInvestigateLog[]> {
  return POST(`/QuickWins/dash_breakdown`, params);
}

// TOTAL 3->3->4
const SearchApi = {
  DASHBOARD_GRAPHS,
  DASHBOARD_INVESTIGATE_LOG,
  DASHBOARD_HISTORY,
  DASH_BREAKDOWN,
};

export default SearchApi;
