import useEChart from "@/hooks/useEchart";
import { EChartsOption } from "echarts";
import * as echarts from "echarts";

export default function NetFlowGraph(props: any) {
  const { xAxis = ["Magic Device", "Smart Fridge", "Toaster"], yAxis = [410000, 4100, 4024] } = props.chartData;
  const sideData = yAxis.map((item: number) => item + 4.5);

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      formatter: "{b} : {c}",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: {
      data: xAxis,
      //坐标轴
      axisLine: {
        lineStyle: {
          color: "#3eb2e8",
        },
      },
      //坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: "#000",
        },
      },
    },
    yAxis: {
      //坐标轴
      axisLine: {
        show: false,
      },
      //坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: "#000",
        },
      },
      //分格线
      splitLine: {
        lineStyle: {
          color: "#4784e8",
        },
      },
    },
    series: [
      {
        name: "a",
        tooltip: {
          show: false,
        },
        type: "bar",
        barWidth: 24.5,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: "#0B4EC3", // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: "#138CEB", // 60% 处的颜色
                },
                {
                  offset: 1,
                  color: "#17AAFE", // 100% 处的颜色
                },
              ],
              false
            ),
          },
        },
        data: yAxis,
        barGap: 0,
      },
      {
        type: "bar",
        barWidth: 8,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: "#09337C", // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: "#0761C0", // 60% 处的颜色
                },
                {
                  offset: 1,
                  color: "#0575DE", // 100% 处的颜色
                },
              ],
              false
            ),
          },
        },
        barGap: 0,
        data: sideData,
      },
      {
        name: "b",
        tooltip: {
          show: false,
        },
        type: "pictorialBar",
        itemStyle: {
          borderWidth: 1,
          borderColor: "#0571D5",
          color: "#1779E0",
        },
        symbol: "path://M 0,0 l 120,0 l -30,60 l -120,0 z",
        symbolSize: ["30", "12"],
        symbolOffset: ["0", "-11"],
        //symbolRotate: -5,
        symbolPosition: "end",
        data: yAxis,
        z: 3,
      },
    ],
  };
  const { domRef, renderChart } = useEChart({
    chartData: option,
  });
  return <div style={{ width: "100%", height: "100%" }} ref={domRef}></div>;
}
