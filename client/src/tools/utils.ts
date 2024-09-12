import {parse, format, formatDistanceToNow} from 'date-fns';

export function convertToTimestamp(date: string, time: string) {
  return date + "T" + time;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString()}`;
}

export function combineDateWithT(date: string): string {
  const parsedDate = parse(date, 'MMMM d. yyyy, HH:mm', new Date());
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
}

export function calculateDaysAgo(dateArray: number[]): string {
  const [year, month, day, hour, minute, second, nanosecond] = dateArray;
  const date = new Date(year, month - 1, day, hour, minute, second, nanosecond / 1000000);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatArrayDate(dateArray: number[]) {
  const [year, month, day, hour, minute] = dateArray;
  const date = new Date(year, month - 1, day, hour, minute);
  return format(date, "MMM d, yyyy");
}
