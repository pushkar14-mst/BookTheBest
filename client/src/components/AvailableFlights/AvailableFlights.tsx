import "./AvailableFlights.css";
import FlightIcon from "@mui/icons-material/Flight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";

interface IProps {
  flights: [];
  isLoading: boolean;
  departure: string;
  arrival: string;
}
const AvailableFlights: React.FC<IProps> = ({
  flights,
  isLoading,
  departure,
  arrival,
}: IProps) => {
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
      <div className="flights-offers-container">
        {isLoading && (
          <Skeleton
            variant="rectangular"
            height="200px"
            animation="wave"
            style={{ backgroundColor: "#ffe3e0" }}
          />
        )}
        {!isLoading &&
          flights?.map((flightOffer: any) => {
            console.log(
              flightOffer.itineraries[0].segments
                .slice(-1)[0]
                .arrival.at.slice(11)
            );
            var airlineCode = flightOffer.validatingAirlineCodes[0];
            return (
              <div className="offers-tile">
                <div className="airline-logo">
                  <img src={`http://pics.avs.io/200/200/${airlineCode}.png`} />
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
                <div className="flight-price">
                  <h1>
                    {currency_symbols[flightOffer.price.currency] !==
                      undefined &&
                      `${currency_symbols[flightOffer.price.currency]}${
                        flightOffer.price.total
                      }`}
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AvailableFlights;
