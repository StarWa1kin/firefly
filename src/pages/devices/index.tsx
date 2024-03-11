import useEchart from "@/hooks/useEchart";
import { Card, Space, Table, TableProps, Segmented } from "antd";
import Topology from "./components/Topology";
import { useNavigate } from "umi";
import { useState } from "react";
import Line from "./components/Line";

interface DataType {
  key: string;
  ff_id: string;
  ip: number;
  mac: string;
  tag: string;
  dgroup: string;
}
export default function DevicesPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("list");

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "port",
      dataIndex: "ff_id",
      key: "ff_id",
      align: "center",
    },
    {
      title: "in",
      dataIndex: "mac",
      key: "mac",
      align: "center",
    },
    {
      title: "out",
      dataIndex: "ip",
      key: "ip",
      align: "center",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      ff_id: "8080",
      ip: 32,
      mac: "200000Kbps",
      tag: "dev",
      dgroup: "",
    },
  ];

  return (
    <div className="flex ">
      <Card title="Devices" style={{ width: "50%", marginRight: 16 }}>
        <div className="h-[600px]">
          <Topology></Topology>

          <p>last seen: now date</p>
        </div>
      </Card>

      <div style={{ width: "50%" }}>
        <Card title="line">
          <Line></Line>
        </Card>

        <Card title="" className="mt-[16px]">
          <Segmented<string> options={["list", "graph"]} onChange={(value) => setActiveTab(value)} value={activeTab} />
          <div className="mt-[16px]">{activeTab === "list" ? <Table columns={columns} dataSource={data} pagination={false} /> : <Line></Line>}</div>
        </Card>
      </div>
    </div>
  );
}