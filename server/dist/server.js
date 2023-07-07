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
let confirmOrder;
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
        //res.json(req.body);
        let inputFlight = req.body.flightObj;
        yield amadeus.shopping.flightOffers.pricing
            .post(JSON.stringify({
            data: {
                type: "flight-offers-pricing",
                flightOffers: [inputFlight],
            },
        }))
            .then((response) => {
            res.json(response.result);
        })
            .catch((err) => console.log("error:", err));
    });
});
app.post("/flight-create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let inputFlight = req.body.flightObj;
    yield amadeus.booking.flightOrders
        .post(JSON.stringify({
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
    }))
        .then(function (response) {
        console.log(response.result);
        res.json(JSON.stringify(response.result));
    })
        .catch(function (responseError) {
        console.log(responseError);
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:8000`);
});
