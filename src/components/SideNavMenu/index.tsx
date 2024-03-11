import { PieChartOutlined, DesktopOutlined, FileOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "umi";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [getItem("Dashboard", "/dashboard", <PieChartOutlined />), getItem("Investigation", "/investigation", <DesktopOutlined />), getItem("Subnet", "/subnet", <FileOutlined />), getItem("Config", "/config", <FileOutlined />)];

export default function SideNavMenu() {
  const navigate = useNavigate();

  return <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={(e) => navigate(e.key)} />;
}
