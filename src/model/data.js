import dayjs from 'dayjs';
import {getRandomInt} from '../util.js';

export const data = () => {
  const dateStr = `${getRandomInt(2000,2030)}-${getRandomInt(1,12)}-${getRandomInt(1,31)}`;
  return {
    date: dateStr,
  };
};
// export const data = dayjs('2019-01-25').format('DD/MM/YYYY');
