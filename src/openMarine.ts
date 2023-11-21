import axios, { AxiosInstance } from 'axios';
import { MarineApiResponse } from '../types/marineTypes';

// SDK class
class OpenMarine {
  private baseUrl: string = 'https://marine-api.open-meteo.com/v1/marine';
  private httpClient: AxiosInstance;

  constructor(httpClient = axios) {
    this.httpClient = httpClient;
  }

  private validateCoordinates(latitude: number, longitude: number): void {
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error('Invalid latitude or longitude values.');
    }
  }

  private validateParameters(parameters: string[]): void {
    if (parameters.length === 0) {
      throw new Error('At least one parameter is required for the forecast.');
    }
  }

  private async fetchForecast(
    latitude: number,
    longitude: number,
    forecastType: 'hourly' | 'daily' | 'current',
    parameters: string[],
  ): Promise<MarineApiResponse> {
    this.validateCoordinates(latitude, longitude);
    this.validateParameters(parameters);

    const url = new URL(this.baseUrl);
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append(forecastType, parameters.join(','));

    try {
      const response = await this.httpClient.get<MarineApiResponse>(
        url.toString(),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching ${forecastType} forecast: ${error}`);
    }
  }

  public getHourly(
    latitude: number,
    longitude: number,
    parameters: string[],
  ): Promise<MarineApiResponse> {
    return this.fetchForecast(latitude, longitude, 'hourly', parameters);
  }

  public getDaily(
    latitude: number,
    longitude: number,
    parameters: string[],
  ): Promise<MarineApiResponse> {
    return this.fetchForecast(latitude, longitude, 'daily', parameters);
  }

  public getCurrent(
    latitude: number,
    longitude: number,
    parameters: string[],
  ): Promise<MarineApiResponse> {
    return this.fetchForecast(latitude, longitude, 'current', parameters);
  }
}

export default OpenMarine;
