import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Select, Switch, Table, TableColumnType, Tag, Typography } from "antd";
import DevicesApi from "@/services/devices";
import { UPDATE_TAG } from "@/services/management";

interface Item {
  key: string;
  name: string;
  associated: number;
  address: string;
  status: boolean;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "select" | "switch";
  record: Item;
  index: number;
  children: React.ReactNode;
}

// 输入框
const EditableCell: React.FC<EditableCellProps> = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const compMap = {
    number: <InputNumber />,
    select: <Select></Select>,
    switch: <Switch></Switch>,
    text: <Input></Input>,
  };

  const inputNode = compMap[inputType as keyof typeof compMap];
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ConfigPage: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const [devicesTableData, setDevicesTableData] = useState<any[]>([]);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...devicesTableData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDevicesTableData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDevicesTableData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Firefly Name",
      dataIndex: "tag",
      editable: true,
    },
    {
      title: "IP Address",
      dataIndex: "ip",
      editable: true,
    },
    {
      title: "Associated Firebug",
      dataIndex: "associated",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      editable: true,
      render: (_: any, record: any) => {
        return <span className={record.status ? "text-red-400" : "text-gray-400"}>●</span>;
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "120px",
      align: "center",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    const inputTypeMap = {
      status: "switch",
      associated: "select",
      address: "number",
    };
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: inputTypeMap[col.dataIndex as keyof typeof inputTypeMap] || "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // 查询所有设备
  const getAllDevices = async () => {
    const res = await DevicesApi.FETCH_ALL_DEVICES();
    console.log(res, "getAllDevices");
    if (res.length) {
      setDevicesTableData(res);
    }
  };
  // 更新设备tag
  const updateTag = async () => {
    const res = await UPDATE_TAG({ mac: "192.168.2.4", tag: "writeby2u" });
    debugger;
  };

  useEffect(() => {
    getAllDevices();
    updateTag();
  }, []);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={devicesTableData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ConfigPage;
