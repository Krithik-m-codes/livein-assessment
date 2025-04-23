"use client";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-gray-500 sm:px-6 lg:px-8">
        No movies available{title ? ` for ${title}` : ""}.
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">
        {title}
      </h2>
      <div className="flex space-x-4 overflow-x-auto w-full py-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
