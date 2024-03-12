import { Button, Card, Col, DatePicker, Form, Input, Row, Space, Statistic, Table, TableProps, Tag } from "antd";
import { Formatter } from "antd/es/statistic/utils";
import CountUp from "react-countup";

import TopTalkers from "./components/TopTalkers";
import TopTenLocksThroughput, { DashboardAddNewTTLDataSource } from "./components/TopTenLocksThroughput";
import PriorityCountBar from "./components/PriorityCountBar";

import { useNavigate } from "umi";
import { useEffect, useState } from "react";

import AlertApi from "@/services/alerts";
import DevicesApi from "@/services/devices";

import axios from "axios";
import RecentSecurityEvents from "./components/RecentSecurityEvents";
import NetWorkApi from "@/services/networks";

interface DataType {
  key: string;
  ff_id: string;
  ip: string;
  mac: string;
  tag: string;
  group: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [priorityCountChartData, setPriorityCountChartData] = useState<any[]>([]);

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
      render: (_, { tag }: any) => <Tag color="blue">{tag}</Tag>,
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
      render: (_) => (
        <Space size="middle">
          <a onClick={() => navigate(`/device-detail?ff_id=${_.ff_id}`)}>detail</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      ff_id: "Magic Device",
      ip: "192.178.1.1",
      mac: "DE:AD:BE:EF:00",
      tag: "demo",
      group: "Main Hub",
    },
    {
      key: "2",
      ff_id: "Smart Fridge",
      ip: "192.178.201.3",
      mac: "DE:AD:BE:EF:01",
      tag: "demo",
      group: "Kitchen",
    },
    {
      key: "3",
      ff_id: "Toaster",
      ip: "192.168.201.2",
      mac: "DE:AD:BE:EF:02",
      tag: "demo",
      group: "Kitchen",
    },
  ];

  const formatter = (value: number) => <CountUp end={value} separator="," />;

  const getAllAlerts = async () => {
    const res = await AlertApi.FETCH_ALL_ALERTS();
    console.log(res, "getAllAlerts");
    // const bes = await axios.get("http://localhost:5263/api/Alerts/fetch-alerts-alls");
    // console.log(bes);
  };

  const doAThing = async () => {
    // DashboardAddNewTTLDataSource();
  };

  const getAllDevices = async () => {
    const res = await DevicesApi.FETCH_ALL_DEVICES();
    console.log(res, "getAllDevices");
  };

  const getAlertCount = async () => {
    const res = await AlertApi.FETCH_ALERTS_COUNT();
    console.log("Security Events by Priority", res);
    if (res.length) {
      const data = res.map((item) => ({ name: item.priorty, value: item.count }));
      setPriorityCountChartData(data);
    }
  };

  const getLockThroughout = async () => {
    const res = await NetWorkApi.FETCH_LOCK_THROUGHPUT();
    console.log(res, "getLockThroughout");
  };

  const getTopTalkerDevices = async () => {
    const res = await NetWorkApi.FETCH_TOP_TALKER_DEVICES();
    console.log(res, "getTopTalkerDevices");
  };

  const onSearch = () => {};

  useEffect(() => {
    doAThing();
    getAllAlerts();
    getAlertCount();
    getAllDevices();
    getLockThroughout();
    getTopTalkerDevices();
  }, []);

  return (
    <div>
      <div className="search-bar">
        <Form layout="inline" form={form}>
          <Form.Item label="IP">
            <Input placeholder="IP address" />
          </Form.Item>
          <Form.Item label="PORT">
            <Input placeholder="port" />
          </Form.Item>
          <Form.Item>
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSearch}>
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-[16px] flex justify-between flex-wrap">
        <Card title="Security Events by Priority " style={{ width: "49%", marginBottom: 32 }}>
          <div className="h-[400px]">
            <PriorityCountBar echartData={priorityCountChartData} />
          </div>
        </Card>

        <Card title="Locks by Throughput" style={{ width: "49%", marginBottom: 32 }}>
          <TopTenLocksThroughput />
        </Card>

        <Card title="Top Talker Devices (in Kbps)" style={{ width: "49%", marginBottom: 32 }}>
          <div className="h-[400px]">
            <TopTalkers></TopTalkers>
          </div>
        </Card>

        <Card title="Most Recent Security Events " style={{ width: "49%", marginBottom: 32 }}>
          <RecentSecurityEvents />
        </Card>

        <Card title="Network at a Glance " style={{ width: "49%", marginBottom: 32 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Known Devices" value={3} formatter={formatter as Formatter} />
            </Col>
            <Col span={12}>
              <Statistic title="Known Locks" value={2} precision={2} formatter={formatter as Formatter} />
            </Col>
          </Row>
        </Card>

        <Card title="All Known Devices" style={{ width: "49%", marginBottom: 32 }}>
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    </div>
  );
}
