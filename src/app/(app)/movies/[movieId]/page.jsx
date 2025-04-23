//show movie data based on the movieId
"use client";
import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../../../../utils/tmdb";
import { useMovieList } from "../../../../context/MovieListContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";

export default function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("movieId", movieId);

  if (!movieId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Movie not found
      </div>
    );
  }
  // Fetch movie data from the API using the movieId
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  // add to favorites
  const { dispatch, isInList } = useMovieList();
  const router = useRouter();
  const isFavorite = isInList(movie?.id);

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_LIST", payload: movie.id });
    } else {
      dispatch({ type: "ADD_TO_LIST", payload: movie });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen py-24">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
        alt={movie?.title}
        className="mt-4 w-full h-auto object-cover"
      />
      <div className="text-center mt-4 p-6 bg-white rounded-lg shadow-lg w-full mx-auto">
        {/* Header with favorite button */}
        <div className="flex items-center justify-between mb-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">{movie?.title}</h1>
          <button
            onClick={handleToggleFavorite}
            className="p-2 rounded-full hover:bg-amber-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? (
              <Favorite fontSize="medium" className="text-red-500" />
            ) : (
              <FavoriteBorder
                fontSize="medium"
                className="text-gray-400 hover:text-red-500"
              />
            )}
          </button>
        </div>

        {/* Movie details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Details column */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {movie?.overview}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-500">Release Date</h3>
                <p className="text-gray-900">{movie?.release_date}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-500">Rating</h3>
                <div className="flex items-center">
                  <span className="text-gray-900">
                    {movie?.vote_average?.toFixed(1)}
                  </span>
                  <span className="ml-1 text-amber-500">★</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-500">Runtime</h3>
                <p className="text-gray-900">
                  {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-500">Genres</h3>
                <p className="text-gray-900">
                  {movie?.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {genre.name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
