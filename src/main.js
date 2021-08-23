import ListEventsView from './view/list.js';
import NavigationList from './view/navigation-list.js';
import EmptyListView from './view/empty-list.js';
import PointView from './view/point.js';
import EditPointView from './view/edit-point.js';
import FiltersListView from './view/filters-list.js';
import SortListView from './view/sort-list.js';
import TripPresenter from './presenter/trip.js';

import {
  render,
  RenderPosition,
  replace
} from './utils/render.js';
import {
  dataAdapter
} from './utils/adapters.js';
import {
  getRandomInt
} from './utils/common.js';
import {
  pointArr,
  destination
} from './mock/data.js';

// const data = dataAdapter(pointArr, destination());
const data = dataAdapter(pointArr);
const renderPointList = (place, maxNumberPoints) => {
  const pointList = new ListEventsView();
  const numberPoints = getRandomInt(0, maxNumberPoints);

  if (!numberPoints) {
    render(place, new EmptyListView(), RenderPosition.AFTERBEGIN);
  } else {
    for (let elem = 0; elem < numberPoints; elem++) {
      renderPoint(pointList.getElement());
    }
    render(place, new SortListView(), RenderPosition.AFTERBEGIN);
    render(place, pointList, RenderPosition.AFTERBEGIN);
  }
};

const tripEvents = document.querySelector('.trip-events');
const tripControls = document.querySelector('.trip-controls__navigation');
const listFilters = document.querySelector('.trip-controls__filters');

const presenterTrip = new TripPresenter(tripEvents);
presenterTrip.init(data);
// render(tripControls, new NavigationList(), RenderPosition.AFTERBEGIN);
// render(listFilters, new FiltersListView(), RenderPosition.AFTERBEGIN);

// renderPointList(tripEvents, MAX_NUMBER_POINTS);
