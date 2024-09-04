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

export function calculateDaysAgo(date: string): string {
  const parsedDate = new Date(date);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - parsedDate.getTime();

  // Calculate the difference in days, hours, and minutes
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesAgo = Math.floor(timeDiff / (1000 * 60));

  // Return a human-readable string based on the difference
  if (daysAgo > 0) {
    return `${daysAgo} day(s) ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour(s) ago`;
  } else {
    return `${minutesAgo} minute(s) ago`;
  }
}
