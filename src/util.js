function getRandomInt (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function getTimeFromMins(mins) {
  const days = mins/1440 >= 1 ? Math.trunc(mins/1440) : 0;
  const hours = (mins - days*1440)/60 >= 1 ? Math.trunc((mins - days*1440)/60) : 0;
  const minutes = (mins - days*1440 - hours*60) >= 1 ? Math.ceil(mins - days*1440 - hours*60) : 0;
  let str = days ? `${days}D ` : '';
  str += hours || days ? `${hours}H ` : '';
  str += `${minutes}M`;
  return str;
}

const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export {
  getRandomInt,
  getTimeFromMins,
  types
};
