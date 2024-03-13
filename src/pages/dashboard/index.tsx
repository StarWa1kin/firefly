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
import QuickWinsApi from "@/services/quickWins";

interface DataType {
  key: string;
  ff_id: string;
  ip: string;
  mac: string;
  tag: string;
  group: string;
}

const mockDeviceData: DataType[] = [
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

export default function DashboardPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [priorityCountChartData, setPriorityCountChartData] = useState<any[]>([]);

  const [deviceTableData, setDeviceTableData] = useState<DataType[]>();

  const [topTalkersChartData, setTopTalkersChartData] = useState<any>({});

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

  const formatter = (value: number) => <CountUp end={value} separator="," />;

  const doAThing = async () => {
    // DashboardAddNewTTLDataSource();
  };

  const getAllDevices = async () => {
    const res = await DevicesApi.FETCH_ALL_DEVICES();
    console.log(res, "getAllDevices");
    if (res.length) {
      setDeviceTableData(res as DataType[]);
    }
  };

  const getAlertCount = async () => {
    const res = await AlertApi.FETCH_ALERTS_COUNT();
    console.log(res, "Security Events by Priority");
    if (res.length) {
      const data = res.map((item) => ({ name: item.priorty, value: item.count }));
      setPriorityCountChartData(data);
    }
  };

  const getAllAlerts = async () => {
    const res = await AlertApi.FETCH_ALL_ALERTS();
    console.log(res, "getAllAlerts");
    if (res.length) {
    }
  };

  const getRencentEvents = async () => {
    const res = await QuickWinsApi.DASHBOARD_INVESTIGATE_LOG({
      page_index: 1,
      page_size: 10,
    });
    debugger;
  };

  const getLockThroughout = async () => {
    const res = await NetWorkApi.FETCH_LOCK_THROUGHPUT();
    debugger;
    console.log(res, "getLockThroughout");
  };

  const getTopTalkerDevices = async () => {
    const res = await NetWorkApi.FETCH_TOP_TALKER_DEVICES();
    console.log(res, "getTopTalkerDevices");
    if (res.length) {
      const xAxis = res.map((item) => item.mac);
      const yAxis = res.map((item) => item.len);
      const data = { xAxis, yAxis };
      setTopTalkersChartData(data);
    }
  };

  const onSearch = () => {
    const queryData = form.getFieldsValue();
    console.log(queryData, "query");
  };

  useEffect(() => {
    doAThing();
    // getAllAlerts();
    getAlertCount();
    getAllDevices();
    getLockThroughout();
    getRencentEvents();
    getTopTalkerDevices();
  }, []);

  return (
    <div>
      <div className="search-bar">
        <Form layout="inline" form={form}>
          <Form.Item label="IP" name="ip">
            <Input placeholder="IP address" />
          </Form.Item>
          <Form.Item label="PORT" name="port">
            <Input placeholder="port" />
          </Form.Item>
          <Form.Item name="date">
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
            <TopTalkers chartData={topTalkersChartData}></TopTalkers>
          </div>
        </Card>

        <Card title="Most Recent Security Events " style={{ width: "49%", marginBottom: 32 }}>
          <RecentSecurityEvents />
        </Card>

        <Card title="Network at a Glance " style={{ width: "49%", marginBottom: 32 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Known Devices" value={deviceTableData?.length || 0} formatter={formatter as Formatter} />
            </Col>
            <Col span={12}>
              <Statistic title="Known Locks" value={deviceTableData?.length || 0} precision={2} formatter={formatter as Formatter} />
            </Col>
          </Row>
        </Card>

        <Card title="All Known Devices" style={{ width: "49%", marginBottom: 32 }}>
          <Table columns={columns} dataSource={deviceTableData} pagination={false} />
        </Card>
      </div>
    </div>
  );
}
