import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
import 'flatpickr/dist/flatpickr.css';
import flatpickr from 'flatpickr';

dayjs.extend(durationPlugin);

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @returns {string}
 */

function html(strings, ...values) {
  return strings.reduce((before, after, index) => {

    const value = values[index - 1];

    if (value === undefined) {
      return before + after;
    }

    if (Array.isArray(value)) {
      return before + value.join('') + after;
    }

    return before + value + after;
  });
}

/**
 * @param {dayjs.ConfigType} value
 * @returns {string}
 */
function formatDate(value) {
  return dayjs(value).format('MMM D');
}

/**
 * @param {dayjs.ConfigType} value
 * @returns {string}
 */
function formatTime(value) {
  return dayjs(value).format('HH:mm');
}

/**
 * @param {dayjs.ConfigType} valueFrom
 * @param {dayjs.ConfigType} valueTo
 * @returns {string}
 */
function formatDuration(valueFrom, valueTo) {
  const ms = dayjs(valueTo).diff(valueFrom);
  const duration = dayjs.duration(ms);
  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }
  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
}

/**
 *
 * @param {number} value
 * @returns {string}
 */
function formatNumber(value) {
  return value.toLocaleString('en');
}

/**
 *
 * @param {HTMLInputElement} inputFrom
 * @param {HTMLInputElement} inputTo
 */
function createCalendars(inputFrom, inputTo) {

  /**
 * @type {import('flatpickr/dist/types/options').Options}
 */
  const options = {
    dateFormat: 'Z',
    altInput: true,
    altFormat: 'd/m/y H:i',
    locale: {firstDayOfWeek: 1},
    enableTime: true,
    'time_24hr': true
  };
  const calendarFrom = flatpickr(inputFrom, options);
  const calendarTo = flatpickr(inputTo, options);

  return () => {
    calendarFrom.destroy();
    calendarTo.destroy();
  };
}
// function formatDate(date) {

//   const yearDate = date.toString().split('').slice(0, 10).join('');
//   const reversedDate = yearDate.toString().split('-').reverse().join('/');
//   return reversedDate;

// }

// function formatTime(date) {
//   return date.toString().split('').slice(11, 16).join('');
// }

export {
  html,
  formatDate,
  formatTime,
  formatDuration,
  formatNumber,
  createCalendars
};
