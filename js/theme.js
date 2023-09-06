"use strict";

/**{NodeElement} */
const $HTML = document.documentElement;

/**{Boolean} */
const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

/** sessionStorage getItem */
if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  /* first time* */
  $HTML.dataset.theme = isDark ? "dark" : "Light";
}

/**{Boolean} */
let isPressed = false;

/*changeTheme function* */
const changeTheme = function () {
  isPressed = isPressed ? false : true;
  this.setAttribute("aria-pressed", isPressed);

  $HTML.setAttribute(
    "data-theme",
    $HTML.dataset.theme === "Light" ? "dark" : "Light"
  );

  //sessionStorage setItem
  sessionStorage.setItem("theme", $HTML.dataset.theme);
};

window.addEventListener("load", function () {
  /*{NodeElement}* */
  const themeBtn = document.querySelector("[data-theme-btn]");

  themeBtn.addEventListener("click", changeTheme);
});
