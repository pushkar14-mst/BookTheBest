import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import FlightOverviewPage from "./pages/FlightOverviewPage/FlightOverviewPage";

function App() {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="flight-overview" element={<FlightOverviewPage />} />
    </Routes>
  );
}

export default App;
