import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter.js';

import {
  dataAdapter
} from './utils/adapters.js';

import {
  dataPoints
} from './mock/data.js';

const data = dataAdapter(dataPoints);
const pointModel = new PointModel();
const filterModel = new FilterModel();
pointModel.setPoints(data);

const tripEvents = document.querySelector('.trip-events');
const tripControls = document.querySelector('.trip-controls');
const presenterTrip = new TripPresenter(tripEvents, pointModel, filterModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointModel);

presenterTrip.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  presenterTrip.createPoint();
});
