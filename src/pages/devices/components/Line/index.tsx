import useEChart from "@/hooks/useEchart";
import { EChartsOption } from "echarts";

const fontColor = "#000";

const option: EChartsOption = {
  grid: {
    left: "5%",
    right: "10%",
    top: "10%",
    bottom: "5%",
    containLabel: true,
  },
  tooltip: {
    show: true,
    trigger: "item",
  },
  legend: {
    show: true,
    x: "center",
    y: "35",
    icon: "stack",
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: "#1bb4f6",
    },
    data: ["Input", "Output"],
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        color: fontColor,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#397cbc",
        },
      },
      axisTick: {
        show: false,
      },
      data: ["0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000", "1100", "1200"],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "",
      min: 0,
      max: 1000,
      axisLabel: {
        formatter: "{value}",
      },
      axisLine: {
        lineStyle: {
          color: "#27b4c2",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#11366e",
        },
      },
    },
  ],
  series: [
    {
      name: "Input",
      type: "line",
      stack: "总量",
      symbol: "circle",
      symbolSize: 8,
      itemStyle: {
        normal: {
          color: "#0092f6",
          lineStyle: {
            color: "#0092f6",
            width: 1,
          },
        },
      },
      markPoint: {
        itemStyle: {
          normal: {
            color: "red",
          },
        },
      },
      data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
    },
    {
      name: "Output",
      type: "line",
      stack: "总量",
      symbol: "circle",
      symbolSize: 8,

      itemStyle: {
        normal: {
          color: "#00d4c7",
          lineStyle: {
            color: "#00d4c7",
            width: 1,
          },
        },
      },
      data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
    },
  ],
};
export default function Line() {
  const { domRef, renderChart } = useEChart({
    chartData: option,
  });
  return <div style={{ width: "100%", height: 600 }} ref={domRef}></div>;
}
