"use strict";

//    < ------------------------------ start change theme -------------------->

const /**{NodeElement} */ $HTML = document.documentElement;

const /**{Boolean} */ isDark = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;

// sessionStorage getItem
if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  // first time
  $HTML.dataset.theme = isDark ? "dark" : "Light";
}

/**
 * ChangeTheme function
 */
const changeTheme = function () {
  isPressed = isPressed ? false : true;
  this.setAttribute("aria-pressed", isPressed);

  setDataThemeAttbr();
  saveDataThemeInStorage();
};

/**
 * Set data theme attribute
 *
 */
let /**{Boolean} */ isPressed = false;

const setDataThemeAttbr = function () {
  $HTML.setAttribute(
    "data-theme",
    $HTML.dataset.theme === "Light" ? "dark" : "Light"
  );
};

/**
 * Save data theme in  session storage
 *
 */
const saveDataThemeInStorage = function () {
  sessionStorage.setItem("theme", $HTML.dataset.theme);
};

window.addEventListener("load", function () {
  const /*{NodeElement}* */ themeBtn =
      document.querySelector("[data-theme-btn]");

  themeBtn.addEventListener("click", changeTheme);
});

//    < ------------------------------ End change theme -------------------->
