export function getFirstSegment(path: string) {
  const nextSegmentStart = path.indexOf("/", 1);
  const segmentEnd = nextSegmentStart > 0 ? nextSegmentStart : undefined;
  return path.substring(0, segmentEnd);
}
