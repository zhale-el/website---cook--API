"use strict";

/**
 *
 * Import
 */
import { fetchData } from "./api.js";
import { $skeletonCard, cardQueries } from "./global.js";
import { getTime } from "./module.js";

/**
 *  Home page search
 */
const /**{NodeElement} */ $searchField = document.querySelector(
    "[data-search-field]"
  );
const /**{NodeElement} */ $searchBtn =
    document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", function () {
  if ($searchField.value)
    window.location = `/recipes.html?q=${$searchField.value}`;
});

/**
 * Search submit when press "Enter" key
 */
$searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") $searchBtn.click();
});

/**
 * Tab panel navigation
 */
const /**{NodeList} */ $tabBtns = document.querySelectorAll("[data-tab-btn]");
const /**{NodeList} */ $tabPanels =
    document.querySelectorAll("[data-tab-panel]");

let /**{NodeElement} */ [$lastActiveBtn] = $tabBtns;
let /**{NodeElement} */ [$lastActivePanel] = $tabPanels;

addEventOnElements($tabBtns, "click", function () {
  $lastActivePanel.setAttribute("hidden", "");
  $lastActiveBtn.setAttribute("aria-selected", false);
  $lastActiveBtn.setAttribute("tabindex", -1);

  const /**{NodeElemnt} */ $currentTabPanel = document.querySelector(
      `#${this.getAttribute("aria-controls")}`
    );

  $currentTabPanel.removeAttribute("hidden");
  this.setAttribute("aria-selected", true);
  this.setAttribute("tabindex", 0);

  $lastActivePanel = $currentTabPanel;
  $lastActiveBtn = this;

  addTabContent(this, $currentTabPanel);
});

/**
 * Navigate Tab with arrow key
 */
addEventOnElements($tabBtns, "keydown", function (event) {
  const /**{NodeElement} */ $nextElement = this.nextElementSibling;
  const /**{NodeElement} */ $previousElemnt = this.previousElementSibling;

  if (event.key === "ArrowRight" && $nextElement) {
    this.setAttribute("tabindex", -1);
    $nextElement.setAttribute("tabindex", 0);
    $nextElement.focus();
  } else if (event.key === "ArrowLeft" && $previousElemnt) {
    this.setAttribute("tabindex", -1);
    $previousElemnt.setAttribute("tabindex", 0);
    $previousElemnt.focus();
  } else if (event.key === "Tab") {
    this.setAttribute("tabindex", -1);
    $lastActiveBtn.setAttribute("tabindex", 0);
  }
});

/**
 * Work With Api
 * fetch data for tab content
 */

const addTabContent = ($currentTabBtn, $currentTabPanel) => {
  const /**{NodeElement} */ $gridList = document.createElement("div");
  $gridList.classList.add("grid-list");
  $currentTabPanel.innerHTML = `
  <div class="grid-list">
  ${$skeletonCard.repeat(12)}
  </div>
  `;

  fetchData(
    [
      ["mealType", $currentTabBtn.textContent.trim().toLowerCase()],
      ...cardQueries,
    ],
    function (data) {
      $currentTabPanel.innerHTML = "";
      for (let i = 0; i < 12; i++) {
        const {
          recipe: { image, label: title, totalTime: cookingTime, uri },
        } = data.hits[i];

        const /**{NodeElement} */ $card = document.createElement("div");
        $card.classList.add("card");
        $card.style.animationDelay = `${100 * i}ms`;

        $card.innerHTML = `
        <figure class="card-media img-holder">
        <img
          src="${image}"
          alt="${title}"
          width="195"
          height="195"
          class="img-cover"
          loading="lazy"
        />
      </figure>

      <div class="card-body">
        <h3 class="title_small">
          <a href="./detail.html" class="card-link"
            >${title ?? "Untitled"}</a
          >
        </h3>
        <div class="meta-wrapper">
          <div class="meta-item">
            <span class="material-symbols-outlined" aria-hidden="true"
              >schedule</span
            >

            <span class="label_medium">${getTime(cookingTime).time || "<1"}${
          getTime(cookingTime).timeUnit
        }</span>
          </div>

          <button
            class="icon-btn has-state removed"
            aria-label="Add to saved recipes"
          >
            <span
              class="material-symbols-outlined bookmark-add"
              aria-hidden="true"
              >bookmark_add</span
            >
            <span
              class="material-symbols-outlined bookmark"
              aria-hidden="true"
              >bookmark</span
            >
          </button>
        </div>
      </div>
        `;
        $gridList.appendChild($card);
      }
      $currentTabPanel.appendChild($gridList);

      $currentTabPanel.innerHTML += `
      <a
      href="./recipes.html?mealType=${$currentTabBtn.textContent
        .trim()
        .toLowerCase()}"
      class="btn btn-secondary label_large has-state"
      >Show more</a
    >
      `;
    }
  );
};

addTabContent($lastActiveBtn, $lastActivePanel);
