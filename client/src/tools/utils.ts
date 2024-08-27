import { parse, format } from 'date-fns';

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
