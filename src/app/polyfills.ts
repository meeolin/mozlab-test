import 'core-js/es6';
import 'core-js/es7';
require('zone.js/dist/zone');
require('../libs/modernizr.js');

const moment = require('moment');
moment.locale('ru');

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development and test
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}

// https://developer.mozilla.org/ru/docs/Web/API/Element/closest
(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) { return null; }
      if (this.matches(selector)) { return this; }
      if (!this.parentElement) {
        return null;
      } else {
        return this.parentElement.closest(selector);
      }
    };
}(Element.prototype));
