"use client";
import React from "react";
import { useMovieList, dispatch } from "../../../context/MovieListContext";
import { Typography } from "@mui/material";
export default function MyList() {
  const { myList } = useMovieList();

  const handleRemove = (event) => {
    // Logic to remove the movie from the list
    event.stopPropagation();
    const movieId = event.currentTarget.dataset.id;
    const isFavorite = myList.some((movie) => movie.id === movieId);
    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_LIST", payload: movieId });
    } else {
      dispatch({ type: "ADD_TO_LIST", payload: { id: movieId } });
    }
  };

  return (
    <div className="p-4">
      <h1>My Movie List</h1>
      {myList.length === 0 ? (
        <p>Your list is empty. Add some movies!</p>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          {myList.map((movie) => (
            <div className="max-w-2xs" key={movie.id}>
              <div className="flex-shrink-0 w-full h-24 rounded-lg shadow overflow-hidden flex flex-row gap-2">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-40 h-auto object-cover flex-grow"
                />
                <div>
                  <Typography variant="h6">{movie.title}</Typography>

                  <Typography variant="body2">
                    ⭐{movie.vote_average.toFixed(1)}
                  </Typography>
                </div>
                <div className="flex-grow flex items-center justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    onclick={handleRemove}
                    data-id={movie.id}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
