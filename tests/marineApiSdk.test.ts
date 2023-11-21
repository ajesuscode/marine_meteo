// tests/marineApiSdk.test.ts

import OpenMarine from '../src/openMarine';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpenMarine getHourly', () => {
  const sdk = new OpenMarine(mockedAxios);

  it('should fetch hourly forecast data successfully', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        hourly: {
          time: ['2023-11-21T00:00', '2023-11-21T01:00'],
          wave_height: [1.2, 1.3],
          wave_direction: [45, 50],
          wave_period: [5.5, 6.0],
        },
      },
    });

    const response = await sdk.getHourly(54, 10, ['wave_height']);
    expect(response.hourly).toBeDefined();
    if (response.hourly) {
      expect(response.hourly.time).toEqual([
        '2023-11-21T00:00',
        '2023-11-21T01:00',
      ]);
      expect(response.hourly.wave_height).toEqual([1.2, 1.3]);
    }
  });

  it('should throw an error for invalid latitude or longitude in hourly forecast', async () => {
    await expect(sdk.getHourly(-100, 10, ['wave_height'])).rejects.toThrow(
      'Invalid latitude or longitude values.',
    );
  });

  it('should handle network errors for hourly forecast', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));
    await expect(sdk.getHourly(54, 10, ['wave_height'])).rejects.toThrow(
      'Network Error',
    );
  });

  it('should throw an error when no parameters are provided for hourly forecast', async () => {
    await expect(sdk.getHourly(54, 10, [])).rejects.toThrow(
      'At least one parameter is required for the forecast.',
    );
  });
});

describe('OpenMarine getDaily', () => {
  const sdk = new OpenMarine(mockedAxios);

  it('should fetch daily forecast data successfully', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        daily: {
          time: ['2023-11-21', '2023-11-22'],
          wave_height_max: [2.0, 2.5],
          wave_direction_dominant: [90, 95],
          wave_period_max: [7.0, 8.0],
        },
      },
    });

    const response = await sdk.getDaily(54, 10, ['wave_height_max']);
    expect(response.daily).toBeDefined();
    if (response.daily) {
      expect(response.daily.time).toEqual(['2023-11-21', '2023-11-22']);
      expect(response.daily.wave_height_max).toEqual([2.0, 2.5]);
    }
  });

  it('should throw an error when no parameters are provided for hourly forecast', async () => {
    await expect(sdk.getHourly(54, 10, [])).rejects.toThrow(
      'At least one parameter is required for the forecast.',
    );
  });

  it('should handle errors in hourly forecast API call', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    await expect(sdk.getDaily(54, 10, ['wave_height'])).rejects.toThrow(
      'API Error',
    );
  });
});

describe('OpenMarine getCurrent', () => {
  const sdk = new OpenMarine(mockedAxios);

  it('should fetch current forecast data successfully', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        current: {
          time: '2023-11-21T11:00',
          interval: 3600,
          wave_height: 1.5,
          wave_direction: 65,
          wave_period: 6.5,
        },
      },
    });

    const response = await sdk.getCurrent(54, 10, ['wave_height']);
    expect(response.current).toBeDefined();
    if (response.current) {
      expect(response.current.time).toEqual('2023-11-21T11:00');
      expect(response.current.wave_height).toEqual(1.5);
    }
  });

  it('should throw an error when no parameters are provided for hourly forecast', async () => {
    await expect(sdk.getHourly(54, 10, [])).rejects.toThrow(
      'At least one parameter is required for the forecast.',
    );
  });

  it('should handle errors in current forecast API call', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    await expect(sdk.getCurrent(54, 10, ['wave_height'])).rejects.toThrow(
      'API Error',
    );
  });
});
