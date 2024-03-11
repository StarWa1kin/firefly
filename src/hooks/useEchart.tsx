import { useEffect, useRef } from "react";

import { ECharts, EChartsOption, init } from "echarts";

type EventName = "click" | "dblclick" | "mousedown" | "mousemove" | "mouseup" | "mouseover" | "mouseout" | "globalout" | "contextmenu";

export type IEchartEvent = {
  [k in EventName]?: (e: any) => void;
};

export interface IConfig {
  chartData?: EChartsOption;
  chartEvent?: IEchartEvent;
  geoJSON?: any[];
}
export default function useEChart(config: IConfig) {
  const domRef = useRef(null);
  const INSTANCE = useRef<ECharts>();

  const renderChart = () => {
    INSTANCE.current?.clear();
    INSTANCE.current?.setOption(config.chartData as EChartsOption);
  };

  const resize = () => {
    INSTANCE.current?.resize();
  };

  const addChartEvents = () => {
    const events = config.chartEvent;
    if (!events) return;
    Object.entries(events).map(([eventName, eventCall]) => {
      return INSTANCE.current?.on(eventName, eventCall);
    });
  };

  useEffect(() => {
    if (!domRef.current) return;
    INSTANCE.current = init(domRef?.current);

    addChartEvents();

    window.addEventListener("resize", resize);
    return () => {
      return window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (config.chartData) {
      renderChart();
    }
  }, [config.chartData]);

  return {
    domRef,
    renderChart,
  };
}
