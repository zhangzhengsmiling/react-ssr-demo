import React, { Component } from 'react';
import * as echarts from 'echarts';

import './style';

const limitWidth = 1439;

const deviceOverview =  {
  legend: [
    '异常',
    '正常',
    '离线',
  ],
  xAxis: ['票务闸机', '售票机', '停车场道闸', '摄像机'],
  yAxis: [
    'count'
  ],
  data: [
    [5, 3, 1, 10],
    [6, 4, 8, 5],
    [9, 4, 15, 7]
  ],
}

const _color=[
  [ { offset: 0, color: 'rgb(238, 89, 72)' }, { offset: 1, color: 'rgba(238, 89, 72, 0)'} ],
  [ { offset: 0, color: 'rgb(230, 174, 62)' }, { offset: 1, color: 'rgba(230, 174, 62, 0)' } ] ,
  [ { offset: 0, color: 'rgb(28, 195, 179)' }, { offset: 1, color: 'rgba(28, 195, 179, 0)' } ]
]

export default class BarChart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { color = _color, data = deviceOverview } = this.props;
    console.log(color, data)
    color = color.map(item => {
      if(_.isArray(item)) {
        return new echarts.graphic.LinearGradient(0, 0, 0, 1, item)
      } else {
        return item;
      }
    })
    clearInterval(this.interval)

    if(this.chartDom) {
      this.chart = echarts.init(this.chartDom);
      // const clientWidth = document.documentElement.clientWidth;
      const fontSize = this.fontSize(14);
      const option = this.getOption(data, color, fontSize);
      this.chart.setOption(option);
      var app = {
        currentIndex: -1,
      };
      let idx = -1;
      this.intervalId = setInterval( () => {
        const clientWidth = document.documentElement.clientWidth;
        // const fontSize = 14 / 1920 * clientWidth;
        const fontSize = this.fontSize(14);
        const option = this.getOption(data, color, fontSize);
        const dataLen = option.series[0] ? option.series[0].data.length : 0;
        if(clientWidth <= limitWidth) {
          const dataZooms = [
            { start: 0, end: 30 },
            { start: 20, end: 50 },
            { start: 60, end: 90 },
          ]
          idx = (idx + 1) % 3;
          option.dataZoom.start = dataZooms[idx].start;
          option.dataZoom.end = dataZooms[idx].end;
        } else {
          option.dataZoom.start = 0;
          option.dataZoom.end = 100;
          // clearInterval(this.intervalId)
          idx = (idx + 1) % 4;
          // 取消之前高亮的图形
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            // dataIndex: app.currentIndex
            dataIndex: idx
          });
          app.currentIndex = (app.currentIndex + 1) % dataLen;
          //console.log(app.currentIndex);
          // 高亮当前图形
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            // dataIndex: app.currentIndex,
            dataIndex: idx,
          });
          // 显示 tooltip
          this.chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            // dataIndex: app.currentIndex
            dataIndex: idx,
          });
        }
        this.chart.setOption(option, false)
      }, 3000);
      window.addEventListener('resize', () => {
        // const clientWidth = document.documentElement.clientWidth;
        let fontSize;
        let Interval;
        fontSize = this.fontSize(14);
        Interval = this.interval(10)
        this.chart.resize();
        this.chart.setOption(this.getOption(data, color, fontSize,Interval), false)
      })
    }
  }

  fontSize = font => {
    const clientWidth = document.documentElement.clientWidth;
    if(clientWidth < 1140) {
      return font / 1920 * 1140;
    } else if(clientWidth >= 1140 && clientWidth <= 1920) {
      return font;
    } else if(clientWidth >= 1920) {
      return font / 1920 * clientWidth;
    }
  }

  interval = interval => {
    const clientWidth = document.documentElement.clientWidth;
    if(clientWidth < 1140) {
      return interval / 1920 * 1140;
    } else if(clientWidth >= 1140 && clientWidth <= 1920) {
      return interval;
    } else if(clientWidth >= 1920) {
      return interval / 1920 * clientWidth;
    }
  }

  getOption = (data, color, fontSize = 14,Interval=8) => {
    const clientWidth = document.documentElement.clientWidth;
    let initDataZoom = {
      start: 0,
      end: 100,
    }
    if(clientWidth <= limitWidth) {
      initDataZoom = {
        start: 0,
        end: 30,
      }
    }
    return {
      // backgroundColor:'#323a5e',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            fontSize
          }
        },
      legend: {
        data: data.legend,
        icon: 'circle',
        top: 14,
        textStyle: {
          color: "#fffc",
          fontSize,
        },
        itemWidth: 12,
        itemHeight: 10,
     },
     grid: {
      left: '2%',
      right: '2%',
      bottom: 20,
      top: 54,
      containLabel: true
    },
      xAxis: {
        type: 'category',
        data: data.xAxis,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fffc'
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            fontSize
          }
        }
      },
      dataZoom: {
        show: false,
        type: 'slider',
        start: initDataZoom.start,
        end: initDataZoom.end,
        zoomLock: true,
      },
 
      yAxis: {
        type: 'value',
        interval:Interval,
      //  max,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fffc',
          }
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            fontSize
          }
        }
      },
      series: data.data.map((item, index) => ({
        name: data.legend[index],
        type: 'bar',
        barWidth: '15%',
        itemStyle: {
          normal: {
              color: color[index],
          },
        },
        data: item,
      }))
    };

  }

  render() {
    const props = {...this.props};
    delete props.staticContext;
    return <div ref={chartDom => this.chartDom = chartDom} {...props}></div>
  }
}
