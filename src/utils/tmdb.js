// TMDB API utility functions
export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Fetch basic movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Fetch complete movie data (details, credits, similar movies)
export const fetchCompleteMovieData = async (movieId) => {
  try {
    const [details, credits, similar] = await Promise.all([
      fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then((res) =>
        res.json()
      ),
      fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
        (res) => res.json()
      ),
      fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`).then(
        (res) => res.json()
      ),
    ]);

    console.log("Movie Details:", details);
    console.log("Movie Credits:", credits);
    console.log("Similar Movies:", similar.results);

    return {
      details,
      credits,
      similar: similar.results,
    };
  } catch (error) {
    console.error("Error fetching complete movie data:", error);
    throw error;
  }
};

// Fetch movies by category
//now_playing
//popular
//top_rated
//upcoming
// Fetch movies by category (e.g., now playing, popular, top rated, upcoming)
export const fetchMoviesByCategory = async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error(`Failed to fetch ${category} movies`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    throw error;
  }
};
