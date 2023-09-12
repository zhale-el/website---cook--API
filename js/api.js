"use strict";

window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const /**{String} */ APP_ID = "32bf5af0";
const /**{String} */ APP_KEY = "5ea90bfe8a20a5ecdd7467f7fb0b7e5b";
const /**{String} */ TYPE = "public";

//-----------------------------------
//-----------------------------------

/**
 * @param {Array} queries Query array
 * @param {Function} successCallback Success callback function
 */

export const fetchData = async function (queries, successCallback) {
  const /**{String} */ query = queries
      ?.join("&")
      .replace(/,/g, "=")
      .replace(/ /g, "%20")
      .replace(/\+/g, "%2B");

  const /**{String} */ url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${APP_KEY}&type=${TYPE}${
      query ? `&${query}` : ""
    }`;
  console.log(url);

  const /**{object} */ response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }
};
