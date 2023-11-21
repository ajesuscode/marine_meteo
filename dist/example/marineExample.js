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
const openMarine_1 = __importDefault(require("../src/openMarine"));
const marine = new openMarine_1.default();
function getHourlyForecast() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const forecast = yield marine.getHourly(54.3213, 10.1348, ['wave_period']);
            console.log('Hourly Marine Forecast:', forecast);
        }
        catch (error) {
            console.error('Error fetching hourly forecast:', error);
        }
    });
}
getHourlyForecast();
function getCurrentMarineForecast() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const current = yield marine.getCurrent(54.3213, 10.1348, [
                'wave_height',
                'wave_direction',
                'wave_period',
            ]);
            console.log('Current Marine Forecast:', current);
        }
        catch (err) {
            console.log('Error fetching current forecast:', err);
        }
    });
}
getCurrentMarineForecast();
