import "./AvailableFlights.css";
import FlightIcon from "@mui/icons-material/Flight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";

const AvailableFlights: React.FC = () => {
  return (
    <>
      <div className="flights-offers-container">
        {/* <Skeleton
          variant="rectangular"
          height="200px"
          animation="wave"
          style={{ backgroundColor: "#ffe3e0" }}
        /> */}
        <div className="offers-tile">
          <div className="airline-logo">
            <img src="http://pics.avs.io/200/200/CX.png" />
          </div>
          <div className="one-way-offer">
            <div className="arrival-info">
              <h1>BOM</h1>
              <p>17:00</p>
            </div>
            <p id="flight-time">27h:30m</p>
            <div className="flight-time">
              <Tooltip title="+2 Stops">
                <FiberManualRecordIcon
                  style={{ transform: "translate(0,-10px)" }}
                />
              </Tooltip>
            </div>
            <FlightIcon style={{ transform: "rotate(90deg)" }} />
            <div className="departure-info">
              <h1>SFO</h1>
              <p>10:50</p>
            </div>
          </div>
          <div className="flight-price">
            <h1>$350</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableFlights;
