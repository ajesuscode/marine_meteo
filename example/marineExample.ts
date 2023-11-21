import MarineApiSdk from '../src/marineApiSdk';

const marine = new MarineApiSdk();

async function getHourlyForecast() {
  try {
    const forecast = await marine.getHourlyForecast(54.3213, 10.1348, [
      'wave_period',
    ]);
    console.log('Hourly Marine Forecast:', forecast);
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
  }
}

getHourlyForecast();
