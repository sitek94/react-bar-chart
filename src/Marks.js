import React from 'react';

export const Marks = ({ data, yScale, xScale }) => data.map(d => (
  <rect
    key={d.Country}
    x={0}
    y={yScale(d.Country)}
    width={xScale(d.Population)} 
    height={yScale.bandwidth()} 
  />
))