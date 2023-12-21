function calculateDistance(point1, point2) {
  const dx = point1?.x - point2?.x;
  const dy = point1?.y - point2?.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export default function createWeightedGraph(data, graph) {
  const weightedGraph = {};

  Object.keys(graph).forEach((node) => {
    weightedGraph[node] = {};

    graph[node].forEach((neighbor) => {
      const distance = calculateDistance(data[node], data[neighbor]);
      weightedGraph[node][neighbor] = distance;
    });
  });

  return weightedGraph;
}
