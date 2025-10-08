import { DateTime } from 'luxon';

export function convertTimeToLocal(time: string, formatString = 'yyyy-MM-dd HH:mm:ss') {
  return DateTime.fromISO(time).toFormat(formatString);
}
