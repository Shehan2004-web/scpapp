"use strict";

const inputEl = document.querySelector(".search_input");
const searchEl = document.querySelector(".fa-search");
const galleryContainer = document.querySelector(".image_gallery");
const btnLoad = document.querySelector(".btn_load");
const formEl = document.querySelector("form");

const API_KEY = "9in7EwFvA0FGRB7hdJWJz78lXyX4fzUyeGQxbLz98bg";
let keywordSearch = null;
let page = 2;

async function searchImage() {
  keywordSearch = inputEl.value;
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${keywordSearch}&client_id=${API_KEY}&per_page=5`,
  );
  const data = await response.json();
  const result = data.results;

  let htmlEl = "";
  result.forEach((image) => {
    htmlEl += `
      <div>
        <a href="${image.links.html}" target="_blank">
          <img src="${image.urls.small}" alt="${image.alt_description}" />
        </a>
      </div>`;
  });

  if (page === 2) {
    galleryContainer.innerHTML = htmlEl;
  } else {
    galleryContainer.innerHTML += htmlEl;
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 2;
  searchImage();
});

searchEl.addEventListener("click", () => {
  page = 2;
  searchImage();
});

btnLoad.addEventListener("click", () => {
  page++;
  searchImage();
});



