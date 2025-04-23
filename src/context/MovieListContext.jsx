"use client";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const MovieListContext = createContext();

function getInitialState() {
  if (typeof window === "undefined") return { myList: [] };

  // Client-side initialization
  try {
    const storedList = localStorage.getItem("myMovieList");
    return {
      myList: storedList ? JSON.parse(storedList) : [],
    };
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return { myList: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { myList: action.payload };
    case "ADD_TO_LIST":
      // Check if movie already exists
      if (state.myList.some((movie) => movie.id === action.payload.id)) {
        return state;
      }
      const updatedListAdd = [...state.myList, action.payload];
      try {
        localStorage.setItem("myMovieList", JSON.stringify(updatedListAdd));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      return { myList: updatedListAdd };
    case "REMOVE_FROM_LIST":
      const updatedListRemove = state.myList.filter(
        (movie) => movie.id !== action.payload
      );
      try {
        localStorage.setItem("myMovieList", JSON.stringify(updatedListRemove));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      return { myList: updatedListRemove };
    default:
      return state;
  }
}

export function MovieListProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { myList: [] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const initialState = getInitialState();
    dispatch({ type: "INIT", payload: initialState.myList });
  }, []);

  const isInList = (movieId) =>
    state.myList.some((movie) => movie.id === movieId);

  if (!isMounted) return null;

  return (
    <MovieListContext.Provider value={{ ...state, dispatch, isInList }}>
      {children}
    </MovieListContext.Provider>
  );
}

export function useMovieList() {
  const context = useContext(MovieListContext);
  if (!context) {
    throw new Error("useMovieList must be used within a MovieListProvider");
  }
  return context;
}
