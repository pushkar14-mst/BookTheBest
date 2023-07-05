import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface flightDetails {
  selectedFlight: any[];
  flightPricing: any[];
}

const initialState: flightDetails = {
  selectedFlight: [],
  flightPricing: [],
};
const flightsOffersSlice = createSlice({
  name: "flightOffers",
  initialState: initialState,
  reducers: {
    setFlight(state, action: PayloadAction<any>) {
      state.selectedFlight = [action.payload.flight];
    },
    setFlightPricing(state, action: PayloadAction<any>) {
      state.flightPricing = [action.payload.flightPricing];
      console.log(state.flightPricing);
    },
  },
});

export const flightsActions = flightsOffersSlice.actions;
export const flightsReducers = flightsOffersSlice.reducer;
