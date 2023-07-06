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
            <div className="mobile">
              <p>Mobile</p>
              {/* <label htmlFor="ctr">Mobile</label> */}
              <input type="text" placeholder="+CTR" id="ctr" name="ctr" />
              <input
                type="tel"
                placeholder="Your 10 digit Mobile No."
                name="tel"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PassengerDetails;
