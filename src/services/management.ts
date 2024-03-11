import { GET, POST } from "@/utils/request";

interface IUpdateDeviceGroup {
  mac: string;
  group: string;
}

interface IUpdateDeviceTag {
  mac: string;
  tag: string;
}

interface IUpdateProtocolTag {
  mac: string;
  port: string;
}

// 根据设备的MAC地址更新设备组。如果不存在新设备，请插入该设备。
export function UPDATE_DEVICE_GROUP(params: IUpdateDeviceGroup) {
  return POST(`/Management/update-device-group`, params);
}

export function FETCH_GROUPS(): Promise<API.IGroup> {
  return GET(`/Management/groups`);
}

// 获取有关萤火虫的信息。
export function FETCH_FIREBUG_INFO(): Promise<API.IFireBug> {
  return GET(`/Management/firebug-info`);
}

// 获取有关特定萤火虫设备的详细信息。
export function FETCH_FIREFLY_INFO(): Promise<API.IFrireflyDetail> {
  return GET(`/Management/firebug-info`);
}

// 根据设备的MAC地址更新设备的标签。如果不存在新设备，请插入该设备。
export function UPDATE_TAG(params: IUpdateDeviceTag) {
  return POST(`/Management/update-device-tag`, params);
}

// 根据协议的端口号更新协议的标记。如果新协议不存在，请插入该协议。
export function UPDATE_PROTOCOL_TAG(params: IUpdateProtocolTag) {
  return POST(`/Management/update-protcol-tag`, params);
}

// 获取与特定端口关联的标签
export function FETCH_TAG_BY_PORT(port: string) {
  return POST(`/Management/tag/${port}`);
}

// 获取不同端口关联的所有标签
export function FETCH_ALL_TAGS() {
  return POST(`/Management/tags`);
}

// TOTAL 8
const ManagementApi = {
  UPDATE_DEVICE_GROUP,
  FETCH_GROUPS,
  FETCH_FIREBUG_INFO,
  FETCH_FIREFLY_INFO,
  UPDATE_TAG,
  UPDATE_PROTOCOL_TAG,
  FETCH_TAG_BY_PORT,
  FETCH_ALL_TAGS,
};

export default ManagementApi;
