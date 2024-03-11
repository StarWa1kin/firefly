import { GET, POST } from "@/utils/request";

//获取所有萤火虫设备的状态。 V1
export function FETCH_ALL_STATES() {
  return GET(`/Health/fetch-firefly-states`);
}

// 获取特定萤火虫设备的状态。 V1
export function FETCH_STATE_BY_ID(id: string) {
  return GET(`/Health/fetch-firefly-state/${id}`);
}

// 获取有关萤火虫设备是否具有关联设备的信息。 V1
export function FETCH_HAS_DEVICES_BY_ID(id: string) {
  return GET(`/Health/has-devices/${id}`);
}

// TOTAL 3
const HealthApi = {
  FETCH_ALL_STATES,
  FETCH_STATE_BY_ID,
  FETCH_HAS_DEVICES_BY_ID,
};

export default HealthApi;
