import useEchart from "@/hooks/useEchart";
import { Card, Space, Table, TableProps, Segmented, Button, Modal, Input } from "antd";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");

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
      ip: 6000,
      mac: "202343",
      tag: "dev",
      dgroup: "",
    },
  ];

  const handleOk = () => {
    console.log(deviceName);
    setIsModalOpen(false);
    setDeviceName("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeviceName("");
  };

  return (
    <div className="flex ">
      <Card title="Connected Devices" style={{ width: "50%", marginRight: 16 }} extra={<Button onClick={() => setIsModalOpen(true)}>Edit Device Name</Button>}>
        <div className="h-[600px]">
          <Topology></Topology>

          <p>last seen: now!</p>
        </div>
      </Card>

      <div style={{ width: "50%" }}>
        <Card title="Device Details">
          <Line></Line>
        </Card>

        <Card title="" className="mt-[16px]">
          <Segmented<string> options={["list", "graph"]} onChange={(value) => setActiveTab(value)} value={activeTab} />
          <div className="mt-[16px]">{activeTab === "list" ? <Table columns={columns} dataSource={data} pagination={false} /> : <Line></Line>}</div>
        </Card>
      </div>

      <Modal title="Edit Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Please Input New Device Name " value={deviceName} onInput={(e: any) => setDeviceName(e.target.value)} />
      </Modal>
    </div>
  );
}
