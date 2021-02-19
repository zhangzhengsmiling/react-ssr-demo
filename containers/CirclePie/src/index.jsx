import React, { useEffect, useRef,useState } from "react";
import echart from "echarts";

const DEFAULT_CHART_WIDTH = 400;
const DEFAULT_CHART_HEIGHT = 300;

const useWindowSize = (callback) => {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onWindowSizeChange = (e) => {
    setSize({ width: e.target.innerWidth, height: e.target.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", onWindowSizeChange);
  }, []);

  useEffect(() => {
    if (typeof callback === "function") callback(size);
  }, [size]);
  return size;
};

const circlePie = (props) => {
  const container = useRef(null);
  const chart = useRef(null);

  useWindowSize(() => {
    //跟踪窗口尺寸变化
    if (chart.current) {
      chart.current.resize();
    }
  });

  useEffect(() => {
    if (container.current) {
      chart.current = echart.init(container.current);
    }

    let dashedPic =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC";
    let color = ["#FF8700", "#ffc300", "#00e473", "#009DFF"];
    let chartData = [
      {
        name: "本科及以上",
        value: 13211,
        unit: "元",
      },
      {
        name: "高中",
        value: 42111,
        unit: "元",
      },
      {
        name: "初中及以下",
        value: 81711,
        unit: "元",
      },
      {
        name: "其他",
        value: 121711,
        unit: "元",
      },
    ];
    let arrName = [];
    let arrValue = [];
    let sum = 0;
    let pieSeries = [];
    let lineYAxis = [];

    // 数据处理
    chartData.forEach((v, i) => {
      arrName.push(v.name);
      arrValue.push(v.value);
      sum = sum + v.value;
    });

    // 图表option整理
    chartData.forEach((v, i) => {
      pieSeries.push({
        name: "学历",
        type: "pie",
        clockWise: false,
        hoverAnimation: false,
        radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
        center: ["30%", "50%"],
        label: {
          show: false,
        },
        data: [
          {
            value: v.value,
            name: v.name,
          },
          {
            value: sum - v.value,
            name: "",
            itemStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
        ],
      });
      pieSeries.push({
        name: "",
        type: "pie",
        silent: true,
        z: 1,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
        center: ["30%", "50%"],
        label: {
          show: false,
        },
        data: [
          {
            value: 7.5,
            itemStyle: {
              color: "#E3F0FF",
            },
          },
          {
            value: 2.5,
            name: "",
            itemStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
        ],
      });
      v.percent = ((v.value / sum) * 100).toFixed(1) + "%";
      lineYAxis.push({
        value: i,
        textStyle: {
          rich: {
            circle: {
              color: color[i],
              padding: [0, 5],
            },
          },
        },
      });
    });

    var option = {
      backgroundColor: "#fff",
      color: color,
      grid: {
        top: "15%",
        bottom: "54%",
        left: "30%",
        containLabel: false,
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (params) {
              let item = chartData[params];
              return (
                "{line|}{circle|●}{name|" +
                item.name +
                "}{bd||}{percent|" +
                item.percent +
                "}{value|" +
                item.value +
                "}{unit|元}"
              );
            },
            interval: 0,
            inside: true,
            textStyle: {
              color: "#333",
              fontSize: 14,
              rich: {
                line: {
                  width: 170,
                  height: 10,
                  backgroundColor: { image: dashedPic },
                },
                name: {
                  color: "#666",
                  fontSize: 14,
                },
                bd: {
                  color: "#ccc",
                  padding: [0, 5],
                  fontSize: 14,
                },
                percent: {
                  color: "#333",
                  fontSize: 14,
                },
                value: {
                  color: "#333",
                  fontSize: 16,
                  fontWeight: 500,
                  padding: [0, 0, 0, 20],
                },
                unit: {
                  fontSize: 14,
                },
              },
            },
            show: true,
          },
          data: lineYAxis,
        },
      ],
      xAxis: [
        {
          show: false,
        },
      ],
      series: pieSeries,
    };

    chart.current.setOption(option);
  });
  return (
    <div
      ref={container}
      style={{
        width: props.width || `${DEFAULT_CHART_WIDTH}px`,
        height: props.height || `${DEFAULT_CHART_HEIGHT}`,
      }}
    ></div>
  );
};
export default circlePie;
