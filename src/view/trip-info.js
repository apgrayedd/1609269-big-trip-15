import { SortType } from '../const';
import {timeAdapter} from '../utils/adapters';
import {getObjValuesFromArrayByKey} from '../utils/common';
import AbstractView from './abstract';

const getTripInfo  = (data) => {
  data = data.sort(SortType.TIME_DOWN.funct);
  const getTriptInfo = data.length <= 3
    ? data.reduce((point, arr = []) => {
      arr.append(point);
    })
    : [data[0], data[data.length - 1]];

  const getTriptInfoTitle = getTriptInfo <= 3
    ? getObjValuesFromArrayByKey(getTriptInfo, 'name').join('&nbsp;—&nbsp;')
    : getObjValuesFromArrayByKey(getTriptInfo, 'name').join('&nbsp;—&nbsp;...&nbsp;—&nbsp;');
  const getTriptInfoDays = [
    timeAdapter(getTriptInfo[0].dateFrom, 'MMM D'),
    timeAdapter(getTriptInfo[getTriptInfo.length - 1].dateFrom, 'MMM D'),
  ].join('&nbsp;—&nbsp;');
  const getCostValue = getObjValuesFromArrayByKey(data, 'basePrice')
    .reduce((value, summ) => summ += value);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title"></h1>
    <h1 class="trip-info__title">${getTriptInfoTitle}</h1>
    <p class="trip-info__dates">${getTriptInfoDays}</p>
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
