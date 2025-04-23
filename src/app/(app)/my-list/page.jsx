"use client";
import React from "react";
import { useMovieList } from "../../../context/MovieListContext";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MyList() {
  const { myList, dispatch } = useMovieList();

  const handleRemove = (event, movieId) => {
    event.stopPropagation();
    dispatch({ type: "REMOVE_FROM_LIST", payload: movieId });
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">
        My Movie List
      </Typography>
      {myList.length === 0 ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <Typography variant="h6" className="text-gray-500">
            Your list is empty. Add some movies to your list!
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          {myList.map((movie) => (
            <div className="max-w-[50%]" key={movie.id}>
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
                    onClick={(e) => handleRemove(e, movie.id)} // Pass movie.id directly
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
