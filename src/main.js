import FiltersListView from './view/filters-list.js';
import TripPresenter from './presenter/trip.js';

import {
  dataAdapter
} from './utils/adapters.js';

import {
  dataPoints
} from './mock/data.js';

// const data = dataAdapter(pointArr, destination());
const data = dataAdapter(dataPoints);

const tripEvents = document.querySelector('.trip-events');
const tripControls = document.querySelector('.trip-controls__navigation');
const listFilters = document.querySelector('.trip-controls__filters');

const presenterTrip = new TripPresenter(tripEvents);
presenterTrip.init(data);
