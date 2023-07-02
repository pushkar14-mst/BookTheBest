import { configureStore } from "@reduxjs/toolkit";
import { flightsReducers } from "./flights-offers";

const store = configureStore({
  reducer: {
    flightOffers: flightsReducers,
  },
});

export default store;
