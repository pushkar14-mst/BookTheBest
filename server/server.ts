import express, { Express, Request, Response } from "express";
// import mongoose, { Mongoose, model } from "mongoose";
var Amadeus = require("amadeus");
var dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const app: Express = express();
const port = 8000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.urlencoded({ extended: true }));

let confirmOrder: any;
const amadeus = new Amadeus({
  clientId: process.env.NODE_AMADEUS_API_KEY,
  clientSecret: process.env.NODE_AMADEUS_API_SECRET_KEY,
});

app.get(
  `/city-and-airport-search/:parameter`,
  (req: Request, res: Response) => {
    const parameter = req.params.parameter;
    // Which cities or airports start with the parameter variable
    amadeus.referenceData.locations
      .get({
        keyword: parameter,
        subType: Amadeus.location.any,
      })
      .then(async function (response: any) {
        res.json(response.result);
      })
      .catch(function (response: any) {
        res.json(response);
      });
  }
);
app.get("/flight-search", (req: Request, res: Response) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;
  const journeyClass = req.query.journeyClass;
  const adults = req.query.adults;
  const children = req.query.children;
  const currencyCode = req.query.currencyCode;
  // Find the cheapest flights
  try {
    amadeus.shopping.flightOffersSearch
      .get({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: dateOfDeparture,
        adults: adults,
        children: children,
        travelClass: journeyClass,
        max: "70",
        currencyCode: currencyCode,
      })
      .then(function (response: any) {
        res.json(response.result);
      })
      .catch(function (response: any) {
        res.json(response);
      });
  } catch (error: any) {
    throw Error(error);
  }
});
app.post("/flightprice", async function (req: Request, res: Response) {
  //res.json(req.body);
  let inputFlight = req.body.flightObj;
  await amadeus.shopping.flightOffers.pricing
    .post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [inputFlight],
        },
      })
    )
    .then((response: any) => {
      res.json(response.result);
    })
    .catch((err: any) => console.log("error:", err));
});

app.post("/flight-create-order", async (req: Request, res: Response) => {
  let inputFlight = req.body.flightObj;
  await amadeus.booking.flightOrders
    .post(
      JSON.stringify({
        data: {
          type: "flight-order",
          flightOffers: [inputFlight],
          travelers: [
            {
              id: "1",
              dateOfBirth: "2012-10-11",
              gender: "FEMALE",
              contact: {
                emailAddress: "jorge.gonzales833@telefonica.es",
                phones: [
                  {
                    deviceType: "MOBILE",
                    countryCallingCode: "34",
                    number: "480080076",
                  },
                ],
              },
              documents: [
                {
                  documentType: "PASSPORT",
                  number: "012345678",
                  expiryDate: "2009-04-14",
                  issuanceCountry: "GB",
                  nationality: "GB",
                  holder: true,
                },
              ],
              name: {
                firstName: "ADRIANA",
                lastName: "GONZALES",
              },
            },
          ],
        },
      })
    )
    .then(function (response: any) {
      console.log(response.result);
      res.json(JSON.stringify(response.result));
    })
    .catch(function (responseError: any) {
      console.log(responseError);
    });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:8000`);
});
