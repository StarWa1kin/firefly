import { GET, POST } from "@/utils/request";

//使用萤火虫ID获取与指定锁关联的设备。 V1
export function FETCH_FIREFLY_BY_ID(params: { id: string }): Promise<API.IDevices> {
  return GET(`/Firefly/fetch-firefly-devices`, params);
}
