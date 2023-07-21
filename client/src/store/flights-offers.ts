import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface flightDetails {
  selectedFlight: any[];
  flightPricing: any[];
  isLoading: boolean;
  confirmedFlight: any[];
}

const initialState: flightDetails = {
  selectedFlight: [],
  flightPricing: [],
  isLoading: false,
  confirmedFlight: [],
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
    setLoading(state) {
      state.isLoading = true;
    },
    unSetLoading(state) {
      state.isLoading = false;
    },
    setConfirmedFlight(state, action: PayloadAction<any>) {
      state.confirmedFlight = [action.payload.confirmedFlight];
      console.log("current state:", state.confirmedFlight);
    },
  },
});

export const flightsActions = flightsOffersSlice.actions;
export const flightsReducers = flightsOffersSlice.reducer;
