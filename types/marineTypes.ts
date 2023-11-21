// Interface for the common response parts
export interface MarineApiResponse {
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
export interface HourlyData {
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
export interface DailyData {
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
export interface CurrentData {
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
export interface Units {
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
