import { GET, POST } from "@/utils/request";

// 获取所有警报。 V1
export function FETCH_ALL_ALERTS(): Promise<API.IAlert[]> {
  return GET("/Alerts/fetch-alerts-all");
}
// 根据优先级来获取警报（优先级的枚举？）  V1
export function FETCH_ALL_ALERTS_BY_PRIORITY(priority: number): Promise<API.IAlert[]> {
  return GET(`/Alerts/fetch-alerts-priority/${priority}`);
}
// 按事件描述符获取警报。   V1
export function FETCH_ALL_ALERTS_BY_EVENT(eventWhat: string): Promise<API.IAlert[]> {
  return POST(`/Alerts/fetch-alerts-event/${eventWhat}`);
}

// 获取前10个最频繁出现的事件代码。  V2
export function FETCH_ALERTS_COUNT(): Promise<API.IAlertCount[]> {
  return GET(`/Alerts/fetch-alert-count`);
}

// TOTAL 3->4
const AlertApi = {
  FETCH_ALL_ALERTS,
  FETCH_ALL_ALERTS_BY_PRIORITY,
  FETCH_ALL_ALERTS_BY_EVENT,
  FETCH_ALERTS_COUNT,
};

export default AlertApi;
