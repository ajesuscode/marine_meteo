// src/marineApiSdk.ts

import axios from 'axios';

// Interface for the common response parts
interface MarineApiResponse {
  latitude: number;
  longitude: number;
  elevation?: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly?: HourlyData;
  hourly_units?: Units;
  daily?: DailyData;
  daily_units?: Units;
  current?: CurrentData;
  current_units?: Units;
  // ... add other response parts as needed
}

// Interfaces for hourly and daily data
interface HourlyData {
  time: string[];
  wave_height: number[];
  wave_direction: number[];
  wave_period: number[];
  wind_wave_height: number[];
  wind_wave_direction: number[];
  wind_wave_period: number[];
  wind_wave_peak_period: number[];
  swell_wave_height: number[];
  swell_wave_direction: number[];
  swell_wave_period: number[];
  swell_wave_peak_period: number[];
}
interface DailyData {
  time: string[];
  wave_height_max: number[];
  wave_direction_dominant: number[];
  wave_period_max: number[];
  wind_wave_height_max: number[];
  wind_wave_direction_dominant: number[];
  wind_wave_period_max: number[];
  wind_wave_peak_period_max: number[];
  swell_wave_height_max: number[];
  swell_wave_direction_dominant: number[];
  swell_wave_period_max: number[];
  swell_wave_peak_period_max: number[];
}
interface CurrentData {
  time: string;
  interval: number;
  wave_height: number;
  wave_direction: number;
  wave_period: number;
  wind_wave_height: number;
  wind_wave_direction: number;
  wind_wave_period: number;
  wind_wave_peak_period: number;
  swell_wave_height: number;
  swell_wave_direction: number;
  swell_wave_period: number;
  swell_wave_peak_period: number;
}
interface Units {
  time?: string; // ISO8601 format for time
  interval?: string; // Interval in seconds (for current data)
  wave_height?: string; // Wave height in meters
  wave_direction?: string; // Wave direction in degrees
  wave_period?: string; // Wave period in seconds
  wind_wave_height?: string; // Wind wave height in meters
  wind_wave_direction?: string; // Wind wave direction in degrees
  wind_wave_period?: string; // Wind wave period in seconds
  wind_wave_peak_period?: string; // Wind wave peak period in seconds
  swell_wave_height?: string; // Swell wave height in meters
  swell_wave_direction?: string; // Swell wave direction in degrees
  swell_wave_period?: string; // Swell wave period in seconds
  swell_wave_peak_period?: string; // Swell wave peak period in seconds
  // Daily-specific units
  wave_height_max?: string; // Maximum wave height in meters (for daily data)
  wave_direction_dominant?: string; // Dominant wave direction in degrees (for daily data)
  wave_period_max?: string; // Maximum wave period in seconds (for daily data)
  wind_wave_height_max?: string; // Maximum wind wave height in meters (for daily data)
  wind_wave_direction_dominant?: string; // Dominant wind wave direction in degrees (for daily data)
  wind_wave_period_max?: string; // Maximum wind wave period in seconds (for daily data)
  wind_wave_peak_period_max?: string; // Maximum wind wave peak period in seconds (for daily data)
  swell_wave_height_max?: string; // Maximum swell wave height in meters (for daily data)
  swell_wave_direction_dominant?: string; // Dominant swell wave direction in degrees (for daily data)
  swell_wave_period_max?: string; // Maximum swell wave period in seconds (for daily data)
  swell_wave_peak_period_max?: string; // Maximum swell wave peak period in seconds (for daily data)
}

// SDK class
class MarineApiSdk {
  private baseUrl: string = 'https://marine-api.open-meteo.com/v1/marine';

  constructor(private httpClient = axios) {
    // Allows for injecting a mock HTTP client for testing
  }

  // Constructs the URL for the API request
  private constructUrl(
    latitude: number,
    longitude: number,
    forecastType: 'hourly' | 'daily' | 'current',
    parameters: string[],
  ): string {
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error('Invalid latitude or longitude values.');
    }
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      [forecastType]: parameters.join(','),
    });
    return `${this.baseUrl}?${params.toString()}`;
  }

  // Method for hourly forecast request
  public async getHourlyForecast(
    latitude: number,
    longitude: number,
    parameters: string[],
  ): Promise<MarineApiResponse> {
    if (parameters.length === 0) {
      throw new Error(
        'At least one parameter is required for the hourly forecast.',
      );
    }
    const url = this.constructUrl(latitude, longitude, 'hourly', parameters);
    try {
      const response = await axios.get<MarineApiResponse>(url);
      return response.data;
    } catch (error) {
      // Handle or rethrow the error as needed
      throw error;
    }
  }

  // Method for daily forecast request
  public async getDailyForecast(
    latitude: number,
    longitude: number,
    parameters: string[],
  ): Promise<MarineApiResponse> {
    if (parameters.length === 0) {
      throw new Error(
        'At least one parameter is required for the daily forecast.',
      );
    }

    const url = this.constructUrl(latitude, longitude, 'daily', parameters);
    try {
      const response = await axios.get<MarineApiResponse>(url);
      return response.data;
    } catch (error) {
      // Handle or rethrow the error as needed
      throw error;
    }
  }

  // Method for current forecast request
  public async getCurrentForecast(
    latitude: number,
    longitude: number,
    parameters: string[],
  ): Promise<MarineApiResponse> {
    if (parameters.length === 0) {
      throw new Error(
        'At least one parameter is required for the current forecast.',
      );
    }

    const url = this.constructUrl(latitude, longitude, 'current', parameters);
    try {
      const response = await axios.get<MarineApiResponse>(url);
      return response.data;
    } catch (error) {
      // Handle or rethrow the error as needed
      throw error;
    }
  }
}

export default MarineApiSdk;
