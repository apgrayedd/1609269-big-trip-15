import dayjs from 'dayjs';

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

export function getStrFromArr (arr, functOnArrItems, activeStr = false, functWithActStr = false, firstItem = '') {
  return arr.reduce((str,arrItem) => {
    if (activeStr && arrItem === activeStr) {
      arrItem = functWithActStr(activeStr);
    } else {
      arrItem = functOnArrItems ? functOnArrItems(arrItem) : arrItem;
    }
    return str + arrItem;
  },firstItem);
}

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
export const isDateFuture = (date) => (dayjs(date).isAfter(dayjs()));
export const isDatePast = (date) => (dayjs(date).isBefore(dayjs()));

export const matchValidationInteger = (fieldValue) => {
  if (!fieldValue) {
    return false;
  }

  const match = fieldValue.match(/[0-9]*/);

  if (!match) {
    return 'Поле может содержать только числа!';
  }

  const result = match[0] === match['input'] ? fieldValue : false;
  if (!result) {
    return 'Поле может содержать только числа!';
  }

  return false;
};
export const dateValidation = (dateA, dateB) => {
  if (dayjs(dateA).diff(dayjs(dateB)) < 0) {
    return 'Дата конца не может превышать дату начала!';
  }
};
