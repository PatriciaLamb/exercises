class WeatherClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.weather.com/v1';
  }

  async getWeather(city) {
    if (!city) {
      throw new Error('City is required');
    }

    const response = await fetch(
      `${this.baseUrl}/weather?city=${city}&apiKey=${this.apiKey}`
    );

    if (response.status === 404) {
      throw new Error(`City not found: ${city}`);
    }

    if (response.status === 401) {
      throw new Error('Invalid API key');
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      city: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity
    };
  }

  async getForecast(city, days = 3) {
    if (!city) {
      throw new Error('City is required');
    }

    if (days < 1 || days > 7) {
      throw new Error('Days must be between 1 and 7');
    }

    const response = await fetch(
      `${this.baseUrl}/forecast?city=${city}&days=${days}&apiKey=${this.apiKey}`
    );

    // Hinweis: Vereinfachtes Error-Handling für die Übung
    // In Produktion würdest du auch hier spezifische Status-Codes prüfen (404, 401, etc.)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.forecast.map(day => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      condition: day.day.condition.text
    }));
  }
}

module.exports = WeatherClient;
