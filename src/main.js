import ListEventsView from './view/list.js';
import NavigationList from './view/navigation-list.js';
import EmptyListView from './view/empty-list.js';
import PointView from './view/point.js';
import EditPointView from './view/edit-point.js';
import FiltersListView from './view/filters-list.js';
import SortListView from './view/sort-list.js';
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

const MAX_NUMBER_POINTS = 3;
const data = () => dataAdapter(pointArr(), destination());
const KEY_TO_CLOSE_POINT = 27;

const renderPoint = (listPoints) => {
  const pointInfo = data();
  const point = new PointView(pointInfo);
  const editPoint = new EditPointView(pointInfo);

  const replacePointToEditByEsc = (evt) => {
    if(evt.keyCode === KEY_TO_CLOSE_POINT) {
      ReplacePointToEdit();
    }
  };

  function ReplacePointToEdit () {
    replace(editPoint, point);
    window.addEventListener('keydown', replacePointToEditByEsc);
  }

  function ReplaceEditToPoint () {
    replace(point, editPoint);
    window.removeEventListener('keydown', replacePointToEditByEsc);
  }

  point.setHandler('click', '.event__rollup-btn', ReplacePointToEdit);
  editPoint.setHandler('click', '.event__rollup-btn', ReplaceEditToPoint);
  render(listPoints, point, RenderPosition.AFTERBEGIN);
};

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

render(tripControls, new NavigationList(), RenderPosition.AFTERBEGIN);
render(listFilters, new FiltersListView(), RenderPosition.AFTERBEGIN);

renderPointList(tripEvents, MAX_NUMBER_POINTS);
