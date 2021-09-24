import dayjs from 'dayjs';
import isEmpty from 'lodash.isempty';
import { getOfferItemTemplate } from './render';

const MAX_MINUTES_DAY = 1440;
const MAX_MINUTES_HOUR = 60;

export const getRandomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

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

export const compareLists = (objMain, obj) => {
  const mainValues = Object.values(objMain);
  const values = Object.values(obj);
  return mainValues.filter((elem) => values.indexOf(elem) !== 0);
};

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
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
export const dateValidation = (dateA, dateB) => {
  if (dayjs(dateA).diff(dayjs(dateB)) < 0) {
    return 'Дата конца не может превышать дату начала!';
  }
};

export const getValuesFromListByKey = (array, key) => {
  const rezults = [];
  array.forEach((obj) => {
    rezults.push(obj[key]);
  });
  return rezults;
};

export const getValueByList = (obj) => {
  const rezults = [];
  obj.forEach((objElem) => {
    rezults.push(objElem);
  });
  return rezults;
};
