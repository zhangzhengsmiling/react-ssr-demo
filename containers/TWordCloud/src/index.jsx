import React, { useEffect, useRef, useState, useCallback } from 'react';
// import 'echarts/lib/chart/wordcloud';
// import { echart } from 'kov-base';
import echart from 'echarts';
import 'echarts-wordcloud';

import useWindowSize from './hooks/useWindowSize';
import defaultData from './data';
// import data from './data';

const DEFAULT_CHART_WIDTH = '100%';
const DEFAULT_CHART_HEIGHT = 600;

const TWordCloud = (props) => {
  const container = useRef(null);
  const chart = useRef(null);
  
  const colors = ['#ffe400', '#634fd4', '#e75a46', '#29a8ed']

  useWindowSize(() => {
    if(chart.current)
      chart.current.resize();
  });

  const data = (props.data || defaultData).map(item => ({
    name: item.name,
    value: item.value,
    textStyle: {
      normal: {
        color: colors[Math.floor(Math.random() * 4)]
      }
    }
  }))

  useEffect(() => {
    if(container.current) {
      chart.current = echart.init(container.current);
    }

    const option = {
      backgroundColor: '#031739',
      color: colors,
      tooltip: {
        show: true,
        textStyle: {
          fontSize: "16",
          color: "#3c3c3c"
        },
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
      },
      series: [{
        name: '',
        type: "wordCloud",
        gridSize: 20,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: "circle",
        autoSize: {
          enable: true,
          minSize: 18
        },
        data,
      }]
    }
    chart.current.setOption(option);
  }, [props.data, props.option])

  return <div ref={container} style={{ width: props.width || `${DEFAULT_CHART_WIDTH}px`, height: props.height || `${DEFAULT_CHART_HEIGHT}px` }} />
}

export default TWordCloud;
