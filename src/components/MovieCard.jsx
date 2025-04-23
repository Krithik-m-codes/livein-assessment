"use client";
import { useMovieList } from "../context/MovieListContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function MovieCard({ movie }) {
  const { dispatch, isInList } = useMovieList();
  const router = useRouter();
  const isFavorite = isInList(movie.id);

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_LIST", payload: movie.id });
    } else {
      dispatch({ type: "ADD_TO_LIST", payload: movie });
    }
  };

  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div
      className="flex-shrink-0 w-40 rounded-lg shadow overflow-hidden flex flex-col"
      onClick={handleClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto object-cover flex-grow"
        loading="lazy"
      />

      <div className="p-2 text-gray-900">
        <h3 className="text-sm font-semibold truncate" title={movie.title}>
          {movie.title}
        </h3>

        <div className="flex justify-between items-center mt-1">
          {movie.vote_average > 0 && (
            <p className="text-xs text-gray-300">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          )}
          <button
            onClick={handleToggleFavorite}
            className="p-1"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? (
              <Favorite fontSize="small" className="text-red-500" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
