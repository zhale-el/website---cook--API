"use strict";

/**
 * Import
 */

import { fetchData } from "./api.js";
import { $skeletonCard, cardQueries } from "./global.js";
import { getTime } from "./module.js";

/**
 * Accordion
 */
const /**{NodeList} */ $accordions =
    document.querySelectorAll("[data-accordion]");

/**
 *
 * @param {NodeList} $element
 */

const initAccordion = function ($element) {
  const /**{NodeElement} */ $button = $element.querySelector(
      "[data-accordion-btn]"
    );

  let isExpanded = false;

  $button.addEventListener("click", function () {
    isExpanded = isExpanded ? false : true;
    this.setAttribute("aria-expanded", isExpanded);
  });
};

for (const $accordion of $accordions) initAccordion($accordion);

/**
 * Filter bar toggle for mobile
 */

const /**{NodeElement} */ $filterBar =
    document.querySelector("[data-filter-bar]");

const /**{NodeList} */ $filterTogglers = document.querySelectorAll(
    "[data-filter-toggler]"
  );
const /**{NodeElement} */ $overlay = document.querySelector("[data-overlay]");

addEventOnElements($filterTogglers, "click", function () {
  $filterBar.classList.toggle("active");
  $overlay.classList.toggle("active");

  const bodyOverflow = document.body.style.overflow;

  document.body.overflow = bodyOverflow === "hidden" ? "visible" : "hidden";
});

/**
 * Filter submit and clear
 */
const /**{NodeElement} */ $filterSubmit = document.querySelector(
    "[data-filter-submit]"
  );
const /**{NodeElement} */ $filterClear = document.querySelector(
    "[ data-filter-clear]"
  );
const /**{NodeElement} */ $filterSearch = $filterBar.querySelector(
    'input[type="search"]'
  );

$filterSubmit.addEventListener("click", function () {
  const /**{NodeList} */ $filterCheckboxes =
      $filterBar.querySelectorAll("input:checked");

  const /**{Array} */ queries = [];

  if ($filterSearch.value) queries.push(["q", $filterSearch.value]);

  if ($filterCheckboxes.length) {
    for (const $checkbox of $filterCheckboxes) {
      const /**{Strimg} */ key =
          $checkbox.parentElement.parentElement.dataset.filter;
      queries.push([key, $checkbox.value]);
    }
  }
  window.location = queries.length
    ? `?${queries.join("&").replace(/,/g, "=")}`
    : "/recipes.html";
});

$filterSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") $filterSubmit.click();
});

$filterClear.addEventListener("click", function () {
  const /**{NodeList} */ $filterCheckboxes =
      $filterBar.querySelectorAll("input:checked");

  $filterCheckboxes?.forEach((elem) => (elem.checked = false));
  $filterSearch.value &&= "";
});

const /**{String} */ queryStr = window.location.search.slice(1);
const /**{Array} */ queries =
    queryStr && queryStr.split("&").map((i) => i.split("="));

const /**{NodeElement} */ $filterCount = document.querySelector(
    "[data-filter-count]"
  );

if (queries.length) {
  $filterCount.style.display = "block";
  $filterCount.innerHTML = queries.length;
} else {
  $filterCount.style.display = "none";
}
queryStr &&
  queryStr.split("&").mapz((i) => {
    if (i.split("=")[0] === "q") {
      $filterBar.querySelector("input[type='search']").value = i
        .split("=")[1]
        .replace(/%20/g, " ");
    } else {
      $filterBar.querySelector(
        `[value=${i.split("=")[1].replace(/%20/g, " ")}]`
      ).checked = true;
    }
  });
