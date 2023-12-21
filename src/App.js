// src/App.js
import React, { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import { data, graph } from "./data";
import createWeightedGraph from "./weightedGraph";
import dijkstra from "./dijkstra";
import astar from "./astar";
import { renderLines, renderPoints } from "./render";
import { findNearestPoint } from "./nearestPointKey";
import { number } from "./Number";
const App = () => {
  const [startValue, setStartValue] = useState("");
  const [graphItem, setGraphItem] = useState(null);
  const [endValue, setEndValue] = useState("");
  const [startClick, setStartClick] = useState("");
  const [endClick, setEndClick] = useState("");
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("0");
  const [points, setPoints] = useState([]);
  const [result, setResult] = useState({ distance: 0, path: [] });
  const [done, setDone] = useState(false);
  const [type, setType] = useState("dijkstra");
  useEffect(() => {
    if (points.length === 2) {
      setStartClick(findNearestPoint(points[0].x, points[0].y, data));
      setEndClick(findNearestPoint(points[1].x, points[1].y, data));
      setDone(true);
    }
  }, [points]);
  const handleStageClick = (e) => {
    if (points.length < 2) {
      const { offsetX, offsetY } = e.evt;
      setPoints([...points, { x: offsetX, y: offsetY }]);
    }
  };
  useEffect(() => {
    setGraphItem(createWeightedGraph(data, graph));
  }, []);
  useEffect(() => {
    if (type === "dijkstra") {
      const result = dijkstra(graphItem, start, end);
      setResult(result);
      console.log("dùng dijkstra");
    } else if (type === "astar") {
      const result = astar(graphItem, start, end);
      setResult(result);
      console.log("dùng astar");
    }
  }, [start, end, graphItem, type]);
  console.log(graphItem);
  function handleClick() {
    setStart(number[startValue]);
    setEnd(number[endValue]);
  }
  function handleClickClick() {
    setStart(startClick);
    setEnd(endClick);
    setPoints([]);
  }
  function handleClickDelete() {
    setStart("0");
    setEnd("0");
    setStartValue("");
    setEndValue("");
  }
  function handleClickDeleteClick() {
    setPoints([]);
    setStart("0");
    setEnd("0");
    setDone(false);
  }
  if (result.distance !== Infinity) {
    var path = result.path;
    var getCoordinatesFromPath = (path, data) => {
      return path.map((node) => data[node]);
    };
    var pathCoordinates = getCoordinatesFromPath(path, data);
  } else {
    console.log(`Không có đường đi từ điểm ${start} đến điểm ${end}`);
  }
  const Points = renderPoints(pathCoordinates);
  const Lines = renderLines(pathCoordinates);
  const PointsClick = renderPoints(points);
  return (
    <div className="content">
      <div className="map_search_btn">
        <h1>Bản đồ phường Giảng Võ</h1>
        <div className="wrapper">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/hust-entertainment.appspot.com/o/map.jpg?alt=media&token=ff7c3752-c605-42f2-a016-8b7a38da9e2f"
            alt="map"
            className="img"
          />
          <div className="absolute">
            <Stage width={1200} height={800} onClick={handleStageClick}>
              <Layer>
                {Points}
                {Lines}
                {PointsClick}
              </Layer>
            </Stage>
          </div>
        </div>
        <div className="search">
          <h2>Search here!</h2>
          <div className="btn">
            <button
              type="button"
              onClick={(e) => setType(e.target.textContent)}
            >
              dijkstra
            </button>
            <button
              type="button"
              onClick={(e) => setType(e.target.textContent)}
            >
              astar
            </button>
          </div>
          <div>
            <h3>Nhập địa chỉ</h3>
            <div className="search_input">
              <input
                type="text"
                placeholder="start"
                value={startValue}
                onChange={(e) => setStartValue(e.target.value)}
              />
              <input
                type="text"
                placeholder="end"
                value={endValue}
                onChange={(e) => setEndValue(e.target.value)}
              />
            </div>
            <div className="click_search">
              <button type="submit" onClick={handleClick}>
                Tìm
              </button>
              <button type="submit" onClick={handleClickDelete}>
                Xóa
              </button>
            </div>
          </div>
          <h3>Chọn vị trí</h3>
          <p>Click trên bản đồ để chọn vị trí</p>
          {done && (
            <div>
              <div className="click_search">
                <button type="submit" onClick={handleClickClick}>
                  Tìm
                </button>
                <button type="submit" onClick={handleClickDeleteClick}>
                  Xóa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
