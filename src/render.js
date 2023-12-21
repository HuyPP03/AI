import React from "react";
import { Circle, Line } from "react-konva";

export const renderLines = (pathCoordinates) => {
  const lines = [];
  for (let i = 0; i < pathCoordinates?.length - 1; i++) {
    const startPoint = pathCoordinates[i];
    const endPoint = pathCoordinates[i + 1];
    lines.push(
      <Line
        key={i}
        points={[startPoint?.x, startPoint?.y, endPoint?.x, endPoint?.y]}
        stroke="blue"
        strokeWidth={4.5}
        lineJoin="round"
        lineCap="round"
        tension={0}
      />
    );
  }
  return lines;
};
export const renderPoints = (pathCoordinates) => {
  if (pathCoordinates) {
    return pathCoordinates.map((point, index) => (
      <React.Fragment key={index}>
        <Circle
          x={point.x}
          y={point.y}
          radius={
            index === 0 ? 10 : index === pathCoordinates.length - 1 ? 10 : 1
          }
          fill={
            index === 0
              ? "blue"
              : index === pathCoordinates.length - 1
              ? "green"
              : "blue"
          }
        />
      </React.Fragment>
    ));
  }
};
