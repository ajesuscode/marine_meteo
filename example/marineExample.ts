import OpenMarine from '../src/openMarine';

const marine = new OpenMarine();

async function getHourlyForecast() {
  try {
    const forecast = await marine.getHourly(54.3213, 10.1348, ['wave_period']);
    console.log('Hourly Marine Forecast:', forecast);
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
  }
}

getHourlyForecast();

async function getCurrentMarineForecast() {
  try {
    const current = await marine.getCurrent(54.3213, 10.1348, [
      'wave_height',
      'wave_direction',
      'wave_period',
    ]);
    console.log('Current Marine Forecast:', current);
  } catch (err) {
    console.log('Error fetching current forecast:', err);
  }
}

getCurrentMarineForecast();
