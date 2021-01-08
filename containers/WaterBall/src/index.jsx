/**:
* @description: 水球图--水球形显示使用率
* @author: Created by 子阳 on 2020-09-10 14:17:44
*/
import React, { useEffect, useRef, useState } from 'react';
import echart from 'echarts';
import defaultData from './initData'
import 'echarts-liquidfill';
const DEFAULT_CHART_WIDTH = '100%';
const DEFAULT_CHART_HEIGHT = 500;
const useWindowSize = (callback) => {
  
    const [size, setSize] = useState({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });

    const onWindowSizeChange = (e) => {
        setSize({ width: e.target.innerWidth, height: e.target.innerHeight });
    }

    useEffect(() => {
        window.addEventListener('resize', onWindowSizeChange);
    }, [])

    useEffect(() => {
        if(typeof callback === 'function')
        callback(size);
    }, [size])
    return size;
}
const WaterBall = (props) => {
    const container = useRef(null);
    const chart = useRef(null);
    // data
    const data = props.data || defaultData;
    // const title = data[0].title
    // const value = data[0].value

    useWindowSize(() => {
        if(chart.current)
            chart.current.resize();
    });
    useEffect(() => {
        if(container.current) {
            chart.current = echart.init(container.current);
        }
        const option = {
            backgroundColor: '#fff', //背景色
            title:{
                text:data[0].title,
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 25,
                    color: 'rgb(97, 142, 205)'
                },
                x: 'center',
                y: 'top',
            },
            series: [
                {
                type: 'liquidFill',
                data: data,
                radius: '70%',
                // 水球颜色
                color: ['red', '#0f0', 'rgb(97, 142, 205)'],
                // outline  外边
                outline: {
                    // show: false
                    borderDistance: 5,
                    itemStyle: {
                        borderWidth: 5,
                        borderColor: 'rgba(255, 0, 0, 0.7)',
                        shadowBlur: 20,
                        shadowColor: 'rgba(255, 0, 0, 1)'
                    }
                },
                itemStyle: {
                    opacity: 0.6
                },
                emphasis: {
                    itemStyle: {
                        opacity: 0.9
                    }
                },
                label: {
                    normal: {
                        formatter: (data[0].value * 100).toFixed(2) + '%',
                        textStyle: {
                            fontSize: 40
                        }
                    }
                },
                // 内图 背景色 边
                backgroundStyle: {
                    color: '#fff',  //内部球背部颜色
                }
            }
            ]
        };
        chart.current.setOption(option);

    }, [props.data, props.option])
  
    return <div ref={container} style={{ width: props.width || `${DEFAULT_CHART_WIDTH}px`, height: props.height || `${DEFAULT_CHART_HEIGHT}px` }} />
}
  
export default WaterBall;