import { GET, POST } from "@/utils/request";

// 获取网络拓扑信息。 V1
export function FETCH_TOPOLOGY() {
  return GET(`/Networks/topology`);
}

// 获取协议和相关设备信息。 V1
export function FETCH_PROTOCOLS() {
  return GET(`/Networks/protocols`);
}

// 获取网络上锁的吞吐量。 V2
export function FETCH_THROUGHPUT() {
  return GET(`/Networks/throughput`);
}

// 根据锁的标记获取锁的吞吐量。V2
export function FETCH_LOCK_THROUGHPUT() {
  return GET(`/Networks/lock-throughput`);
}

// 根据锁的标记获取锁的入站吞吐量。 V2
export function FETCH_LOCK_THROUGHPUT_IN() {
  return GET(`/Networks/lock-throughput-in`);
}

// 根据锁的标记获取锁的出站吞吐量。 V2
export function FETCH_LOCK_THROUGHPUT_OUT() {
  return GET(`/Networks/lock-throughput-out`);
}

// 获取注册表信息，类似于网络拓扑。 V1
export function FETCH_REGISTRY() {
  return GET(`/Networks/registry`);
}

// 获取数据库中的设备数量。 V1
export function FETCH_NUM_DEVICES() {
  return GET(`/Networks/num-devices`);
}

// 获取网络上排名前十的通话设备。 V2
export function FETCH_TOP_TALKER_DEVICES(): Promise<API.ITopTalkerDevivce[]> {
  return GET(`/Networks/top-talker-devices`);
}

// 获取网络上排名前十的监听设备。 V2
export function FETCH_TOP_LISTNING_DEVICES() {
  return GET(`/Networks/top-listening-devices`);
}

// 获取网络上排名前十的通话锁。 V2
export function FETCH_TOP_LOCKS() {
  return GET(`/Networks/top-talker-locks`);
}

// 获取网络上前10个通话锁及其传入和传出吞吐量。 V3
export function FETCH_TOP_LOCKS_DIRECTIONAL() {
  return GET(`/Networks/top-talker-locks-directional`);
}

// TOTAL 4->10->12
const NetWorkApi = {
  FETCH_TOPOLOGY,
  FETCH_PROTOCOLS,
  FETCH_THROUGHPUT,
  FETCH_LOCK_THROUGHPUT,
  FETCH_LOCK_THROUGHPUT_IN,
  FETCH_LOCK_THROUGHPUT_OUT,
  FETCH_REGISTRY,
  FETCH_NUM_DEVICES,
  FETCH_TOP_TALKER_DEVICES,
  FETCH_TOP_LISTNING_DEVICES,
  FETCH_TOP_LOCKS,
  FETCH_TOP_LOCKS_DIRECTIONAL,
};

export default NetWorkApi;
