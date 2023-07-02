"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose, { Mongoose, model } from "mongoose";
var Amadeus = require("amadeus");
var dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.urlencoded({ extended: true }));
const amadeus = new Amadeus({
    clientId: process.env.NODE_AMADEUS_API_KEY,
    clientSecret: process.env.NODE_AMADEUS_API_SECRET_KEY,
});
app.get(`/city-and-airport-search/:parameter`, (req, res) => {
    const parameter = req.params.parameter;
    // Which cities or airports start with the parameter variable
    amadeus.referenceData.locations
        .get({
        keyword: parameter,
        subType: Amadeus.location.any,
    })
        .then(function (response) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(response.result);
        });
    })
        .catch(function (response) {
        res.json(response);
    });
});
app.get("/flight-search", (req, res) => {
    const originCode = req.query.originCode;
    const destinationCode = req.query.destinationCode;
    const dateOfDeparture = req.query.dateOfDeparture;
    const journeyClass = req.query.journeyClass;
    const adults = req.query.adults;
    const children = req.query.children;
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
        })
            .then(function (response) {
            res.json(response.result);
        })
            .catch(function (response) {
            res.json(response);
        });
    }
    catch (error) {
        throw Error(error);
    }
});
app.post("/flightprice", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(req.body);
        let inputFlight = req.body;
        const responsePricing = yield amadeus.shopping.flightOffers.pricing
            .post(JSON.stringify({
            data: {
                type: "flight-offers-pricing",
                flightOffers: inputFlight,
            },
        }))
            .catch((err) => console.log(err));
        try {
            console.log(JSON.parse(responsePricing.body));
            res.json(JSON.parse(responsePricing.body));
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:8000`);
});
