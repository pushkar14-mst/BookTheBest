import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import FlightOverviewPage from "./pages/FlightOverviewPage/FlightOverviewPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";

function App() {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="flight-overview" element={<FlightOverviewPage />} />
      <Route path="confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
}

export default App;
