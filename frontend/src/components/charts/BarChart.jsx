// components/charts/BarChart.jsx
import React from 'react';

export const BarChart = ({ data, height, valueKey, color }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(item => item[valueKey]));
  const barWidth = `${90 / data.length}%`;

  return (
    <div className="bar-chart" style={{ height: `${height}px` }}>
      <div className="bars-container">
        {data.map((item, index) => {
          const percentage = (item[valueKey] / maxValue) * 100;
          return (
            <div key={index} className="bar-wrapper" style={{ width: barWidth }}>
              <div 
                className="bar"
                style={{ 
                  height: `${percentage}%`,
                  backgroundColor: color
                }}
              >
                <span className="bar-value">{item[valueKey]}</span>
              </div>
              <span className="bar-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// components/charts/LineChart.jsx
export const LineChart = ({ data, height, valueKey, color }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(item => item[valueKey]));
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxValue - item[valueKey]) / maxValue) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="line-chart" style={{ height: `${height}px` }}>
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = ((maxValue - item[valueKey]) / maxValue) * 100;
          return (
            <g key={index}>
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill={color}
              />
              <text
                x={`${x}%`}
                y={`${y - 10}%`}
                textAnchor="middle"
                className="data-point-label"
              >
                {item[valueKey]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="chart-labels">
        {data.map((item, index) => (
          <span 
            key={index} 
            className="label"
            style={{ left: `${(index / (data.length - 1)) * 100}%` }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};