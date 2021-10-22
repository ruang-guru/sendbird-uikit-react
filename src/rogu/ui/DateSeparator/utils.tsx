import { differenceInCalendarDays, format, getDay } from "date-fns";

import { getDayString, DayStringType } from "../../utils";

export type DateSeparatorStringsType = {
  today: string;
  yesterday: string;
  days: DayStringType;
};

export const getDateSeparatorDifference = (
  createdAt: Date | number,
  strings: DateSeparatorStringsType
): string => {
  const diffWithToday = differenceInCalendarDays(new Date(), createdAt);

  if (diffWithToday === 0) {
    return strings.today;
  } else if (diffWithToday === 1) {
    return strings.yesterday;
  } else if (diffWithToday <= 7) {
    return getDayString(getDay(createdAt), strings.days);
  } else {
    return format(createdAt, "dd/MM/yyyy");
  }
};

export default getDateSeparatorDifference;
