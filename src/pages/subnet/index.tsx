import useEchart from "@/hooks/useEchart";
import { Card, Space, Table, TableProps, Tag } from "antd";
import Topology from "./components/Topology";
import { useNavigate } from "umi";

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
      title: "dgroup",
      key: "dgroup",
      dataIndex: "dgroup",
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

  return (
    <div className="flex">
      <Card title="Tosibox Network" style={{ width: "50%", marginRight: 16 }}>
        {/* <div style={{ width: "100%", height: 600 }} ref={domRef}></div> */}
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
    </div>
  );
}
