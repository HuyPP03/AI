export default function astar(graph, start, end) {
  const distances = {};
  const previousNodes = {};
  const openSet = new PriorityQueue();

  // Khởi tạo khoảng cách và nút trước đó
  for (const node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    previousNodes[node] = null;
    const heuristicCost = heuristic(node, end);
    openSet.enqueue(node, distances[node] + heuristicCost);
  }

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();

    if (current === end) {
      // Tái tạo đường đi
      const path = reconstructPath(previousNodes, start, end);
      return { distance: distances[end], path };
    }

    for (const neighbor in graph[current]) {
      const newDistance = distances[current] + graph[current][neighbor];

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previousNodes[neighbor] = current;
        const heuristicCost = heuristic(neighbor, end);
        openSet.enqueue(neighbor, newDistance + heuristicCost);
      }
    }
  }

  return { distance: Infinity, path: null }; // Không có đường đi
}

function heuristic(node, goal) {
  // Hàm heuristic ước lượng chi phí từ node đến goal
  return Math.sqrt((node[0] - goal[0]) ** 2 + (node[1] - goal[1]) ** 2);
}

function reconstructPath(previousNodes, start, end) {
  const path = [];
  let current = end;

  while (current !== null) {
    path.unshift(current);
    current = previousNodes[current];
  }

  return path;
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.sort();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift().element;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
