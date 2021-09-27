import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import NavigationPresenter from './presenter/navigation.js';
import StatsPresenter from './presenter/stats.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter.js';
import Api from './api/api.js';
import { UpdateTypes } from './const.js';
import ConstModel from './model/const.js';
import {toast} from './utils/toast.js';
import {isOnline} from './utils/common.js';
import Store from './api/store.js';
import Provider from './api/provider.js';


const buttonNewPointElement = document.querySelector('.trip-main__event-add-btn');
buttonNewPointElement.disabled = true;

const STORE_PREFIX = 'Big-Trip';
const STORE_VER = 'v1';
const STORE_NAME = `${STORE_PREFIX}.${STORE_VER}`;
const AUTHORIZATION = 'Basic apgrayedd/1609270-big-trip-15';
const LINK = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(LINK, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointModel = new PointModel();
const filterModel = new FilterModel();
const constModel = new ConstModel();
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = document.querySelector('.trip-controls');

const tripPresenter = new TripPresenter(tripEventsElement, pointModel, filterModel, apiWithProvider, constModel);
tripPresenter.init();

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointModel);
const statsPresenter = new StatsPresenter(tripEventsElement, pointModel);
const navigationPresenter = new NavigationPresenter(tripMainElement, pointModel, tripPresenter, statsPresenter, filterPresenter);

api.getAllData()
  .then((data) => {
    constModel.setData(data);
    pointModel.setPoints(UpdateTypes.INIT, data.points);
    navigationPresenter.init();
    buttonNewPointElement.disabled = false;
  })
  .catch((err) => {
    throw new Error(err);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
