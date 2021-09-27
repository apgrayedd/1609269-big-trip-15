import dayjs from 'dayjs';
import isEmpty from 'lodash.isempty';

const MAX_MINUTES_DAY = 1440;
const MAX_MINUTES_HOUR = 60;

export const getTimeFromMins = (mins) => {
  const days = mins/MAX_MINUTES_DAY >= 1 ? Math.trunc(mins/MAX_MINUTES_DAY) : 0;

  const hours = (mins - days*MAX_MINUTES_DAY)/MAX_MINUTES_HOUR >= 1
    ? Math.trunc((mins - days*MAX_MINUTES_DAY)/MAX_MINUTES_HOUR) : 0;

  const minutes = (mins - days*MAX_MINUTES_DAY - hours*MAX_MINUTES_HOUR) >= 1
    ? Math.ceil(mins - days*MAX_MINUTES_DAY - hours*MAX_MINUTES_HOUR) : 0;

  let str = days ? `${days}D ` : '';
  str += hours || days ? `${hours}H ` : '';
  str += `${minutes}M`;
  return str;
};

export const getStrFromValues = (arr, functOnArrItems, activeStr = false, functWithActStr = false, firstItem = '') => {
  let count = 1;
  if (isEmpty(arr)) {
    return false;
  }

  return arr.reduce((str,arrItem) => {
    if (activeStr && arrItem === activeStr) {
      arrItem = functWithActStr(activeStr, count);
    } else {
      arrItem = functOnArrItems ? functOnArrItems(arrItem, count) : arrItem;
    }
    count += 1;
    return str + arrItem;
  },firstItem);
};

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'd');
export const isDateFuture = (date) => (dayjs(date).isAfter(dayjs()));
export const isDatePast = (date) => (dayjs(date).isBefore(dayjs()));

export const matchValidationInteger = (fieldValue, min = null, max = null) => {
  if (!fieldValue) {
    return 'Имя должно содержать хотя бы 1 символ';
  }

  const match = fieldValue.match(/[0-9]*/);

  if (!match) {
    return 'Поле может содержать только числа!';
  }

  const result = match[0] === match['input'] ? fieldValue : false;
  if (!result) {
    return 'Поле может содержать только числа!';
  }

  if (min !== null && result <= min) {
    return `Поле должно быть больше ${min}`;
  }

  if (max !== null && result >= max) {
    return `Поле должно быть меньше ${max}`;
  }

  return false;
};

export const getValuesFromListByKey = (values, key) => {
  const results = [];
  values.forEach((obj) => {
    results.push(obj[key]);
  });
  return results;
};

export const getSumm = (arrValues) => {
  let result = 0;
  arrValues.forEach((value) => {
    result += value;
  });
  return result;
};

export const getValueByList = (obj) => {
  const results = [];
  obj.forEach((objElem) => {
    results.push(objElem);
  });
  return results;
};

export const isOnline = () => window.navigator.onLine;
