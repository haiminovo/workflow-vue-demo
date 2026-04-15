export const pointFilter = (points) => {
  const allPoints = points;
  let i = 1;
  while (i < allPoints.length - 1) {
    const pre = allPoints[i - 1];
    const current = allPoints[i];
    const next = allPoints[i + 1];
    if ((pre.x === current.x && current.x === next.x)
      || (pre.y === current.y && current.y === next.y)) {
      allPoints.splice(i, 1);
    } else {
      i++;
    }
  }
  return allPoints;
};

export const createOrthogonalRoute = ({
  startPoint,
  endPoint,
  sourceNode,
  targetNode,
  offset,
  midX,
  detourY,
  fallbackHeight = 0,
}) => {
  if (!startPoint || !endPoint) {
    return [];
  }

  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const sourceExitX = x1 + offset;
  const targetEntryX = x2 - offset;

  if (sourceExitX <= targetEntryX) {
    const preferredMidX = midX ?? Math.max(sourceExitX, Math.min((x1 + x2) / 2, targetEntryX));
    return pointFilter([
      { x: x1, y: y1 },
      { x: preferredMidX, y: y1 },
      { x: preferredMidX, y: y2 },
      { x: x2, y: y2 }
    ]);
  }

  const sourceHalfHeight = (sourceNode?.height || fallbackHeight) / 2;
  const targetHalfHeight = (targetNode?.height || fallbackHeight) / 2;
  const preferredDetourY = detourY ?? (
    y2 >= y1
      ? Math.max(y1 + sourceHalfHeight, y2 + targetHalfHeight) + offset
      : Math.min(y1 - sourceHalfHeight, y2 - targetHalfHeight) - offset
  );

  return pointFilter([
    { x: x1, y: y1 },
    { x: sourceExitX, y: y1 },
    { x: sourceExitX, y: preferredDetourY },
    { x: targetEntryX, y: preferredDetourY },
    { x: targetEntryX, y: y2 },
    { x: x2, y: y2 }
  ]);
};
