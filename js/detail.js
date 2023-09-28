"use strict";

/**
 * Import
 */

import { fetchData } from "./api.js";
import { getTime } from "./module.js";

/**
 * Render data
 */

const /**{NodeElement} */ $detailContainer = document.querySelector(
    "[data-detail-container]"
  );

ACCESS_POINT += `/${window.location.search.slice(
  window.location.search.indexOf("=") + 1
)}`;

fetchData(null, (data) => {
  const {
    images: { LARGE, REGULAR, SMALL, THUMBNAI },
    label: title,
    source: author,
    ingredients = [],
    totalTime: cookingTime = 0,
    calories = 0,
    cuisineType = [],
    dietLabels = [],
    dishType = [],
    yield: servings = 0,
    ingredientLines = [],
    uri,
  } = data.recipe;

  document.title = `${title} - Cook.io`;

  const /**{Object} */ banner = LARGE ?? REGULAR ?? SMALL ?? THUMBNAI;
  const { url: bannerUrl, width, height } = banner;
  const /**{Array} */ tags = [...cuisineType, ...dietLabels, ...dishType];

  let /**{String} */ tagElements = "";
  let /**{String} */ ingredientItems = "";

  const /**{String} */ recipeId = uri.slice(uri.lastIndexOf("_") + 1);
  const /**{Undefined || String } */ isSaved = window.localStorage.getItem(
      `cooke-recipe${recipeId}`
    );

  tags.map((tag) => {
    let /**{String} */ type = "";

    if (cuisineType.includes(tag)) {
      type = "cuisineType";
    } else if (dietLabels.includes(tag)) {
      type = "diet";
    } else {
      type = "dishType";
    }

    tagElements += `
    <a href="./recipes.html?${type}=${tag.toLowerCase()}" class="filter-chip label_large has-state"
    >${tag}</a
  >`;
  });

  ingredientLines.map((ingredient) => {
    ingredientItems += ` <li class="ingr-item">
    ${ingredient}
  </li>`;
  });

  $detailContainer.innerHTML = `
  
  <figure class="detail-banner img-holder">
  <img
    src="${bannerUrl}"
    width="${width}"
    height="${height}"
    alt="${title}"
    class="img-cover"
  />
</figure>

<div class="detail-content">
  <div class="title-wrapper">
    <h1 class="display_small">${title ?? "Untitled"}</h1>
    <!------------ Button save and unsaved------------>
    <button class='btn btn-secondary has-state has-icon ${
      isSaved ? "saved" : "removed"
    }' onclick="saveRecipe(this,'${recipeId}')">
      <span
        class="material-symbols-outlined bookmark_add"
        aria-hidden="true"
        >bookmark_add</span
      >

      <span
        class="material-symbols-outlined bookmark"
        aria-hidden="true"
        >bookmark</span
      >

      <span class="label_large save-text">Save</span>
      <span class="label_large unsaved-text">Unsaved</span>
    </button>
  </div>

  <div class="detail-author label_large">
    <span class="span">by</span> ${author}
  </div>
  <div class="detail-stats">
    <div class="stats-item">
      <span class="display_medium">${ingredients.length}</span>

      <span class="label_medium">Ingredients</span>
    </div>

    <div class="stats-item">
      <span class="display_medium">${getTime(cookingTime).time || "<1"}</span>

      <span class="label_medium">${getTime(cookingTime).timeUnit}</span>
    </div>

    <div class="stats-item">
      <span class="display_medium">${Math.floor(calories)}</span>

      <span class="label_medium">Calories</span>
    </div>
  </div>

  ${tagElements ? `<div class="tag-list">${tagElements}</div>` : ""}

  <h2 class="title_medium ingr-title">
    Ingredients

    <span class="label_medium">for ${servings}Servings</span>
  </h2>

 ${
   ingredientItems
     ? ` <ul class="body_large ingr-list">${ingredientItems}</ul>`
     : ""
 }
</div> 
  
  `;
});
