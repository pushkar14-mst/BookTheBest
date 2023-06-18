import { configureStore } from "@reduxjs/toolkit";
import { flightsReducers } from "./flights-offers";

const store = configureStore({
  reducer: {
    "flights-offers": flightsReducers,
  },
});

export default store;
