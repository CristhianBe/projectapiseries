const API = "https://api.tvmaze.com";

export const getShowId = async (name) => {
  const URL = `${API}/singlesearch/shows?q=${encodeURIComponent(name)}`;
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`No se encontró ninguna serie llamada "${name}"`);
  }

  const show = await response.json();
  return show.id;
};


const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

export const getShowData = async (id) => {
  const URL = `${API}/shows/${id}`;
  const response = await fetch(URL);
  if (!response.ok) throw new Error(`No existe ninguna serie con el ID ${id}`);
  const data = await response.json();

  return {
    name: data.name,
    rating: data.rating.average,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE,
  };
};

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
