import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as d3 from 'd3';

const defaultProps = {
  start: 0,
  value: 100,
  duration: 3000,
  mapFn: v => v,
}

const defaultStyle = {
  "fill": "orange",
  "stroke": "orange",
  "font-size": 40,
  "width": "100px",
  "height": "40px",
}

const parseStyleFromObject = (style = {}) => {
  return Object.keys(style)
    .reduce((temp, cur) => {
      return `${temp}${cur}:${style[cur]};`
    }, '')
}

const CountDown = (props) => {

  const style = Object.assign({}, defaultStyle, props.style);

  const svg = useRef();

  useEffect(() => {

    if(!svg.current) return;
    const mergeProps = Object.assign({}, defaultProps, props);
    const from = mergeProps.start;
    const value = mergeProps.value;
    const duration = mergeProps.duration;
    const mapFn = mergeProps.mapFn;

    d3.select(svg.current)
      .selectAll('text')
      .data([value])
      .join('text')
      .attr('dy', style['font-size'])
      .attr('style', parseStyleFromObject(style))
      // .attr('width', 40)
      .attr('height', 40)
      .text(from)
      .transition()
      .duration(duration)
      .tween('number-count-down', (d, idx, target) => {
        const i = d3.interpolateNumber(from, value);
        return t => d3.select(target[idx])
          .text(mapFn(i(t)))
      })
  }, [props])

  return <div>
    <svg ref={svg} style={{ width: style.width, height: style.height, margin: 0, padding: 0 }}></svg>
  </div>
}

export default CountDown;

// export default class CountDown extends Component {

//   static propTypes = {
//     start: PropTypes.number,
//     value: PropTypes.number,
//     time: PropTypes.number,
//     ticks: PropTypes.number,
//     mapFn: PropTypes.func,
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: 0,
//       lock: false,  // 加锁，防止数字滚动过程中，刷新
//       target: 0,
//     }
//   }
  
//   componentDidMount() {
//     const { start, value, time, ticks } = this.props;
//     this.setState({ lock: true });
//     if(!this.state.lock) this.roll(start, value, time, ticks);
//   }

//   componentWillReceiveProps({start, value, time, ticks}) {
//     this.setState({ lock: true });
//     if(!this.state.lock) this.roll(start, value, time, ticks);
//   }

//   roll = (start = 0, end = 0, time = 3000, ticks = 200) => {
//     this.setState({ target: end })
//     let tick = 0;
//     if(this.timeoutId) clearTimeout(this.timeoutId);
//     const easeFactor = this.easeFactor('ease-sqrt', start, end, ticks);
//     const fn = () => {
//       tick++;
//       this.setState({ counter: this.fnEaseSqrt(start, easeFactor, tick) });
//       if(this.state.counter >= end) {
//         this.setState({ counter: end });
//         clearTimeout(this.timeoutId);
//         this.setState({ lock: false })
//         return;
//       }
//       if(Number.isNaN(this.props.counter)) {
//         clearTimeout(this.timeoutId);
//         this.setState({lock: false});
//       }
//       this.timeoutId = setTimeout(() => {
//         fn();
//       }, time / ticks)
//     }
//     fn();
//   }

//   easeFactor = (mode, start, end, ticks) => {
//     switch(mode) {
//       case 'linear':
//         return (end - start) / (ticks);
//       case 'ease-sqrt':
//         return (end - start) / Math.sqrt(ticks);
//     }
//   }

//   // function: value = start + k * sqrt(tick);
//   fnEaseSqrt = (start, easeFactor, tick) => {
//     return start + easeFactor * Math.sqrt(tick);
//   }

//   componentWillUnmount() {
//     clearTimeout(this.timeoutId);
//   }

//   createEaseFucntion = () => {

//   }

//   render () {
//     let mapFn = this.props.mapFn;
//     return (
//       <>
//         {
//           <span {...this.props}>
//             {
//               (mapFn && _.isFunction(mapFn)) ? mapFn(this.state.counter) : this.state.counter
//             }
//           </span>
//         }
//       </>
//     )
//   }
// }
