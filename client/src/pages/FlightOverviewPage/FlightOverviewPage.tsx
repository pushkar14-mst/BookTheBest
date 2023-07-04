import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import "./FlightOverviewPage.css";
import PassengerDetails from "../../components/PassengerDetails/PassengerDetails";

const FlightOverviewPage = () => {
  const flight = useSelector((state: any) => state.flightOffers);
  console.log(flight.selectedFlight);
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
      <h1 className="logo">Book The Best</h1>
      <div className="flight-overview-container">
        <h2>Selected Offer</h2>

        {flight.selectedFlight[0]?.itineraries[0].segments?.map(
          (segment: any) => {
            return (
              <>
                <div className="selected-flight-details">
                  <div className="departure">
                    <h1>{segment.departure.iataCode}</h1>
                    <p>Terminal {segment.departure.terminal}</p>
                    <p>Departing At: {segment.departure.at.slice(11)}</p>
                    <p>
                      Checked In Bags:
                      {flight
                        ? flight.selectedFlight[0]?.travelerPricings[0]?.fareDetailsBySegment
                            ?.filter((fare: any) => {
                              return fare.segmentId === segment.id;
                            })
                            .map((includedBags: any) => {
                              return `${includedBags.includedCheckedBags?.quantity}`;
                            })
                        : `Not Available`}
                    </p>
                  </div>
                  <div className="duration">
                    <h1>-{segment.duration?.slice(2)}-</h1>
                    <img
                      src={`http://pics.avs.io/200/200/${segment?.operating?.carrierCode}@2x.png`}
                      style={{
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="arrival">
                    <h1>{segment.arrival.iataCode}</h1>
                    <p>Terminal {segment.arrival.terminal}</p>
                    <p>Arriving At: {segment.arrival.at.slice(11)}</p>
                    <p>
                      Checked In Bags:
                      {flight
                        ? flight.selectedFlight[0]?.travelerPricings[0]?.fareDetailsBySegment
                            ?.filter((fare: any) => {
                              return fare.segmentId === segment.id;
                            })
                            .map((includedBags: any) => {
                              return `${includedBags.includedCheckedBags?.quantity}`;
                            })
                        : `Not Available`}
                    </p>
                  </div>
                </div>
              </>
            );
          }
        )}
        <div className="fare-breakdown">
          <h1>
            {`Total Fare: ${
              flight.selectedFlight[0]?.travelerPricings[0]?.price?.total
            } ${
              currency_symbols[
                flight.selectedFlight[0]?.travelerPricings[0]?.price?.currency
              ]
            }`}
          </h1>
        </div>
        <a href="#passenger-details">
          <button>Proceed To Enter Passenger Details</button>
        </a>
      </div>
      <PassengerDetails />
    </>
  );
};

export default FlightOverviewPage;
