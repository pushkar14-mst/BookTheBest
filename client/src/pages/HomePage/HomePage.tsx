import { useEffect, useState } from "react";
import AvailableFlights from "../../components/AvailableFlights/AvailableFlights";
import "./HomePage.css";
import axios from "axios";
const HomePage = () => {
  const [typeOfJourney, setTypeOfJourney] = useState<string>("");
  const [departureSearch, setDepartureSearch] = useState<string>("");
  const [departureSearchResults, setDepartureSearchResults] = useState<any>([]);
  const [arrivalSearch, setArrivalSearch] = useState<string>("");
  const [arrivalSearchResults, setArrivalSearchResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState<string>("");
  const [currentDeparture, setCurrentDeparture] = useState<string>("");
  const [currentArrival, setCurrentArrival] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(departureDate);

  const searchFlights = async (
    departure: string,
    arrival: string,
    date: string
  ) => {
    await axios
      .get("http://localhost:8000/flight-search", {
        params: {
          originCode: departure,
          destinationCode: arrival,
          dateOfDeparture: date, //yyyy-mm-dd
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setSearchResults(res.data.data);
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
                    value={
                      currentDeparture.length > 0
                        ? currentDeparture
                        : departureSearch
                    }
                  />
                  {isSearching.length > 0 && isSearching === "departure" && (
                    <div className="search-res">
                      <div className="airport-list">
                        {departureSearchResults?.map((airport: any) => {
                          return (
                            <>
                              <div
                                className="airport-info"
                                onClick={() => {
                                  setCurrentDeparture(airport?.iataCode);
                                  setIsSearching("");
                                }}
                              >
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
                    value={
                      currentArrival.length > 0 ? currentArrival : arrivalSearch
                    }
                  />
                  {isSearching.length > 0 && isSearching === "arrival" && (
                    <div className="search-res">
                      <div className="airport-list">
                        {arrivalSearchResults?.map((airport: any) => {
                          return (
                            <>
                              <div
                                className="airport-info"
                                onClick={() => {
                                  setCurrentArrival(airport?.iataCode);
                                  setIsSearching("");
                                }}
                              >
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
                <input
                  type="date"
                  placeholder="Departure Date"
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                  }}
                />
                {typeOfJourney === "Return" && (
                  <input type="date" placeholder="Return Date" />
                )}
              </div>

              <div id="search-btns">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    searchFlights(
                      currentDeparture,
                      currentArrival,
                      departureDate
                    );
                  }}
                >
                  Search
                </button>
                <button onClick={() => setTypeOfJourney("")}>Back</button>
              </div>
            </>
          )}
        </div>
        <AvailableFlights
          flights={searchResults}
          isLoading={isLoading}
          departure={currentDeparture}
          arrival={currentArrival}
        />
      </div>
    </>
  );
};
export default HomePage;
