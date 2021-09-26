import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import NavigationPresenter from './presenter/navigation.js';
import StatsPresenter from './presenter/stats.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter.js';
import Api from './api.js';
import { UpdateTypes } from './const.js';
import ConstModel from './model/const.js';

const buttonNewPoint = document.querySelector('.trip-main__event-add-btn');
buttonNewPoint.disabled = true;

const AUTHORIZATION = 'Basic apgrayedd/1609270-big-trip-15';
const LINK = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(LINK, AUTHORIZATION);
const pointModel = new PointModel();
const filterModel = new FilterModel();
const constModel = new ConstModel();
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = document.querySelector('.trip-controls');

const tripPresenter = new TripPresenter(tripEventsElement, pointModel, filterModel, api, constModel);
tripPresenter.init();

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointModel);
const statsPresenter = new StatsPresenter(tripEventsElement, pointModel);
const navigationPresenter = new NavigationPresenter(tripMainElement, pointModel, tripPresenter, statsPresenter, filterPresenter);

api.getAllData()
  .then((data) => {
    constModel.setData(data);
    pointModel.setPoints(UpdateTypes.INIT, data.points);
    navigationPresenter.init();
    buttonNewPoint.disabled = false;
  })
  .catch((err) => {
    throw new Error(err);
  });
