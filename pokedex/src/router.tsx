import { createBrowserRouter } from "react-router-dom";
import Index from "./pages";
import Pokedex from "./pages/Pokedex";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/pokedex",
    element: <Pokedex />,
  }
]);