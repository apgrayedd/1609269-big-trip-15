import ListEventsView from './view/list.js';
import NavigationList from './view/navigationList.js';
import EmptyListView from './view/emptyList.js';
// import LoadingView from './view/loading.js';
// import NewPointView from './view/addNewPoint.js';
// import NewPointWithoutDestinationView from './view/addNewPointWithoutDestination.js';
// import NewPointWithoutOffersView from './view/addNewPointWithoutOffers.js';
import PointView from './view/point.js';
import EditPointView from './view/editPoint.js';
import FiltersListView from './view/filtersList.js';
import SortListView from './view/sortList.js';
// import StatsView from './view/stats.js';
import {
  dataAdapter,
  render,
  RenderPosition,
  getRandomInt
} from './util.js';
import {
  pointArr,
  destination
} from './mock/data.js';

const MAX_NUMBER_POINTS = 3;
const data = () => dataAdapter(pointArr(), destination());

const renderPoint = (listPoints) => {
  const pointInfo = data();
  const point = new PointView(pointInfo);
  const editPoint = new EditPointView(pointInfo);

  const replacePointToEditByEsc = (evt) => {
    if(evt.keyCode === 27) {
      // eslint-disable-next-line no-use-before-define
      replaceEditToPoint();
    }
  };

  const replacePointToEdit = () => {
    listPoints.replaceChild(editPoint.getElement(), point.getElement());
    window.addEventListener('keydown', replacePointToEditByEsc);
  };

  const replaceEditToPoint = () => {
    listPoints.replaceChild(point.getElement(), editPoint.getElement());
    window.removeEventListener('keydown', replacePointToEditByEsc);
  };

  const pointSave = () => {};

  point.getElement().querySelector('.event__rollup-btn')
    .addEventListener('click', replacePointToEdit);
  editPoint.getElement().querySelector('.event__rollup-btn')
    .addEventListener('click', replaceEditToPoint);
  editPoint.getElement().querySelector('.event__rollup-btn')
    .addEventListener('submit', pointSave);
  render(listPoints, point.getElement(), RenderPosition.AFTERBEGIN);
};

const renderPointList = (place, maxNumberPoints) => {
  const pointList = ListEventsView.getElement();
  const numberPoints = getRandomInt(0, maxNumberPoints);
  if (!numberPoints) {
    place.append(EmptyListView.getElement());
  } else {
    for (let elem = 0; elem < numberPoints; elem++) {
      renderPoint(pointList);
    }
    place.append(SortListView.getElement());
    place.append(pointList);
  }
};

const tripEvents = document.querySelector('.trip-events');
const tripControls = document.querySelector('.trip-controls__navigation');
const listFilters = document.querySelector('.trip-controls__filters');

render(tripControls, NavigationList.getElement(), RenderPosition.AFTERBEGIN);
render(listFilters, FiltersListView.getElement(), RenderPosition.AFTERBEGIN);
renderPointList(tripEvents, MAX_NUMBER_POINTS);
// render(listPoints, new NewPointView(data()).getElement(), RenderPosition.AFTERBEGIN);
// render(listPoints, new NewPointWithoutDestinationView(data()).getElement(), RenderPosition.AFTERBEGIN);
// render(listPoints, new NewPointWithoutOffersView(data()).getElement(), RenderPosition.AFTERBEGIN);
// render(listPoints, LoadingView.getElement(), RenderPosition.AFTERBEGIN);
// render(listPoints, StatsView.getElement(), RenderPosition.AFTERBEGIN);
