"use strict";
// src/marineApiSdk.ts
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
const axios_1 = __importDefault(require("axios"));
// SDK class
class MarineApiSdk {
    constructor(httpClient = axios_1.default) {
        this.baseUrl = 'https://marine-api.open-meteo.com/v1/marine';
        this.httpClient = httpClient;
    }
    validateCoordinates(latitude, longitude) {
        if (latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180) {
            throw new Error('Invalid latitude or longitude values.');
        }
    }
    validateParameters(parameters) {
        if (parameters.length === 0) {
            throw new Error('At least one parameter is required for the forecast.');
        }
    }
    fetchForecast(latitude, longitude, forecastType, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateCoordinates(latitude, longitude);
            this.validateParameters(parameters);
            const url = new URL(this.baseUrl);
            url.searchParams.append('latitude', latitude.toString());
            url.searchParams.append('longitude', longitude.toString());
            url.searchParams.append(forecastType, parameters.join(','));
            try {
                const response = yield this.httpClient.get(url.toString());
                return response.data;
            }
            catch (error) {
                throw new Error(`Error fetching ${forecastType} forecast: ${error}`);
            }
        });
    }
    getHourlyForecast(latitude, longitude, parameters) {
        return this.fetchForecast(latitude, longitude, 'hourly', parameters);
    }
    getDailyForecast(latitude, longitude, parameters) {
        return this.fetchForecast(latitude, longitude, 'daily', parameters);
    }
    getCurrentForecast(latitude, longitude, parameters) {
        return this.fetchForecast(latitude, longitude, 'current', parameters);
    }
}
exports.default = MarineApiSdk;
