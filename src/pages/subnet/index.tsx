import useEchart from "@/hooks/useEchart";
import { Button, Card, Input, Modal, Space, Table, TableProps, Tag } from "antd";
import Topology from "./components/Topology";
import { useNavigate } from "umi";
import { useEffect, useState } from "react";
import NetWorkApi from "@/services/networks";

interface DataType {
  key: string;
  ff_id: string;
  ip: number;
  mac: string;
  tag: string;
  dgroup: string;
}
export default function SubnetPage() {
  const navigate = useNavigate();

  const [topologyData, setTopologyData] = useState<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ff_id",
      dataIndex: "ff_id",
      key: "ff_id",
      align: "center",
    },
    {
      title: "mac",
      dataIndex: "mac",
      key: "mac",
      align: "center",
    },
    {
      title: "ip",
      dataIndex: "ip",
      key: "ip",
      align: "center",
    },
    {
      title: "tag",
      key: "tag",
      dataIndex: "tag",
      align: "center",
      render: (_, { tag }) => <Tag color="blue">{tag}</Tag>,
    },
    {
      title: "group",
      key: "group",
      dataIndex: "group",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/device-detail?ff_id=${_.ff_id}`)}>detail</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      ff_id: "test_ffid",
      ip: 32,
      mac: "192.178.1.1",
      tag: "dev",
      dgroup: "",
    },
  ];

  const getTopology = async () => {
    const res = await NetWorkApi.FETCH_TOPOLOGY();
    console.log(res, "getTopology");
    Object.entries(res.hubs).map(([key, val]) => {
      const { devices, ...rest } = val as any;
    });
  };

  const handleOk = () => {
    console.log(deviceName);
    setIsModalOpen(false);
    setDeviceName("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeviceName("");
  };

  useEffect(() => {
    getTopology();
  }, []);

  return (
    <div className="flex">
      <Card title="Tosibox Network" style={{ width: "50%", marginRight: 16 }} extra={<Button onClick={() => setIsModalOpen(true)}>Edit Subnet Name</Button>}>
        <div className="h-[600px]">
          <Topology></Topology>
        </div>
      </Card>

      <div style={{ width: "50%" }}>
        <Card title="Subnet Details"></Card>

        <Card title="Devices" className="mt-[16px]">
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>

      <Modal title="Edit Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Please Input New Subnet Name " value={deviceName} onInput={(e: any) => setDeviceName(e.target.value)} />
      </Modal>
    </div>
  );
}
