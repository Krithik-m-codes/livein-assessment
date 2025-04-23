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
    case "ADD_TO_LIST": {
      const updatedListAdd = [...state.myList, action.payload];
      try {
        localStorage.setItem("myMovieList", JSON.stringify(updatedListAdd));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      return { ...state, myList: updatedListAdd };
    }
    case "REMOVE_FROM_LIST": {
      const updatedListRemove = state.myList.filter(
        (movie) => movie.id !== action.payload
      );
      try {
        localStorage.setItem("myMovieList", JSON.stringify(updatedListRemove));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      return { ...state, myList: updatedListRemove };
    }
    default:
      return state;
  }
}

export function MovieListProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [state, dispatch] = useReducer(reducer, { myList: [] });

  // Initialize state after mount
  useEffect(() => {
    setIsMounted(true);
    dispatch({ type: "INIT", payload: getInitialState().myList });
  }, []);

  const isInList = (movieId) =>
    state.myList.some((movie) => movie.id === movieId);

  // Only render children after mounting to avoid hydration mismatches
  if (!isMounted) return null;

  return (
    <MovieListContext.Provider value={{ ...state, dispatch, isInList }}>
      {children}
    </MovieListContext.Provider>
  );
}

export function dispatch(state, action) {
  switch (action.type) {
    case "ADD_TO_LIST":
      return { ...state, myList: [...state.myList, action.payload] };
    case "REMOVE_FROM_LIST":
      return {
        ...state,
        myList: state.myList.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
}

export function useMovieList() {
  const context = useContext(MovieListContext);
  if (!context) {
    throw new Error("useMovieList must be used within a MovieListProvider");
  }
  return context;
}
