import React, { Component } from 'react';
import * as echarts from 'echarts';

let dataStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    shadowBlur: 10,
    shadowColor: 'rgba(40, 40, 40, 0.5)'
  }
};
let placeHolderStyle = {
  normal: {
    color: 'rgba(51,77,130,1)', // 未完成的圆环的颜色
    label: {
      show: false
    },
    labelLine: {
      show: false
    }
  },
  emphasis: {
    color: 'rgba(51,77,130,1)' // 未完成的圆环的颜色
  }
};
const defaultColorStop = [{
  offset: 0,
  color: 'rgba(239,130,113,1)' // 0% 处的颜色
}, {
  offset: 1,
  color: 'rgba(239,106,85,1)' // 100% 处的颜色
}];

export default class CircleChart extends Component {
  state = {
    width: 0,
    height: 0,
    rotation: 0,
    autoRotate: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = echarts.init(this.chartDom);
    window.addEventListener('resize', () => {
      this.resize();
    })
    this.resize();
    if(this.props.autoRotate) this.rotate();
  }

  // 图表宽高自适应
  resize = () => {
    if(this.chart) {
      this.chart.resize();
    }
    this.setState({
      width: this.chart.getWidth(),
      height: this.chart.getHeight(),
    })
  }

  // 背景图片旋转
  rotate = () => {
    setInterval(() => {
      this.setState({ rotation: this.state.rotation - 0.03 })
    }, 1)
  }

  getOption = ({width, height, graphicUrl, rotation, value, text, total, colorStop}) => {
    let option = {
      // backgroundColor: '#1F3B6D',
      tooltip: {
        show: false,
      },
      grid: {
        width,
        height,
      },
      toolbox: {
        show: false,
      },
      graphic: { //设定图形元素 可以是image类型
        type: 'image',
        id: 'circle1', // 图片背景id
        z: 10,
        bounding: 'raw',
        origin: [ width / 2, height / 2], //平移（position）、旋转（rotation）、缩放（scale）原点 （与图形宽高设置关联)
        rotation,
        style: {
          image: graphicUrl,
          width,
          height,
          opacity: 0.7,
        }
      },
      series: [{
        type: 'pie',
        clockWise: true,
        radius: [width * 0.3, height * 0.4],
        itemStyle: dataStyle,
        hoverAnimation: false,
        animation: false,
        center: [width / 2, height / 2],
        data: [{
          value, //载入数据
          label: {
            normal: {
              position: 'center',
              show: true, //是否显示数字或百分比
              textStyle: {
                fontSize: width * 0.186,
                color: '#FFFFFF'
              },
              formatter: [
                `{count|${value}}`,
                `{msg|${text}}`
              ].join('\n'),
              rich: {
                count:{
                  color: 'white',
                  fontFamily:' PingFangSC-Regular',
                  fontSize: width * 0.186,
                  opacity: 1
                },
                msg: {
                  color: '#FFFFFF',
                  fontFamily: 'PingFangSC-Regular',
                  fontSize: width * 0.15,
                  opacity: 0.8
                },
              }
            }
          },
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: colorStop
              },
              shadowColor: '#0064f7',
              shadowBlur: 0,
              borderWidth: 0,
              borderColor: '#ffffff',
            }
          }
        }, {
          value: total - value, //背景数据
          name: 'invisible',
          itemStyle: placeHolderStyle,
        }]
      }]
    }
    return option;
  }

  render() {
    if(Number.isNaN(value)) return;
    const value = this.props.value === undefined ? 0 : this.props.value,
          text = this.props.text || '异常',
          total = this.props.total === undefined ? 0 : this.props.total,
          colorStop = this.props.colorStop ||  defaultColorStop,
          graphicUrl = this.props.graphicUrl || 'assets/images/error.png',
          rotation = this.props.autoRotate ? this.state.rotation : this.props.rotation;
    if(this.chart) {
      const width = this.state.width;
      const height = this.state.height;
      // const rotation = this.state.rotation;
      const option = this.getOption({width, height, graphicUrl, rotation, value, text, total, colorStop})
      this.chart.setOption(option);
    }
    return <div {...this.props} ref={(chart => this.chartDom = chart)}></div>
  }
}
