// import dayjs from 'dayjs';
import {getRandomInt} from '../util.js';

export const data = () => {
  const dateStr = `${getRandomInt(2000,2030)}-${getRandomInt(1,12)}-${getRandomInt(1,31)}T${getRandomInt(0,23)}:${getRandomInt(0,59)}`;
  const timeInMin = getRandomInt(1,180);
  return {
    date: dateStr,
    duration: timeInMin,
  };
};
// export const data = dayjs('2019-01-25').format('DD/MM/YYYY');
