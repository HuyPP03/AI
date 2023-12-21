const calculateDistance = (point1, point2) => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Hàm tìm điểm gần nhất từ điểm click và in ra key của điểm đó
export const findNearestPoint = (clickX, clickY, data) => {
  const clickPoint = { x: clickX, y: clickY };
  let nearestPoint = null;
  let minDistance = Infinity;

  // Lặp qua từng điểm trong dữ liệu và cập nhật điểm gần nhất
  for (const key in data) {
    const currentPoint = data[key];
    const distance = calculateDistance(clickPoint, currentPoint);

    if (distance < minDistance) {
      minDistance = distance;
      nearestPoint = key;
    }
  }

  return nearestPoint;
};
