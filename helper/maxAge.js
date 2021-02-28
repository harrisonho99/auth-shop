module.exports = function ({ day = 0, hour = 0, min = 0, sec = 0 }) {
  const milisec = 1000;
  sec = sec ? sec * milisec : 0;
  min = min ? min * 60 * milisec : 0;
  hour = hour ? hour * 60 * 60 * milisec : 0;
  day = day ? day * 24 * 60 * 60 * milisec : 0;
  res = day + hour + min + sec;
  return res;
};
