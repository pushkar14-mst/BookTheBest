import "./PassengerDetails.css";
const PassengerDetails = () => {
  return (
    <>
      <section id="passenger-details">
        <h2 style={{ textAlign: "center" }}>Passenger Details</h2>
        <div className="passenger-details-container">
          <div className="passenger-details-inputs">
            <label htmlFor="fname">First Name</label>
            <input type="text" placeholder="First Name" name="fname" />
            <label htmlFor="lname">Last Name</label>
            <input type="text" placeholder="Last Name" name="lname" />
            <label htmlFor="email">Email</label>

            <input
              type="e-mail"
              placeholder="Your Email Address"
              name="email"
            />
            <label htmlFor="dob">Date Of Birth</label>
            <input type="date" name="dob" />
            <label htmlFor="gender">Gender</label>
            <select className="gender" name="gender">
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            <label htmlFor="ctr">Country Code</label>
            <input type="text" placeholder="+CTR" id="ctr" name="ctr" />
            <label htmlFor="tel">Mobile</label>
            <input
              type="tel"
              placeholder="Your 10 digit Mobile No."
              name="tel"
            />
          </div>
          <h2 style={{ textAlign: "center" }}>Passport Details</h2>
          <p style={{ textAlign: "center", marginTop: "0" }}>
            *Please Enter information as mentioned in your Passport
          </p>
          <div className="passport-details">
            <label htmlFor="passport-no">Passport No.</label>
            <input type="text" placeholder="Passport No" name="passportNo" />
            <label htmlFor="passport-expiry">Expiry Date</label>
            <input type="date" />
            <label htmlFor="issuance">Issuance Contry</label>
            <input type="text" placeholder="Issuance Country" />
            <label htmlFor="nationality">Nationality</label>
            <input type="text" placeholder="Nationality" />
          </div>
        </div>
      </section>
    </>
  );
};

export default PassengerDetails;
