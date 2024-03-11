import { GET, POST } from "@/utils/request";

// 查找所有可用设备 V1
export function FETCH_ALL_DEVICES(): Promise<API.IDevices[]> {
  return GET("/Devices/fetch-devices-all");
}

// 通过mac地址查找设备 V1
export function FETCH_ALL_DEVICES_BY_MAC(mac: string): Promise<API.IDevices> {
  return GET(`/Devices/fetch-devices-mac/${mac}`);
}

// 通过标识符（IP,NAC地址）来获取设备 V1
export function FETCH_ALL_DEVICES_BY_IDETIFIER(identifier: string): Promise<API.IDevices> {
  return GET(`/Devices/fetch-devices-identifier/${identifier}`);
}

// 检查是否存在具有指定MAC地址的设备。 V1
export function CHECK_EXISTS_BY_MAC(mac: string): Promise<API.IExist> {
  return GET(`/Devices/exists/${mac}`);
}

// 获取给定MAC地址的顶级讲话者数据。 V1
export function FETCH_TOP_TALKER_BY_MAC(mac: string): Promise<API.ITopTalker> {
  return GET(`/Devices/top-talker/${mac}`);
}

// 获取给定mac地址的设备吞吐量。  V2
export function FETCH_THROUGHPUT_BY_MAC(mac: string) {
  return GET(`/Devices/throughput/${mac}`);
}

// 获取给定MAC或IP地址的设备入站吞吐量。 V3
export function FETCH_INBOUND_THROUGHPUT(identifier: string) {
  return GET(`/Devices/incoming-throughput/${identifier}`);
}

// 获取给定MAC或IP地址的设备出站吞吐量。 V3
export function FETCH_OUTBOUND_THROUGHPUT(identifier: string) {
  return GET(`/Devices/outgoing-throughput/${identifier}`);
}

// TOTAL 5->6->8
const DevicesApi = {
  FETCH_ALL_DEVICES,
  FETCH_ALL_DEVICES_BY_MAC,
  FETCH_ALL_DEVICES_BY_IDETIFIER,
  CHECK_EXISTS_BY_MAC,
  FETCH_TOP_TALKER_BY_MAC,
  FETCH_THROUGHPUT_BY_MAC,
};

export default DevicesApi;
