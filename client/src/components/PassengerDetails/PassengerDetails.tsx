import { useEffect, useState } from "react";
import "./PassengerDetails.css";
import axios from "axios";
import { useSelector } from "react-redux";
const PassengerDetails = () => {
  const flightObj = useSelector(
    (state: any) => state.flightOffers.selectedFlight
  );
  console.log(flightObj);

  const [paxDetails, setPaxDetails] = useState<any>({
    fName: "",
    lName: "",
    email: "",
    dob: "",
    gender: "",
    ctrCode: "",
    mobile: "",
    passport: "",
    passportExpiry: "",
    issue: "",
    nationality: "",
  });
  console.log("passenger Details", paxDetails);

  const sendPaxDetails = async () => {
    await axios
      .post("http://localhost:8000/flight-create-order", {
        paxDetails: paxDetails,
        flightObj: flightObj,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <section id="passenger-details">
        <h2 style={{ textAlign: "center" }}>Passenger Details</h2>
        <div className="passenger-details-container">
          <div className="passenger-details-inputs">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              onChange={(e) =>
                setPaxDetails({
                  fname: e.target.value,
                })
              }
            />
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              onChange={(e) =>
                setPaxDetails({
                  ...paxDetails,
                  lname: e.target.value,
                })
              }
            />
            <label htmlFor="email">Email</label>

            <input
              type="e-mail"
              placeholder="Your Email Address"
              name="email"
              onChange={(e) =>
                setPaxDetails({
                  ...paxDetails,
                  email: e.target.value,
                })
              }
            />
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={(e) =>
                setPaxDetails({
                  ...paxDetails,
                  dob: e.target.value,
                })
              }
            />
            <label htmlFor="gender">Gender</label>
            <select
              className="gender"
              name="gender"
              value={paxDetails.gender}
              onChange={(e) =>
                setPaxDetails({ ...paxDetails, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            <label htmlFor="ctr">Country Code</label>
            <input
              type="text"
              placeholder="+CTR"
              id="ctr"
              name="ctr"
              onChange={(e) =>
                setPaxDetails({ ...paxDetails, ctrCode: e.target.value })
              }
            />

            <label htmlFor="tel">Mobile</label>
            <input
              type="tel"
              placeholder="Your 10 digit Mobile No."
              name="tel"
              onChange={(e) =>
                setPaxDetails({ ...paxDetails, mobile: e.target.value })
              }
            />
          </div>
          <h2 style={{ textAlign: "center" }}>Passport Details</h2>
          <p style={{ textAlign: "center", marginTop: "0" }}>
            *Please Enter information as mentioned in your Passport
          </p>
          <div className="passport-details">
            <label htmlFor="passport-no">Passport No.</label>
            <input
              type="text"
              placeholder="Passport No"
              name="passportNo"
              onChange={(e) =>
                setPaxDetails({ ...paxDetails, passport: e.target.value })
              }
            />
            <label htmlFor="passport-expiry">Expiry Date</label>
            <input
              type="date"
              onChange={(e) =>
                setPaxDetails({ ...paxDetails, passportExpiry: e.target.value })
              }
            />
            <label htmlFor="issuance">Issuance Contry</label>
            <input
              type="text"
              placeholder="Issuance Country"
              onChange={(e) =>
                setPaxDetails({ ...paxDetails, issue: e.target.value })
              }
            />
            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              placeholder="Nationality"
              onChange={(e) =>
                setPaxDetails({ ...paxDetails, nationality: e.target.value })
              }
            />
          </div>
        </div>
        {/* <div className="submit-paxinfo">
          <button onClick={() => sendPaxDetails()}>Submit</button>
        </div> */}
      </section>
    </>
  );
};

export default PassengerDetails;
