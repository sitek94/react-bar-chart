import React from 'react';

export const AxisBottom = ({ xScale, innerHeight }) => xScale.ticks().map(tickValue => (
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
))