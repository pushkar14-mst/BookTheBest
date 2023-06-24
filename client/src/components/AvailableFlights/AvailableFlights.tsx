import "./AvailableFlights.css";
const AvailableFlights: React.FC = () => {
  return (
    <>
      <div className="flights-offers-container">
        <div className="offers-tile">
          <div className="one-way-offer">
            <div className="arrival-info">
              <h1>BOM</h1>
              <p>17:00</p>
            </div>
            <div className="flight-time">
              <div className="flight-price">
                <h3>53,000RS</h3>
              </div>
            </div>
            <div className="departure-info">
              <h1>SFO</h1>
              <p>10:50</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableFlights;
