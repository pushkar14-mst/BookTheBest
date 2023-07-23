import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import "./ConfirmationPage.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ConfirmationPage = () => {
  const [arrivalAirportName, setArrivalAirportName] = useState<any>("");
  const [departureAirportName, setDepartureAirportName] = useState<any>("");

  const loading = useSelector((state: any) => state.flightOffers.isLoading);
  const confirmedFlight = useSelector(
    (state: any) => state.flightOffers?.confirmedFlight[0]
  );

  const getAirportName = async (iataCode: string, type: string) => {
    if (iataCode.length < 0) return "N/A";
    await axios
      .get(`http://localhost:8000/city-and-airport-search/${iataCode}`)
      .then((res) => {
        if (type === "arrival") {
          setArrivalAirportName(res.data.data[0].name);
        } else if (type === "departure") {
          setDepartureAirportName(res.data.data[0].name);
        }
      });
  };

  var currency_symbols: any = {
    USD: "$", // US Dollar
    EUR: "€", // Euro
    CRC: "₡", // Costa Rican Colón
    GBP: "£", // British Pound Sterling
    ILS: "₪", // Israeli New Sheqel
    INR: "₹", // Indian Rupee
    JPY: "¥", // Japanese Yen
    KRW: "₩", // South Korean Won
    NGN: "₦", // Nigerian Naira
    PHP: "₱", // Philippine Peso
    PLN: "zł", // Polish Zloty
    PYG: "₲", // Paraguayan Guarani
    THB: "฿", // Thai Baht
    UAH: "₴", // Ukrainian Hryvnia
    VND: "₫", // Vietnamese Dong
  };
  return (
    <>
      {loading ? (
        <div className="loading-view">
          <h1>Confirming Your Itinenary...</h1>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <h1 className="logo">Book The Best</h1>
          <div className="confirmation-page-container">
            <h1 id="pax-name">
              Mr. {confirmedFlight.travelers[0].name.lastName},
            </h1>
            <h2 style={{ marginBottom: "0", marginTop: "0" }}>
              Your Itinerary:
            </h2>
            <h2 style={{ marginBottom: "0", marginTop: "0" }}>
              Booking Reference:{" "}
              {confirmedFlight.associatedRecords[0].reference}
            </h2>
            <div className="itinerary">
              {confirmedFlight?.flightOffers[0].itineraries[0].segments?.map(
                (segment: any, index: number) => {
                  const nextSegment =
                    confirmedFlight?.flightOffers[0].itineraries[0].segments[
                      index + 1
                    ];

                  useEffect(() => {
                    getAirportName(segment.departure.iataCode, "departure");
                    getAirportName(segment.arrival.iataCode, "arrival");

                    // console.log(departureAirportName, arrivalAirportName);
                  }, [1]);

                  return (
                    <>
                      <div className="nth-flight">
                        <div className="dep-airport-info-box">
                          <p style={{ marginBottom: "0" }}>Departing From</p>
                          <h1 style={{ marginBottom: "0", marginTop: "0" }}>
                            {segment.departure.iataCode}
                          </h1>
                          <h3 style={{ marginBottom: "0", marginTop: "0" }}>
                            {segment.departure.at.slice(11)}
                          </h3>
                          <h3 style={{ marginBottom: "0", marginTop: "0" }}>
                            {departureAirportName}
                          </h3>
                          <p style={{ marginTop: "5px" }}>
                            {segment.departure.terminal
                              ? `Terminal ${segment.departure.terminal}`
                              : "International"}
                          </p>
                        </div>
                        <div className="aircraft-logo">
                          <img
                            src={`http://pics.avs.io/200/200/${segment?.carrierCode}@2x.png`}
                            style={{
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="flight-time2">
                          <h1 id="duration">{segment.duration?.slice(2)}</h1>
                        </div>
                        <div className="aircraft-info">
                          <p>{`${segment.carrierCode}${segment.number}`}</p>
                          <p></p>
                        </div>
                        <div className="arr-airport-info-box">
                          <p style={{ marginBottom: "0" }}>Arriving At</p>
                          <h1 style={{ marginBottom: "0", marginTop: "0" }}>
                            {segment.arrival.iataCode}
                          </h1>
                          <h3 style={{ marginBottom: "0", marginTop: "0" }}>
                            {segment.arrival.at.slice(11)}
                          </h3>

                          <h3 style={{ marginBottom: "0", marginTop: "0" }}>
                            {arrivalAirportName}
                          </h3>
                          <p style={{ marginTop: "5px" }}>
                            {segment.arrival.terminal
                              ? `Terminal ${segment.arrival.terminal}`
                              : "International"}
                          </p>
                        </div>
                      </div>
                      {nextSegment && (
                        <div className="layover">
                          <p>
                            {`Layover at ${segment.arrival.iataCode}: `}
                            {(() => {
                              const currentTime = new Date(segment.arrival.at);
                              const nextTime = new Date(
                                nextSegment.departure.at
                              );
                              const layoverTimeInMs =
                                nextTime.getTime() - currentTime.getTime();
                              const hours = Math.floor(
                                layoverTimeInMs / (1000 * 60 * 60)
                              );
                              const minutes = Math.floor(
                                (layoverTimeInMs % (1000 * 60 * 60)) /
                                  (1000 * 60)
                              );
                              return hours > 0
                                ? `${hours}hrs ${minutes}mins`
                                : `${minutes}mins`;
                            })()}
                          </p>
                        </div>
                      )}
                    </>
                  );
                }
              )}
            </div>
            <h1>
              {confirmedFlight?.flightOffers[0].travelerPricings[0].price
                .total &&
                `Total Fare: ${
                  confirmedFlight?.flightOffers[0].travelerPricings[0].price
                    .total
                } ${
                  currency_symbols[
                    confirmedFlight?.flightOffers[0].travelerPricings[0].price
                      .currency
                  ]
                }`}
            </h1>
          </div>
        </>
      )}
    </>
  );
};
export default ConfirmationPage;
