import QuickWinsApi from "@/services/quickWins";
import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    EventCode: "HCK001",
    Priority: 1,
    Devices_Involved: "Smart Fridge",
    DateTime: "7/3/2024 12:00",
    Description: "Device detected talking to known C2 server",
  },
  {
    key: "1",
    EventCode: "HCK001",
    Priority: 1,
    Devices_Involved: "Toaster",
    DateTime: "7/3/2024 14:00",
    Description: "Device detected talking to known C2 server",
  },
];

const columns = [
  {
    title: "EventCode",
    dataIndex: "EventCode",
    key: "EventCode",
  },
  {
    title: "Priority",
    dataIndex: "Priority",
    key: "Priority",
  },
  {
    title: "Devices_Involved",
    dataIndex: "Devices_Involved",
    key: "Devices_Involved",
  },
  {
    title: "DateTime",
    dataIndex: "DateTime",
    key: "DateTime",
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
  },
];

export default function () {
  // var x = NetWorkApi.FETCH_LOCK_Priority();

  const x = dataSource;
  return <Table dataSource={x} columns={columns} />;
}
