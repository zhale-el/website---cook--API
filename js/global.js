"use strict";

/**
 * Add event on multiple elements
 * @param {NodeList} $elements Nodelist
 * @param {String} eventType Event type string
 * @param {Function} callback  Callback function
 */

window.addEventOnElements = ($elements, eventType, callback) => {
  for (const $element of $elements) {
    $element.addEventListener(eventType, callback);
  }
};
