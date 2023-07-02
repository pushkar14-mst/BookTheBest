import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface flightDetails {
  selectedFlight: any[];
}

const initialState: flightDetails = {
  selectedFlight: [],
};
const flightsOffersSlice = createSlice({
  name: "flightOffers",
  initialState: initialState,
  reducers: {
    setFlight(state, action: PayloadAction<any>) {
      state.selectedFlight = [action.payload.flight];
      console.log(state.selectedFlight);
    },
  },
});

export const flightsActions = flightsOffersSlice.actions;
export const flightsReducers = flightsOffersSlice.reducer;
