<p align="center">
  <img src="images/marine_meteo_logo.png" width="250" height="280" alt="open_marine_logo">
</p

# Open Meteo Marine SDK

## Introduction

**Opensource Marine Data API wrapper for [Open Meteo](https://open-meteo.com/) with Typescript support**

OpenMarine is designed to simplify access to marine weather data from [Open Meteo](https://open-meteo.com/).
OpenMarine offers an easy-to-use interface to fetch real-time marine weather information.

## Getting Started

### Installation

Install OpenMarine using npm:

```bash
npm install marine_meteo
```

### Basic Setup

To start using OpenMarine, import it into your project:

```typescript
import OpenMarine from 'marine_meteo';
```

### Usage Examples

#### Fetching Hourly Forecast

Retrieve hourly marine weather data:

```typescript
const marine = new OpenMarine();

async function getHourlyData() {
  try {
    const data = await marine.getHourly(54.3213, 10.1348, ['wave_height']);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getHourlyData();
```

#### Fetching Daily and Current Forecasts

Similar to the hourly forecast, you can fetch daily and current forecasts:

```typescript
// Daily Forecast
async function getDailyData() {
  const data = await marine.getDaily(54.3213, 10.1348, ['wave_height_max']);
  // Process data...
}

// Current Forecast
async function getCurrentData() {
  const data = await marine.getCurrent(54.3213, 10.1348, ['wave_height']);
  // Process data...
}
```

## API Reference

The API functions require latitude, longitude, and at least one parameter from the available options. These parameters are necessary for fetching specific marine weather data. The available parameters for each data type are listed below.

### `getDaily(latitude: number, longitude: number, parameters: string[]): Promise<MarineApiResponse>`

- **Functionality**: Fetches hourly marine weather data.
- **Parameters**:
  - `latitude` (required): Latitude of the location.
  - `longitude` (required): Longitude of the location.
  - `parameters` (required): Array of strings indicating the desired data.
- **Returns**: A promise that resolves to the hourly forecast data.
- **Available Parameters for Hourly Data**:
  - `wave_height`
  - `wave_direction`
  - `wave_period`
  - `wind_wave_height`
  - `wind_wave_direction`
  - `wind_wave_period`
  - `wind_wave_peak_period`
  - `swell_wave_height`
  - `swell_wave_direction`
  - `swell_wave_period`
  - `swell_wave_peak_period`

### `getDaily(latitude:number, longitude:number, parameters: string[]): Promise<MarineApiResponse>`

- **Functionality**: Fetches daily marine weather data.
- **Parameters**: Similar to `getHourly`.
- **Available Parameters for Daily Data**:
  - `wave_height_max`
  - `wave_direction_dominant`
  - `wave_period_max`
  - `wind_wave_height_max`
  - `wind_wave_direction_dominant`
  - `wind_wave_period_max`
  - `wind_wave_peak_period_max`
  - `swell_wave_height_max`
  - `swell_wave_direction_dominant`
  - `swell_wave_period_max`
  - `swell_wave_peak_period_max`

### `getCurrent(latitude:number, longitude:number, parameters:string[]): Promise<MarineApiResponse>`

- **Functionality**: Fetches current marine weather data.
- **Parameters**: Similar to `getHourly`.
- **Available Parameters for Current Data**:
  - `interval`
  - `wave_height`
  - `wave_direction`
  - `wave_period`
  - `wind_wave_height`
  - `wind_wave_direction`
  - `wind_wave_period`
  - `wind_wave_peak_period`
  - `swell_wave_height`
  - `swell_wave_direction`
  - `swell_wave_period`
  - `swell_wave_peak_period`

## Contributing

This project is open source and we welcome contributions. Here are some ways you can contribute:

- **Bug Reports**: If you find a bug or a mistake, please report it by opening an issue. Include as much detail as possible to help us understand and reproduce the issue.
- **Feature Requests**: If you have an idea for a new feature or an improvement to an existing feature, please open an issue to discuss it. Be sure to explain in detail what you want and why it would be useful.
- **Pull Requests**: If you have made a change to the code, please open a pull request. Include a detailed explanation of your changes in the description.

### For more information and details you can check [Open Meteo](https://open-meteo.com/)
