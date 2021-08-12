const MAX_MINUTES_DAY = 1440;
const MAX_MINUTES_HOUR = 60;

export function getRandomInt (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function getTimeFromMins(mins) {
  const days = mins/MAX_MINUTES_DAY >= 1 ? Math.trunc(mins/MAX_MINUTES_DAY) : 0;

  const hours = (mins - days*MAX_MINUTES_DAY)/MAX_MINUTES_HOUR >= 1
    ? Math.trunc((mins - days*MAX_MINUTES_DAY)/MAX_MINUTES_HOUR) : 0;

  const minutes = (mins - days*MAX_MINUTES_DAY - hours*MAX_MINUTES_HOUR) >= 1
    ? Math.ceil(mins - days*MAX_MINUTES_DAY - hours*MAX_MINUTES_HOUR) : 0;

  let str = days ? `${days}D ` : '';
  str += hours || days ? `${hours}H ` : '';
  str += `${minutes}M`;
  return str;
}

export function getStrFromArr (arr, functOnArrItems, firstItem = '') {
  return arr.reduce((str,arrItem) => {
    arrItem = functOnArrItems ? functOnArrItems(arrItem) : arrItem;
    return str + arrItem;
  },firstItem);
}
