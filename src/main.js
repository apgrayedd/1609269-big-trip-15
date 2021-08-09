import ListEventsView from './view/list.js';
import NavigationList from './view/navigationList.js';
import EmptyListView from './view/emptyList.js';
import PointView from './view/point.js';
import EditPointView from './view/editPoint.js';
import FiltersListView from './view/filtersList.js';
import SortListView from './view/sortList.js';
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
const KEY_TO_CLOSE_POINT = 27;

const renderPoint = (listPoints) => {
  const pointInfo = data();
  const point = new PointView(pointInfo);
  const editPoint = new EditPointView(pointInfo);

  function ReplacePointToEditByEsc (evt) {
    if(evt.keyCode === KEY_TO_CLOSE_POINT) {
      // eslint-disable-next-line no-use-before-define
      replaceEditToPoint();
    }
  }

  const replacePointToEdit = () => {
    listPoints.replaceChild(editPoint.getElement(), point.getElement());
    window.addEventListener('keydown', ReplacePointToEditByEsc);
  };

  const replaceEditToPoint = () => {
    listPoints.replaceChild(point.getElement(), editPoint.getElement());
    window.removeEventListener('keydown', ReplacePointToEditByEsc);
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
  const pointList = new ListEventsView();
  const numberPoints = getRandomInt(0, maxNumberPoints);

  if (!numberPoints) {
    place.append(new EmptyListView().getElement());
  } else {
    for (let elem = 0; elem < numberPoints; elem++) {
      renderPoint(pointList.getElement());
    }
    place.append(new SortListView().getElement());
    place.append(pointList.getElement());
  }
};

const tripEvents = document.querySelector('.trip-events');
const tripControls = document.querySelector('.trip-controls__navigation');
const listFilters = document.querySelector('.trip-controls__filters');

render(tripControls, new NavigationList().getElement(), RenderPosition.AFTERBEGIN);
render(listFilters, new FiltersListView().getElement(), RenderPosition.AFTERBEGIN);
renderPointList(tripEvents, MAX_NUMBER_POINTS);
