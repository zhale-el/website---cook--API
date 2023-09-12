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

export const /**{Array} */ cardQueries = [
    ["field", "uri"],
    ["field", "label"],
    ["field", "image"],
    ["field", "totalTime"],
  ];

/**
 * Skeleton card
 */
export const /**{String} */ $skeletonCard = `
<div class="card skeleton-card">
<div class="skeleton card-banner"></div>

<div class="card-body">
  <div class="skeleton card-title"></div>
  <div class="skeleton card-text"></div>
</div>
</div>`;
