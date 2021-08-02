// import dayjs from 'dayjs';
import {getRandomInt, types} from '../util.js';
export const point = () => {
  const cities = ['Hong Kong', 'Bangkok', 'London', 'Macau', 'Singapore', 'Paris', 'Dubai', 'New York City'];
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
  const offersArr = [
    {
      name: 'Add luggage',
      price: 50,
    },
    {
      name: 'Switch to comforte',
      price: 80,
    },
    {
      name: 'Add meal',
      price: 15,
    },
    {
      name: 'Choose seats',
      price: 5,
    },
    {
      name: 'Travel by train',
      price: 40,
    },
  ];

  const dateStr = `${getRandomInt(2000,2030)}-${getRandomInt(1,12)}-${getRandomInt(1,31)}T${getRandomInt(0,23)}:${getRandomInt(0,59)}`;
  const duration = getRandomInt(1,2000);
  return {
    city: cities[getRandomInt(0, cities.length-1)],
    price: getRandomInt(1,200),
    photo: `http://picsum.photos/248/152?r=${getRandomInt(1,10000)}`,
    description: descriptions[getRandomInt(0,descriptions.length-1)],
    type: types[getRandomInt(0, types.length-1)],
    date: dateStr,
    duration: duration,
    isFavorite: Boolean(getRandomInt(0, cities.length-1)),
    offers: offersArr[getRandomInt(0, cities.length-1)],
  };
};
// export const data = dayjs('2019-01-25').format('DD/MM/YYYY');
