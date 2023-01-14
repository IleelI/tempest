export function getFirstSegment(path: string) {
  const nextSegmentStart = path.indexOf("/", 1);
  const segmentEnd = nextSegmentStart > 0 ? nextSegmentStart : undefined;
  return path.substring(0, segmentEnd);
}

export function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const regexLettersOnly = /^[a-zA-Z\s]*$/;
