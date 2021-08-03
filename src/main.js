import {list} from './view/list.js';
import {emptyList} from './view/emptyList.js';
import {loading} from './view/loading.js';
import {addNewPoint} from './view/addNewPoint.js';
import {addNewPointWithoutDestination} from './view/addNewPointWithoutDestination.js';
import {addNewPointWithoutOffers} from './view/addNewPointWithoutOffers.js';
import {point} from './view/point.js';
import {editPoint} from './view/editPoint.js';
import {filtersList} from './view/filtersList.js';
import {sortList} from './view/sortList.js';
import {stats} from './view/stats.js';
import {pointArr, destination} from './model/data.js';

console.log(pointArr())
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector('main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');

render(siteHeaderElement, list(), 'beforeend');
const listPoints = siteHeaderElement.querySelector('.trip-events__list');
const listFilters = document.querySelector('.trip-controls__filters');
render(listFilters, filtersList(), 'beforeend');
render(listPoints, sortList(), 'beforebegin');

render(listPoints, editPoint(pointArr(), destination()), 'beforeend');
for (let points = 0; points < 3; points++) {
  render(listPoints, point(pointArr()), 'beforeend');
}
render(listPoints, addNewPoint(), 'beforeend');
render(listPoints, addNewPointWithoutDestination(), 'beforeend');
render(listPoints, addNewPointWithoutOffers(), 'beforeend');
render(listPoints, emptyList(), 'beforeend');
render(listPoints, loading(), 'beforeend');
render(listPoints, stats(), 'beforeend');
