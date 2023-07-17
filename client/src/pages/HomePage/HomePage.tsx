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
  const [journeyClass, setJourneyClass] = useState<string>("Economy");
  const [currency, setCurrency] = useState<string>("USD");
  const [adults, setAdults] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flightTypes, setFlightTypes] = useState<any>();

  const addProduct = async () => {
    let product = {
      id: "p1",
      name: "Adidas Tshirt",
      description: "Cool Tshirt with quick dry tech",
      price: 1290,
    };
    await axios.post(
      "http://localhost:5278/api/Product",
      {
        product: product,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  const searchFlights = async (
    departure: string,
    arrival: string,
    date: string,
    journeyClass: string,
    adults: string,
    children: string,
    currency: string
  ) => {
    await axios
      .get("http://localhost:8000/flight-search", {
        params: {
          originCode: departure,
          destinationCode: arrival,
          dateOfDeparture: date, //yyyy-mm-dd
          journeyClass: journeyClass,
          adults: adults.length > 0 ? adults : "1",
          children: children.length > 0 ? children : "0",
          currencyCode: currency.length > 0 ? currency : "USD",
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setSearchResults(res.data.data);
        setFlightTypes(res.data.dictionaries?.aircraft);
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
    addProduct();
    let getProducts = async () => {
      await axios.get("http://localhost:5278/api/Product").then((res) => {
        console.log(res.data);
      });
    };
    getProducts();
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
                <select
                  name="journey-class"
                  id="journey-class"
                  value={journeyClass}
                  onChange={(e) => setJourneyClass(e.target.value)}
                >
                  <option value="FIRST">First</option>
                  <option value="BUSINESS">Business</option>
                  <option value="PREMIUM_ECONOMY">Premium Economy</option>
                  <option value="ECONOMY">Economy</option>
                </select>
                <input
                  type="Number"
                  placeholder="No. Of Adults"
                  value={adults}
                  min={1}
                  max={6}
                  onChange={(e) => setAdults(e.target.value)}
                />
                <input
                  type="Number"
                  placeholder="No. Of Children"
                  value={children}
                  min={0}
                  max={6}
                  onChange={(e) => setChildren(e.target.value)}
                />
                <select
                  name=""
                  id=""
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                >
                  <option value="">Select Currency</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
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
                      departureDate,
                      journeyClass,
                      adults,
                      children,
                      currency
                    );
                  }}
                >
                  Search
                </button>
                <button onClick={() => setTypeOfJourney("")}>Back</button>
                <button
                  onClick={() => {
                    setArrivalSearch("");
                    setDepartureSearch("");
                    setCurrentArrival("");
                    setCurrentDeparture("");
                    setDepartureDate("");
                    setAdults("");
                    setChildren("");
                  }}
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
        <AvailableFlights
          flights={searchResults}
          isLoading={isLoading}
          departure={currentDeparture}
          arrival={currentArrival}
          flightTypes={flightTypes}
        />
      </div>
    </>
  );
};
export default HomePage;
