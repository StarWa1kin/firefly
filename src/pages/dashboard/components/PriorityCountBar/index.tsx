import useEChart from "@/hooks/useEchart";
import { EChartsOption } from "echarts";

let title = "total";
let color = ["#0E7CE2", "#FF8352", "#E271DE", "#F8456B", "#00FFFF", "#4AEAB0"];
let echartData = [
  {
    name: "P1",
    value: "2",
  },
  {
    name: "P2",
    value: "20",
  },
  {
    name: "P3",
    value: "80",
  },
  {
    name: "P4",
    value: "200",
  },
];

let formatNumber = function (num) {
  let reg = /(?=(\B)(\d{3})+$)/g;
  return num.toString().replace(reg, ",");
};
let total = echartData.reduce((a, b) => {
  return a + b.value * 1;
}, 0);

const option: EChartsOption = {
  color: color,
  title: [
    {
      text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
      top: "center",
      left: "center",
      textStyle: {
        rich: {
          name: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#666666",
            padding: [10, 0],
          },
          val: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#333333",
          },
        },
      },
    },
    // {
    //   text: "单位：个",
    //   top: 20,
    //   left: 20,
    //   textStyle: {
    //     fontSize: 14,
    //     color: "#666666",
    //     fontWeight: 400,
    //   },
    // },
  ],
  series: [
    {
      type: "pie",
      radius: ["45%", "60%"],
      center: ["50%", "50%"],
      data: echartData,
      hoverAnimation: false,
      itemStyle: {
        normal: {
          borderWidth: 2,
        },
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 120,
          lineStyle: {
            color: "#e6e6e6",
          },
        },
      },
      label: {
        normal: {
          formatter: (params: any) => {
            return "{icon|●}{name|" + params.name + "}{value|" + formatNumber(params.value) + "}";
          },
          padding: [0, -100, 25, -100],
          rich: {
            icon: {
              fontSize: 16,
            },
            name: {
              fontSize: 14,
              padding: [0, 10, 0, 4],
              color: "#666666",
            },
            value: {
              fontSize: 18,
              fontWeight: "bold",
              color: "#333333",
            },
          },
        },
      },
    },
  ],
};

export default function PriorityCountBar() {
  const { domRef, renderChart } = useEChart({
    chartData: option,
  });
  return <div style={{ width: "100%", height: "100%" }} ref={domRef}></div>;
}
