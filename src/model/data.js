import dayjs from 'dayjs';
import {getRandomInt, types} from '../util.js';

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
const dateStart = `${getRandomInt(2000,2030)}-${getRandomInt(1,12)}-${getRandomInt(1,31)}T${getRandomInt(0,23)}:${getRandomInt(0,59)}:${getRandomInt(0,59)}`;
const description = descriptions[getRandomInt(0,descriptions.length-1)];
const destination = () =>
  ({
    description: description,
    name: cities[getRandomInt(0, cities.length-1)],
    pictures: [
      {
        src:  `http://picsum.photos/248/152?r=${getRandomInt(1,10000)}`,
        description: description,
      },
    ],
  });

const dateFrom = dayjs(dateStart).format('YYYY-MM-DDTHH:mm:ss');
const dateTo = dayjs(dateStart).add(getRandomInt(1,2000)).format('YYYY-MM-DDTHH:mm:ss');

const pointArr = () =>
  ({
    basePrice: getRandomInt(1,1000),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: destination().name,
    id: getRandomInt(1,2000),
    isFavorite: Boolean(getRandomInt(0,1)),
    offers: [
      {
        title: 'Choose meal',
        price: 180,
      }, {
        title: 'Upgrade to comfort class',
        price: 50,
      },
    ],
    type: types[getRandomInt(0, types.length-1)],
  });

export {destination, pointArr};
// export const data = dayjs('2019-01-25').format('DD/MM/YYYY');
