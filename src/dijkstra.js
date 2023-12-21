export default function dijkstra(graph, start, end) {
  const distances = {};
  const previousNodes = {};
  const priorityQueue = new PriorityQueue();

  // Khởi tạo khoảng cách và nút trước đó
  for (const node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    previousNodes[node] = null;
    priorityQueue.enqueue(node, distances[node]);
  }

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue();

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
        priorityQueue.enqueue(neighbor, newDistance);
      }
    }
  }

  return { distance: Infinity, path: null }; // Không có đường đi
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

function PriorityQueue() {
  const queue = [];

  function enqueue(element, priority) {
    queue.push({ element, priority });
    sort();
  }

  function dequeue() {
    if (isEmpty()) {
      return null;
    }
    return queue.shift().element;
  }

  function sort() {
    queue.sort((a, b) => a.priority - b.priority);
  }

  function isEmpty() {
    return queue.length === 0;
  }

  return {
    enqueue,
    dequeue,
    isEmpty,
  };
}
