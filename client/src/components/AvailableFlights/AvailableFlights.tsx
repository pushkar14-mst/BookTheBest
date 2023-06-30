import "./AvailableFlights.css";
import { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";

interface IProps {
  flights: [];
  isLoading: boolean;
  departure: string;
  arrival: string;
  flightTypes: any;
}

const AvailableFlights: React.FC<IProps> = ({
  flights,
  isLoading,
  departure,
  arrival,
  flightTypes,
}: IProps) => {
  console.log(flightTypes);

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

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [flightOfferId, setFlightOfferId] = useState<string>("");
  return (
    <>
      <div className="flights-offers-container">
        {isLoading && (
          <Skeleton
            variant="rectangular"
            height="200px"
            animation="wave"
            style={{ backgroundColor: "#008080" }}
          />
        )}
        {!isLoading &&
          flights?.map((flightOffer: any, index: number) => {
            var airlineCode = flightOffer.validatingAirlineCodes[0];
            return (
              <>
                <div className="offers-tile">
                  <div className="airline-logo">
                    {index === 0 && (
                      <div className="special-flight-tag">
                        <p>Cheapest</p>
                      </div>
                    )}
                    <img
                      src={`http://pics.avs.io/200/200/${airlineCode}.png`}
                    />
                  </div>
                  <div className="one-way-offer">
                    <div className="arrival-info">
                      <h1>{departure}</h1>
                      <p>
                        {flightOffer.itineraries[0].segments[0].departure.at.slice(
                          11
                        )}
                      </p>
                    </div>
                    <p id="flight-time">
                      {flightOffer?.itineraries[0].duration.slice(2)}
                    </p>
                    <div className="flight-time">
                      {flightOffer.itineraries[0].segments.length > 1 ? (
                        <Tooltip
                          title={`+ ${
                            flightOffer.itineraries[0].segments.length - 1
                          } stops`}
                        >
                          <FiberManualRecordIcon
                            style={{ transform: "translate(0,-10px)" }}
                          />
                        </Tooltip>
                      ) : (
                        <p>Direct</p>
                      )}
                    </div>
                    <FlightIcon style={{ transform: "rotate(90deg)" }} />
                    <div className="departure-info">
                      <h1>{arrival}</h1>
                      <p>
                        {flightOffer.itineraries[0].segments
                          .slice(-1)[0]
                          .arrival.at.slice(11)}
                      </p>
                    </div>
                  </div>
                  <ExpandMoreIcon
                    style={{
                      position: "absolute",
                      bottom: "0",
                      color: "#2b6777",
                    }}
                    onClick={() => {
                      setIsExpanded(!isExpanded);
                      setFlightOfferId(flightOffer.id);
                    }}
                  />
                  <div className="flight-price">
                    <h1>
                      {currency_symbols[flightOffer.price.currency] !==
                        undefined &&
                        `${currency_symbols[flightOffer.price.currency]}${
                          flightOffer.price.total
                        }`}
                    </h1>
                    <p>
                      {flightOffer.travelerPricings[0].fareDetailsBySegment[0].cabin
                        .charAt(0)
                        .toUpperCase() +
                        flightOffer.travelerPricings[0].fareDetailsBySegment[0].cabin
                          .slice(1)
                          .toLowerCase()}
                    </p>
                  </div>
                </div>
                {isExpanded && flightOffer.id === flightOfferId && (
                  <div className="offer-expansion">
                    <div className="offer-detail">
                      <div className="departure-airports">
                        {flightOffer.itineraries[0].segments.map(
                          (segment: any) => {
                            return (
                              <>
                                <h2>
                                  {segment.departure.iataCode}
                                  <span>
                                    <p
                                      style={{
                                        margin: "0",
                                        fontSize: "0.96rem",
                                      }}
                                    >
                                      {segment.departure.at.slice(11)}
                                    </p>
                                  </span>
                                  <FlightTakeoffIcon />
                                  <img
                                    src={`http://pics.avs.io/200/200/${segment?.operating?.carrierCode}@2x.png`}
                                    style={{
                                      height: "40px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </h2>
                              </>
                            );
                          }
                        )}
                      </div>
                      <div className="flight-time-segment-wise">
                        {flightOffer.itineraries[0].segments.map(
                          (segment: any) => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <p
                                  style={{
                                    marginBottom: "0",
                                    textAlign: "center",
                                    fontSize: "0.96rem",
                                  }}
                                >
                                  {`${segment.carrierCode}${segment.number}`}{" "}
                                  {flightTypes[segment.aircraft?.code]}
                                </p>
                                <h1 style={{ margin: "5px" }}>
                                  {segment.duration.slice(2)}
                                </h1>
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="arrival-airports">
                        {flightOffer.itineraries[0].segments.map(
                          (segment: any) => {
                            return (
                              <>
                                <h2>
                                  {segment.arrival.iataCode}
                                  <span>
                                    <p
                                      style={{
                                        margin: "0",
                                        fontSize: "0.96rem",
                                      }}
                                    >
                                      {segment.arrival.at.slice(11)}
                                    </p>
                                  </span>
                                  <FlightLandIcon />
                                  <img
                                    src={`http://pics.avs.io/200/200/${segment?.operating?.carrierCode}@2x.png`}
                                    style={{
                                      height: "40px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </h2>
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </div>
    </>
  );
};

export default AvailableFlights;
