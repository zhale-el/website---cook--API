"use strict";

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
