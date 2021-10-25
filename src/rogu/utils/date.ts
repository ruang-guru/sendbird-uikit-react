import { Day } from 'date-fns';

export type DayStringType = { [key in Day]: string };

export const getDayString = (dayNumber: Day, strings: DayStringType) =>
  strings[dayNumber];
