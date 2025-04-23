//show movie data based on the movieId
import { getMovieDetails } from "../../../../utils/tmdb";

export default async function MoviePage({ params }) {
  const { movieId } = await params;
  if (!movieId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Movie not found
      </div>
    );
  }
  // Fetch movie data from the API using the movieId
  const movie = await getMovieDetails(movieId);

  return (
    <div className="flex flex-col items-center justify-center h-screen py-24">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mt-4"
      />
      <div className="text-center mt-4 p-4 bg-white rounded shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mt-4">{movie.title}</h1>
        <p className="text-lg mt-2">{movie.overview}</p>
        <p className="text-lg mt-2">Release Date: {movie.release_date}</p>
        <p className="text-lg mt-2">Rating: {movie.vote_average}</p>
        <p className="text-lg mt-2">Runtime: {movie.runtime} minutes</p>
        <p className="text-lg mt-2">
          Genres: {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
