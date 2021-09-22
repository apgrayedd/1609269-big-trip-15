import { SortTypes } from '../const';
import {timeAdapter} from '../utils/adapters';
import {
  getArrayValuesFromObjByKey,
  getArrayByObj
} from '../utils/common';
import AbstractView from './abstract';

const getTripInfo  = (data) => {
  data = data.sort(SortTypes.TIME_DOWN.funct);
  const getTripeInfo = data.length <= 3
    ? getArrayByObj(data)
    : [data[0], data[data.length - 1]];
  const getTripeInfoTitle = getTripeInfo.length <= 3
    ? getArrayValuesFromObjByKey(getTripeInfo, 'name').join('&nbsp;—&nbsp;')
    : getArrayValuesFromObjByKey(getTripeInfo, 'name').join('&nbsp;—&nbsp;...&nbsp;—&nbsp;');
  const getTripeInfoDays = [
    timeAdapter(getTripeInfo[0].dateFrom, 'MMM D'),
    timeAdapter(getTripeInfo[getTripeInfo.length - 1].dateFrom, 'MMM D'),
  ].join('&nbsp;—&nbsp;');
  const getCostValue = getArrayValuesFromObjByKey(data, 'basePrice')
    .reduce((value, summ) => summ += value);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title"></h1>
    <h1 class="trip-info__title">${getTripeInfoTitle}</h1>
    <p class="trip-info__dates">${getTripeInfoDays}</p>
  </div>
    <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${getCostValue}</span>
  </p>
</section>`;
};

export default class TripInfo extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getTripInfo(this._data);
  }
}
