import React from 'react';
import { scaleBand, scaleLinear, max } from 'd3';

import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

// Window dimensions
const width = window.innerWidth;
const height = window.innerHeight;

// D3 Margin Convention
const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 200,
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

export const App = () => {
  // Fetch data using custom hook
  const data = useData();

  if (!data) return <pre>Loading...</pre>;

  // Y scale
  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])
    .padding(0.1);

  // X scale
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  // Values accessors
  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};
