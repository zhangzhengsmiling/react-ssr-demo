/**:
* @description: 轮播表格组件
* @author: Created by binghe on 2020-09-23 19:21:27
*/

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './style.less';
import {
  data as defaultData,
  columns as defaultColumns
} from './constants';

const defaultMoveSpeed = 1;
const defaultDelay = 2000;
const defaultStyle = {
  width: '600px',
  header: {
    // color: 'red'
  },
  body: {
    // color: 'green'
  }
}

const DIRECTION = {
  DONW: Symbol('down'),
  UP: Symbol('up'),
}

/**
 * 
 * @param {初始化滚动方向} defaultDirection 
 * @param {方向enum} DIRECTION 
 */
const getRollFunc = (defaultDirection, DIRECTION) => {
  let direct = defaultDirection;
  return (container, moveSpeed, delay) => {
    return setInterval(() => {
      const scrollTop = container.current.scrollTop;  // 滚动条位置
      const visibleHeight = container.current.clientHeight; // 可视高度
      const scrolledHeight = container.current.scrollHeight; // 实际高度

      if(scrollTop + visibleHeight === scrolledHeight) {
       setTimeout(() => {
        direct = DIRECTION.UP;
       }, delay)
      } else if(scrollTop === 0) {
        setTimeout(() => {
          direct = DIRECTION.DONW;
        }, delay)
      }

      const scrollX = 0;
      const scrollY = direct === DIRECTION.DONW ? (1 * moveSpeed) : (-1 * moveSpeed);

      container.current.scrollBy(scrollX, scrollY);

    }, 40)
  }
}

const isFunction = (func) => {
  return typeof func === 'function';
}

const CarouselTable = (props) => {
  
  const dom = useRef(null);
  const ds = props.data || defaultData; // 数据域
  const columns = props.columns || defaultColumns; 
  const moveSpeed = props.moveSpeed || defaultMoveSpeed; // 轮播表格轮播速度，40ms移动的px数
  const delay = props.delay || defaultDelay;
  const style = props.style || defaultStyle;

  const headerStyle = style.header || {}; // 表头样式
  const bodyStyle = style.body || {}; // 表格样式

  // 生成轮播表格滚动函数
  const roll = useCallback(getRollFunc(DIRECTION.DONW, DIRECTION), DIRECTION);

  useEffect(() => {
    let intervalId = roll(dom, moveSpeed, delay);
    
    // dom.current.addEventListener('mousewheel', () => {
    //   console.log('aaa');
    // })

    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (
    <table className="carousel-table" style={{ width: style.width }}>
      <div className="carousel-table-header">
        <tr style={{ color: style.header.color, ...headerStyle }}>
          {
            columns.map(item => <th className="carousel-table-header-title">{item.name}</th>)
          }
        </tr>
      </div>
      <div className="carousel-table-body" ref={dom}>
        {
          ds.map((item, idx) => (
            <tr className="carousel-table-row" style={{ color: style.body.color, ...bodyStyle }}>
              {
                columns.map(col => (
                  <td className="carousel-table-body-grid">
                    {
                      isFunction(col.render) ? col.render(item, idx) : item[col.key]
                    }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </div>
    </table>
  )
}

export default CarouselTable;
