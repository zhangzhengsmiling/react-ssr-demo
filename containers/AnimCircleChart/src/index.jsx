import React, { useState, useEffect } from 'react';
import CircleChart from './components/CircleChart';
import imgError from './imgs/error.png';
import imgOnline from './imgs/onLine.png';
import imgOffline from './imgs/offLine.png';


const graphicUrls = [
  imgError,
  imgOffline,
  imgOnline,
]

const defaultData = [
  { text: '异常', colorStart: 'rgba(239,130,113,1)', colorEnd: 'rgba(239,106,85,1)', count: 2 },
  { text: '离线', colorStart: 'rgba(234,192,109,1)', colorEnd: 'rgba(234,186,88,1)', count: 2 },
  { text: '在线', colorStart: 'rgba(112,207,195,1)', colorEnd: 'rgba(94,198,182,1)', count: 3 },
]

const AnimCircleChart = (props) => {
  const {
    data = defaultData,
    total = (data) => {
      return data.reduce((temp, cur) => {
        return temp + cur.count;
      }, 0)
    }
  } = props;

  const _total = total(data);

  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    var intervalId = setInterval(() => {
      setRotation(rotation-0.01)
    },1)
    return clearInterval.bind(undefined, intervalId)
  })
  return (
    <div style={{ display: 'flex', background: 'rgb(34, 56, 100)', width: 260 }}>
      {
        data.map((item, index) => (
          <CircleChart
            style={{ width: 80, height: 80, marginLeft: 5, background: 'transparent', padding: 5 }}
            value={item.count}
            total={_total}
            rotation={rotation}
            colorStop={
              [
                { offset: 0, color: item.colorStart },
                { offset: 1, color: item.colorEnd },
              ]
            }
            text={item.text}
            graphicUrl={graphicUrls[index]}
          />
        ))
      }
    </div>
  )
}
export default AnimCircleChart;
