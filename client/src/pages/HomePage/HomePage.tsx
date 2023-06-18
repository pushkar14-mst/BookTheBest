import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
const HomePage = () => {
  const [typeOfJourney, setTypeOfJourney] = useState<string>("");
  const [departureSearch, setDepartureSearch] = useState<string>("");
  const [departureSearchResults, setDepartureSearchResults] = useState<any>([]);
  const [arrivalSearch, setArrivalSearch] = useState<string>("");
  const [arrivalSearchResults, setArrivalSearchResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState<string>("");

  const searchFlights = async (departure: string, arrival: string) => {
    await axios
      .get("http://localhost:8000/flight-search", {
        params: {
          originCode: departure,
          destinationCode: arrival,
          dateOfDeparture: "2023-10-10",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const departureAirportSearch = async () => {
    await axios
      .get(`http://localhost:8000/city-and-airport-search/${departureSearch}`)
      .then((res) => {
        console.log(res.data);
        setDepartureSearchResults(res.data.data);
      });
  };

  const arrivalAirportSearch = async () => {
    await axios
      .get(`http://localhost:8000/city-and-airport-search/${arrivalSearch}`)
      .then((res) => {
        console.log(res.data);
        setArrivalSearchResults(res.data.data);
      });
  };

  useEffect(() => {
    departureAirportSearch();
  }, [departureSearch]);
  useEffect(() => {
    arrivalAirportSearch();
  }, [arrivalSearch]);
  useEffect(() => {
    searchFlights("LON", "SFO");
  }, []);
  return (
    <>
      <h1 className="logo">Book The Best</h1>
      <div className="home-page-container">
        <div className="search-section">
          <h2>Search Your Flight</h2>
          {typeOfJourney.length === 0 && (
            <>
              <h1 className="search-q1">Oneway or Return?</h1>
              <div className="ans-btns">
                <button onClick={() => setTypeOfJourney("Oneway")}>
                  Oneway
                </button>
                <button
                  onClick={() => {
                    setTypeOfJourney("Return");
                  }}
                >
                  Return
                </button>
              </div>
            </>
          )}

          {typeOfJourney.length > 0 && (
            <>
              <h1 className="search-q1">{typeOfJourney} Journey</h1>
              <div className="search-inputs">
                <div className="search">
                  <input
                    type="text"
                    placeholder="Departure City"
                    onChange={(e) => {
                      setDepartureSearch(e.target.value);
                    }}
                    onFocus={() => {
                      setIsSearching("departure");
                    }}
                  />
                  {isSearching.length > 0 && isSearching === "departure" && (
                    <div className="search-res">
                      <div className="airport-list">
                        {departureSearchResults?.map((airport: any) => {
                          return (
                            <>
                              <div className="airport-info">
                                <p>{airport?.iataCode}-</p>
                                <p>{airport.name}</p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="search">
                  <input
                    type="text"
                    placeholder="Arrival City"
                    onChange={(e) => {
                      setArrivalSearch(e.target.value);
                    }}
                    onFocus={() => {
                      setIsSearching("arrival");
                    }}
                  />
                  {isSearching.length > 0 && isSearching === "arrival" && (
                    <div className="search-res">
                      <div className="airport-list">
                        {arrivalSearchResults?.map((airport: any) => {
                          return (
                            <>
                              <div className="airport-info">
                                <p>{airport?.iataCode}-</p>
                                <p>{airport.name}</p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <input type="date" placeholder="Departure Date" />
                {typeOfJourney === "Return" && (
                  <input type="date" placeholder="Return Date" />
                )}
              </div>
              <div id="back-btn">
                <button onClick={() => setTypeOfJourney("")}>Back</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default HomePage;
