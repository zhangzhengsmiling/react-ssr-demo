import React, { Component } from 'react';
import echarts from 'echarts';
import moment from 'moment';

import './style';

let currentIndex = -1;
const defaultData = {
  "column":[
    "time",
    "count"
  ],
  "legend":[
    {key: 'outCount', name: '出闸车辆数'},
    {key: 'inCount', name: '入闸车辆数'},
  ],
  "x":[
    "2019-12-30 08:00:00",
    "2019-12-30 09:00:00",
    "2019-12-30 10:00:00",
    "2019-12-30 11:00:00",
    "2019-12-30 12:00:00",
    "2019-12-30 13:00:00",
    "2019-12-30 14:00:00",
    "2019-12-30 15:00:00",
    "2019-12-30 16:00:00",
    "2019-12-30 17:00:00",
    "2019-12-30 18:00:00"
  ],
  "y":[
    // []
    [
      {
        "outCount":3,
        "inCount":0
      },
      {
        "outCount":8,
        "inCount":2
      },
      {
        "outCount":25,
        "inCount":53
      },
      {
        "outCount":29,
        "inCount":28
      },
      {
        "outCount":25,
        "inCount":11
      },
      {
        "outCount":120,
        "inCount":28
      },
      {
        "outCount":152,
        "inCount":24
      },
      {
        "outCount":178,
        "inCount":10
      },
      {
        "outCount":70,
        "inCount":0
      },
      {
        "outCount":0,
        "inCount":0
      },
      {
        "outCount":0,
        "inCount":0
      }
    ]
  ]
}

export default class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    lineChartTitle: [
      {'name': '入闸车辆数', color: '#F2B63D', active: true},
      {'name': '出闸车辆数', color: '#1EB99B', active: true}
    ],
  }

  static getDerivedStateFromProps (nextProps, state) {
    return {
      ...state,
      ...nextProps,
    }
  }

  getChartLineValue = list => {
    let listIn = [];
    let listOut = [];
    list.forEach(item => {
      listIn.push(item.inCount)
      listOut.push(item.outCount)
    })
    return [listIn, listOut]
  }

  lineChartTitleClick = (lineChartTitleItem, lineChartIndex) => {
    let lineChartTitleCopy = this.state.lineChartTitle;
    let elseIndex = (lineChartIndex + 1) % 2;
    if (lineChartTitleCopy[elseIndex].active) {
      if (lineChartTitleItem.active) {
        lineChartTitleCopy[lineChartIndex].active = false
      } else {
        lineChartTitleCopy[lineChartIndex].active = true
      }
      this.chart.dispatchAction({
        type: 'legendToggleSelect',
        name: lineChartTitleItem.name
      });
      this.setState({
        lineChartTitle: lineChartTitleCopy
      })
    }
  }

  getOption = () => {
    const { Data = defaultData } = this.props;
    const clientWidth = document.documentElement.clientWidth;
    let charts = {
      names: Data.legend.map(item => item.name),
      lineX: Data.x,
      value: this.getChartLineValue(Data.y[0])
    }
    const colors = this.props.colors.length && this.props.colors || ['rgba(242,182,61)', 'rgba(23, 255, 243)'];
    const yLabel ='';// this.props.yLabel || '单位:人';
    let fontSizeFn;
    if (clientWidth >= 1920) {
      fontSizeFn = val => {
        return val/1920*clientWidth
      }
    } else if (clientWidth >= 1140 && clientWidth <= 1440) {
      fontSizeFn = val => {
        return val/1440*clientWidth
      }
    } else {
      fontSizeFn = val => {
        return val
      }
    }
    // console.log(fontSizeFn(12), '---------------------')
    let lineY = []
    for (let i = 0; i < charts.names.length; i++) {
      let x = i
      let data = {
        name: charts.names[i],
        type: 'line',
        color: colors[i],
        symbol: 'circle',
        smooth:true,
        symbolSize: 4,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: this.opacity(colors[i], 0.3),
          }, {
              offset: 0.8,
              color: this.opacity(colors[i], 0),
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        data: charts.value[i]
      }
      lineY.push(data)
    };
    const option = {
      backgroundColor: '#1F3B6D',
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: charts.names,
        icon: 'circle',
        show:false,
        width:"120",
        textStyle: {
          fontSize: fontSizeFn(12),
          color: '#A7D9FF'
        },
        right:"50%",
      },
      //  坐标轴
      grid: {
        left: '2%',
        right: '2%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // boundaryGap: true, //两侧是否留白
        data: charts.lineX,
        // splitNumber: 6,
        axisLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            // opacity: 0.6,
            color: '#FFFFFFCC',
            fontFamily: 'PingFangHK-Regular',
            // fontSize: autoFix(12),
            fontSize: fontSizeFn(12),
          },
          formatter: function (params) {
            return moment(params).format('HH:mm')
          }
        }
      },
      yAxis: {
        name: yLabel,
        offset: 0,
        nameTextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: fontSizeFn(12),
          // fontSize: 12,
          color: '#A7D9FF',
          // align: 'right',
          padding: [0, 0, 0, 0]
        },
        type: 'value',
        // max:'200',
        // interval: 20,
        axisLabel: {
          textStyle: {
            // opacity: 0.8,
            fontFamily: 'PingFangHK-Regular',
            fontSize: fontSizeFn(12),
            // fontSize: 12,
            color: '#FFFFFFCC'
          }
        },
        splitLine: {
          lineStyle: {
            // color: '#64B0F380',
            // type: 'dashed',
            type:'dashed',
            color: '#64B0F3',
            opacity: 0.2
          }
        },
        axisLine: {
          show: false,
        }
      },
      dataZoom: [
      {
        type: 'slider',
        show: true,
        height: 8,
        xAxisIndex: [
          0
        ],
        bottom: '5%',
        left: 0,
        right: '2%',
        start: 0,
        end: 100,
        minValueSpan: 1,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        fillerColor: '#047DD8',
        dataBackground: {
          areaStyle: '#047DD8'
        },
        backgroundColor: 'rgba(80,140,194,0.50)',
        textStyle: {
          color: "#fff"
        },
        borderColor: "#508CC2"
      }, {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35
      }],
      series: lineY
    };

    return option;
  }

  componentDidMount() {
    const option = this.getOption();
    this.chart = echarts.init(this.chartDom);
    // console.log(option,'option');
    this.chart.setOption(option);
    window.addEventListener('resize', () => {
      this.chart.resize();
      const option = this.getOption();
      this.chart.setOption(option)
    })
    if (this.lineChartTimeDelay) window.clearInterval(this.lineChartTimeDelay);
    // 自动轮播高亮
    this.lineChartTimeDelay = setInterval(() => {
      let dataLen = option.series[0].data.length;
      // 取消之前高亮的图形
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      currentIndex = (currentIndex + 1) % dataLen;
      // 高亮当前图形
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      // 显示 tooltip
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    }, 1500);
  }

  opacity = (color, opacity) => {
    if(!color) return;
    const [r, g, b] = color.match(/\d+/g);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  render() {
    const { lineChartTitle } = this.state;
    const fontSize = 12 / 1440 * document.documentElement.clientWidth;
    return (
      <div className="line-chart" id="line-chart">
        <div ref={chart => this.chartDom = chart} {...this.props} />
        <div className="chartNameTitle" style={{ textAlign:"center",width:"100%", marginTop: '-2px' }}>
        {
          lineChartTitle.map((lineChartItem, lineChartIndex, target) => 
            <div
              key={`linechart-${lineChartIndex}`}
              // className={lineChartIndex == 0 ? '' : (target.reduce((temp, item) => temp + item.name.length, 0) < 10 ? 'mr8' : 'mr10')}
              onClick={() => {this.lineChartTitleClick(lineChartItem, lineChartIndex)}}
              style={{ cursor: 'pointer', display: 'inline-block', textIndent:lineChartIndex == 0?"0":"20px" }} 
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                  background: lineChartItem.active ? lineChartItem.color : '#fff',
                }}
              />
              <span
                className="chartMsg"
                style={{ color: lineChartItem.active ? '' : '#fff', fontSize: '12px' }}
              > {lineChartItem.name} </span>
            </div>
          )
        }
        </div>
      </div>
    )
  }
}
