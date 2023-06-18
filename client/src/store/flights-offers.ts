import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface flightDetails {
  flights: any[];
}

const initialState: flightDetails = {
  flights: [],
};
const flightsOffersSlice = createSlice({
  name: "flights-offers",
  initialState: initialState,
  reducers: {
    getFlights(state, action: PayloadAction<any>) {
      state.flights.push(action.payload);
    },
  },
});

export const flightsActions = flightsOffersSlice.actions;
export const flightsReducers = flightsOffersSlice.reducer;
