export function convertToTimestamp(date: string, time: string) {
  return date + "T" + time;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString()}`;
}
