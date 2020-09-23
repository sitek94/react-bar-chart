import React from 'react';
import { scaleBand, scaleLinear, max } from 'd3';

import { useData } from './useData';

const width = 960;
const height = 500;
const margin = {
	top: 50,
  right: 50,
  bottom: 50,
  left: 200
}
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

export const App = () => {
  const data = useData();
  
  if (!data) return <pre>Loading...</pre>;

  const yScale = scaleBand()
  	.domain(data.map(d => d.Country))
  	.range([0, innerHeight])
  	.padding(.1);
  
  const xScale = scaleLinear()
  	.domain([0, max(data, d => d.Population)])
  	.range([0, innerWidth]);
  
  return (
  	<svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map(tickValue => (
          <g 
            key={tickValue}
            transform={`translate(${xScale(tickValue)}, 0)`} 
          >
            <line y2={innerHeight} stroke="black" />
            <text 
              y={innerHeight + 3} 
              dy=".71em"
              textAnchor="middle"
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map(tickValue => (
            <text
              key={tickValue}
              x="-6"
              dy=".32em"
              y={yScale(tickValue) + + (yScale.bandwidth() / 2)}
              textAnchor="end"
            >
              {tickValue}
            </text>
        ))}
        {data.map(d => (
          <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)} 
            height={yScale.bandwidth()} 
          />
        ))}
      </g>
    </svg>
  )
};
