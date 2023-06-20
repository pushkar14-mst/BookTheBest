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
  console.log(req.query);

  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;
  // Find the cheapest flights
  try {
    amadeus.shopping.flightOffersSearch
      .get({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: dateOfDeparture,
        adults: "1",
        max: "7",
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
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:8000`);
});
