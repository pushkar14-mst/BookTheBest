import "./PassengerDetails.css";
const PassengerDetails = () => {
  return (
    <>
      <section id="passenger-details">
        <h2 style={{ textAlign: "center" }}>Passenger Details</h2>
        <div className="passenger-details-container">
          <div className="passenger-details-inputs">
            <input type="text" placeholder="Your Name" />
            <input type="e-mail" placeholder="Your Email Address" />
          </div>
        </div>
      </section>
    </>
  );
};

export default PassengerDetails;
