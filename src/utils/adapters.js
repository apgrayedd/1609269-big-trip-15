import dayjs from 'dayjs';

export const timeAdapter = (date, format) => dayjs(date === 'now' ? undefined : date).format(format);
export const timeAdapterDiff = (date1, date2, unit = 'minute') => dayjs(date1).diff(dayjs(date2), unit);

export const dataAdapter = (data) => {
  const dataFormat = data.reduce((obj, current) => Object.assign(obj,current), {});
  return dataFormat;
};
