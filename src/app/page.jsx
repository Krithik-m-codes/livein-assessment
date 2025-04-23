"use client";
import { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../utils/tmdb";
import MovieSection from "../components/MovieSection";

export default function Home() {
  const [categories, setCategories] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
          fetchMoviesByCategory("now_playing"),
          fetchMoviesByCategory("popular"),
          fetchMoviesByCategory("top_rated"),
          fetchMoviesByCategory("upcoming"),
        ]);

        setCategories({
          nowPlaying,
          popular,
          topRated,
          upcoming,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Categories</h1>
      <p className="mb-4">
        Explore the latest movies in various categories. Click on a movie to
        learn more about it.
      </p>
      <MovieSection title="🎬 Now Playing" movies={categories.nowPlaying} />
      <MovieSection title="🌟 Popular" movies={categories.popular} />
      <MovieSection title="🏆 Top Rated" movies={categories.topRated} />
      <MovieSection title="⏳ Upcoming" movies={categories.upcoming} />
    </div>
  );
}
