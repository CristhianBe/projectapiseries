import { getShowId, getShowData, getEpisodeList } from "./services/tvmaze.js";

const $form = document.querySelector(".search");
const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

// Cada episodio
const createEpisodeHTML = (episode) => {
  const rating = Math.round(episode.rating ?? 0);
  const label = episode.rating ?? "sin valoración";

  return `<div class="episode episode-${episode.number} rating-${rating}"
               title="T${episode.season}E${episode.number} · ${label}">${episode.number}</div>`;
};

// Cada temporada (data = array de episodios, number = temporada)
const createSeasonHTML = (data, number) => `
  <article class="season">
    <header class="season-header">T${number}</header>
    ${data.map(createEpisodeHTML).join("")}
  </article>`;

// Datos de la serie
const createHeaderHTML = (show) => `
  <img class="poster" src="${show.image}" alt="Póster de ${show.name}">
  <h1>${show.name}</h1>
  <p class="show-rating">⭐ ${show.rating ?? "Sin valoración"}</p>`;

const renderShow = async (name) => {
  $header.setHTMLUnsafe("<p>Cargando...</p>");
  $episodes.setHTMLUnsafe("");

  try {
    const ID = /^\d+$/.test(name) ? name : await getShowId(name);
    const show = await getShowData(ID);
    const seasons = await getEpisodeList(ID);

    $header.setHTMLUnsafe(createHeaderHTML(show));

    // Recorre cada temporada y llama a createSeasonHTML
    const list = Object.entries(seasons).map(([number, season]) => createSeasonHTML(season, number));
    $episodes.setHTMLUnsafe(list.join(""));
  } catch (error) {
    $header.setHTMLUnsafe(`<p class="error">${error.message}</p>`);
  }
};

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = new FormData($form).get("show").trim();
  if (name) renderShow(name);
});

renderShow($form.show.value);
