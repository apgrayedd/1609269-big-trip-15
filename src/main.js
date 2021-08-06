import ListEventsView from './view/list.js';
import EmptyListView from './view/emptyList.js';
import LoadingView from './view/loading.js';
import NewPointView from './view/addNewPoint.js';
import NewPointWithoutDestinationView from './view/addNewPointWithoutDestination.js';
import NewPointWithoutOffersView from './view/addNewPointWithoutOffers.js';
import PointView from './view/point.js';
import EditPointView from './view/editPoint.js';
import FiltersListView from './view/filtersList.js';
import SortListView from './view/sortList.js';
import StatsView from './view/stats.js';
import {dataAdapter} from './util.js';
import {
  pointArr,
  destination
} from './mock/data.js';

const MAX_NUMBER_POINTS = 3;

const data = () => dataAdapter(pointArr(), destination());
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteHeader = document.querySelector('.page-header');
const listPoints = document.querySelector('.trip-events');

const renderPoints = () => {
  for (let points = 0; points < MAX_NUMBER_POINTS; points++) {
    render(listPoints, new PointView(data()).getElement(), 'beforeend');
  }
};

const renderListPoints = () => {
  render(siteHeader, ListEventsView.getElement(), 'beforeend');
};
render(siteHeader, ListEventsView.getElement(), 'beforeend');
render(listPoints, new EditPointView(data()).getElement(), 'beforeend');
for (let points = 0; points < 3; points++) {
  render(listPoints, new PointView(data()).getElement(), 'beforeend');
}
render(listPoints, new NewPointView(data()).getElement(), 'beforeend');
render(listPoints, new NewPointWithoutDestinationView(data()).getElement(), 'beforeend');
render(listPoints, new NewPointWithoutOffersView(data()).getElement(), 'beforeend');
render(listPoints, new EmptyListView(data()).getElement(), 'beforeend');

const listFilters = document.querySelector('.trip-controls__filters');
render(listFilters, FiltersListView.getElement(), 'beforeend');

render(listPoints, SortListView.getElement(), 'beforebegin');
render(listPoints, LoadingView.getElement(), 'beforeend');
render(listPoints, StatsView.getElement(), 'beforeend');

