import dayjs from 'dayjs';
import {types} from '../const.js';
import {getRandomInt} from '../util.js';

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'];
const cities = ['Hong Kong', 'Bangkok', 'London', 'Macau', 'Singapore', 'Paris', 'Dubai', 'New York City'];
const MIN_NUMBER_OFFERS = 0;
const MAX_NUMBER_OFFERS = 10;
const MAX_NUMBER_ID = 2000;
const MAX_NUMBER_BASE_PRICE = 2000;
const MAX_NUMBER_OFFER_PRICE = 200;
const MIN_NUMBER_DESCRIPTION = 0;
const MAX_NUMBER_DESCRIPTION = 5;
const MAX_POINT_TIME_DIFFERENCE_IN_MINUTES = 1000;

const destination = () => {
  const description = new Array(getRandomInt(MIN_NUMBER_DESCRIPTION,MAX_NUMBER_DESCRIPTION))
    .fill().map(() => descriptions[getRandomInt(0,descriptions.length-1)]);
  return {
    description,
    name: cities[getRandomInt(0, cities.length-1)],
    pictures: [
      {
        src:  `http://picsum.photos/248/152?r=${getRandomInt(1,10000)}`,
        description,
      },
    ],
  };};

const pointArr = () => {
  const dateStart = `${getRandomInt(2000,2030)}-${getRandomInt(1,12)}-${getRandomInt(1,31)}T${getRandomInt(0,23)}:${getRandomInt(0,59)}:${getRandomInt(0,59)}`;
  const offers = new Array(getRandomInt(MIN_NUMBER_OFFERS,MAX_NUMBER_OFFERS))
    .fill().map(() => ({title: 'Choose meal',price: getRandomInt(1,MAX_NUMBER_OFFER_PRICE)}));
  return {
    basePrice: getRandomInt(1,MAX_NUMBER_BASE_PRICE),
    dateFrom: dayjs(dateStart).format('YYYY-MM-DDTHH:mm:ss'),
    dateTo: dayjs(dateStart).add(getRandomInt(1,MAX_POINT_TIME_DIFFERENCE_IN_MINUTES), 'minutes')
      .format('YYYY-MM-DDTHH:mm:ss'),
    destination: destination().name,
    id: getRandomInt(1,MAX_NUMBER_ID),
    isFavorite: Boolean(getRandomInt(0,1)),
    offers,
    type: types[getRandomInt(0, types.length-1)],
  };};

export {destination, pointArr};
// export const data = dayjs('2019-01-25').format('DD/MM/YYYY');
