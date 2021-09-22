import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import NavigationPresenter from './presenter/navigation.js';
import StatsPresenter from './presenter/stats.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter.js';
import Api from './api.js';
import { UpdateType } from './const.js';

const createNewPoint = document.querySelector('.trip-main__event-add-btn');
createNewPoint.disabled = true;

const AUTORIZATION = 'Basic apgrayedd/1609269-big-trip-15';
const LINK = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(LINK, AUTORIZATION);
const pointModel = new PointModel();
const filterModel = new FilterModel();

const tripEvents = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');
const tripControls = document.querySelector('.trip-controls');

const presenterTrip = new TripPresenter(tripEvents, pointModel, filterModel, api);
presenterTrip.init();

const filterPresenter = new FilterPresenter(tripControls, filterModel, pointModel);
const statsPresenter = new StatsPresenter(tripEvents, pointModel);
const navigationPresenter = new NavigationPresenter(tripMain, pointModel, presenterTrip, statsPresenter, filterPresenter);

api.getPoints()
  .then((points) => {
    pointModel.setPoints(UpdateType.INIT, points);
    navigationPresenter.init();
    createNewPoint.disabled = false;
  })
  .catch((err) => {
    throw new Error(err);
  });
