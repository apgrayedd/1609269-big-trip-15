import TripPresenter from './presenter/trip.js';
import PointModel from './model/point.js';

import {
  dataAdapter
} from './utils/adapters.js';

import {
  dataPoints
} from './mock/data.js';

const data = dataAdapter(dataPoints);
const pointModel = new PointModel();
pointModel.setPoints(data);

const tripEvents = document.querySelector('.trip-events');
const presenterTrip = new TripPresenter(tripEvents, pointModel);

presenterTrip.init();
