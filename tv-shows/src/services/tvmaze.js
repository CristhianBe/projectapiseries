const API = "https://api.tvmaze.com";

// Busca el ID de una serie a partir de su nombre
export const getShowId = async (name) => {
  const URL = `${API}/singlesearch/shows?q=${encodeURIComponent(name)}`;
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`No se encontró ninguna serie llamada "${name}"`);
  }

  const show = await response.json();
  return show.id;
};

// Datos principales de la serie: { name, rating, image }
export const getShowData = async (id) => {
  const URL = `${API}/shows/${id}`;
  const show = await fetch(URL).then((res) => res.json());

  return {
    name: show.name,
    rating: show.rating.average,
    image: show.image?.medium ?? "",
  };
};

// Episodios agrupados por temporada
export const getEpisodeList = async (id) => {
  const URL = `${API}/shows/${id}/episodes`;
  const episodes = await fetch(URL).then((res) => res.json());

  const episodeList = episodes.map((episode) => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating.average,
  }));

  const episodesBySeason = Object.groupBy(episodeList, (episode) => episode.season);
  return episodesBySeason;
};
