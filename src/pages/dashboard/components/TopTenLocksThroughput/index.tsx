import { Table } from "antd";
import React, {useState} from "react";
import NetWorkApi from "../../../../services/networks";

const dataSource = [
  {
    key: "1",
    LockDevice: "Main Hub",
    Throughput: 410000,
  },
  {
    key: "2",
    LockDevice: "Kitchen",
    Throughput: 8124,
  },
];

const columns = [
  {
    title: "LockDevice",
    dataIndex: "LockDevice",
    key: "LockDevice",
  },
  {
    title: "Throughput (Kbps)",
    dataIndex: "Throughput",
    key: "Throughput",
  },
];


export default function () {
  //var x = NetWorkApi.FETCH_LOCK_THROUGHPUT();
  const x = dataSource;
  return <Table dataSource={x} columns={columns} pagination={false} />;
}
