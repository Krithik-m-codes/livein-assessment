"use client";
import { Box, Typography } from "@mui/material";
import { useMovieList } from "../context/MovieListContext";
import MovieCard from "../components/MovieCard";
import { movieDetails } from "@/data/store";

export default function MyList() {
  const { myList } = useMovieList();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        My List
      </Typography>
      <Box
        sx={{ display: "flex", gap: 2, overflowY: "auto", maxHeight: "80vh" }}
      >
        {myList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isFavorite={true} />
        ))}
      </Box>
      {/* //more like this section  */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          More Like This
        </Typography>
        <Box
          sx={{ display: "flex", gap: 2, overflowY: "auto", maxHeight: "80vh" }}
        >
          {movieDetails.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isFavorite={false} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
