import useEChart from "@/hooks/useEchart";
import { Badge, Button, Card, Form, Input, Segmented, Table, TableProps, DatePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import NetFlowGraph from "./components/NetFlowGraph";
import QuickWinsApi from "@/services/quickWins";
const { RangePicker } = DatePicker;

const data = [
  {
    Date: "7/3/2024 14:00",
    Type: "CRD020",
    Priority: "3",
    Message: "Attempted invalid movement (unknown ip range)",
    IP_Address: "10.1.1.1",
    FQDNs: "Steve's Laptop",
  },
  {
    Date: "7/3/2024 14:51",
    Type: "CRD020",
    Priority: "3",
    Message: "Attempted invalid movement (unknown ip range)",
    IP_Address: "10.1.1.2",
    FQDNs: "Dave's Laptop",
  },
];

const dataTwo = [
  {
    Date: "7/3/2024 14:00",
    IP_Src: "10.1.1.1",
    IP_Dst: "8.8.8.8",
    MAC_Src: "DE:AD:BE:EF:00",
    MAC_Dst: "00:00:00:00:00",
    Port_Src: "41324",
    Port_Dst: "53",
    Length: "85",
  },
  {
    Date: "7/3/2024 14:51",
    IP_Src: "10.1.1.2",
    IP_Dst: "8.8.8.8",
    MAC_Src: "DE:AD:BE:EF:00",
    MAC_Dst: "00:00:00:00:00",
    Port_Src: "41324",
    Port_Dst: "53",
    Length: "183",
  },
];
export default function InvestigationPage() {
  const [activeTab, setActiveTab] = useState("events");
  const [form] = useForm();

  const columns: TableProps<any>["columns"] = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      align: "center",
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      key: "Priority",
      align: "center",
    },
    {
      title: "Message",
      dataIndex: "Message",
      key: "Message",
      align: "center",
    },
    {
      title: "IP Address",
      dataIndex: "IP_Address",
      key: "IP_Address",
      align: "center",
    },
    {
      title: "FQDNs",
      dataIndex: "FQDNs",
      key: "FQDNs",
      align: "center",
    },
  ];

  const moreColumns: TableProps<any>["columns"] = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      align: "center",
    },
    {
      title: "IP Src",
      dataIndex: "IP_Src",
      key: "IP_Src",
      align: "center",
    },
    {
      title: "IP Dst",
      dataIndex: "IP_Dst",
      key: "IP_Dst",
      align: "center",
    },
    {
      title: "MAC Src",
      dataIndex: "MAC_Src",
      key: "MAC_Src",
      align: "center",
    },
    {
      title: "MAC Dst",
      dataIndex: "MAC_Dst",
      key: "MAC_Dst",
      align: "center",
    },
    {
      title: "Port Src",
      dataIndex: "Port_Src",
      key: "Port_Src",
      align: "center",
    },
    {
      title: "Port Dst",
      dataIndex: "Port_Dst",
      key: "Port_Dst",
      align: "center",
    },
    {
      title: "Length (in Kbytes)",
      dataIndex: "Length",
      key: "Length",
      align: "center",
    },
  ];

  const onSearch = () => {
    const searchData = form.getFieldsValue();
    const { datetime, ...rest } = searchData;
    const start = datetime[0];
    const end = datetime[1];
    const query = { start, end, ...rest };
    console.log(query);
  };

  const getEventsData = async () => {
    const res = await QuickWinsApi.DASHBOARD_GRAPHS({});
    console.log(res);
  };

  const getNetFlowData = async () => {};

  useEffect(() => {
    if (activeTab === "events") {
      getEventsData();
    } else {
      getNetFlowData();
    }
  }, [activeTab]);

  return (
    <div>
      <Segmented<string> options={["events", "net flows"]} onChange={(value) => setActiveTab(value)} value={activeTab} />

      <div className="mt-[16px]">
        <div className="search-bar">
          <Form layout="inline" form={form}>
            <Form.Item label="IP" name="ip">
              <Input placeholder="IP address" />
            </Form.Item>
            <Form.Item name="datetime">
              <RangePicker showTime format={["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={onSearch}>
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="mt-[16px]">
          {(activeTab === "events" && (
            <div>
              <NetFlowGraph></NetFlowGraph>
              <Card>
                <Table className="mt-5" columns={columns} dataSource={data}></Table>
              </Card>
            </div>
          )) || (
            <div>
              <NetFlowGraph></NetFlowGraph>
              <Card>
                <Table columns={moreColumns} dataSource={dataTwo}></Table>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
