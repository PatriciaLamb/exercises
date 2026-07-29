const WeatherClient = require('./weatherClient');

describe('WeatherClient', () => {
  let client;

  beforeEach(() => {
    client = new WeatherClient('test-api-key');
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  function testJson(name, temp, condition, humidity) {
    return {
      location: { name: name },
      current: {
        temp_c: temp,
        condition: { text: condition },
        humidity: humidity
      }
    }
  }


  describe('getWeather', () => {
    // TODO: Write a test for successful weather fetch
    // Tip: Mock fetch with mockResolvedValue, use async/await
    // Example response structure:
    // {
    //   location: { name: 'Berlin' },
    //   current: {
    //     temp_c: 22,
    //     condition: { text: 'Sunny' },
    //     humidity: 45
    //   }
    // }
    test('fetch weather successful', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => testJson('Berlin', 22, 'Sunny', 45)
      });

      const response = await client.getWeather('Berlin');

      expect(response).toEqual({
        city: 'Berlin',
        temperature: 22,
        condition: 'Sunny',
        humidity: 45
      });
    });

    // TODO: Write a test that verifies fetch is called with the correct URL
    // Tip: expect(fetch).toHaveBeenCalledWith(...)
    test('verifies correct URL is called', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => testJson('Berlin')
      });

      await client.getWeather('Berlin');
      expect(fetch).toHaveBeenCalledWith(
        'https://api.weather.com/v1/weather?city=Berlin&apiKey=test-api-key'
      );
    });

    // TODO: Write a test that checks an error is thrown when city is missing
    // Tip: await expect(client.getWeather()).rejects.toThrow('City is required')
    test('check for error if city is missing', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => testJson(null)
      });
      await expect(client.getWeather()).rejects.toThrow('City is required');
      await expect(client.getWeather('')).rejects.toThrow('City is required');
      await expect(client.getWeather(null)).rejects.toThrow('City is required');
    })

    // TODO: Write a test for 404 error (City not found)
    // Tip: Mock fetch with { ok: false, status: 404 }
    test('404 city not found', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(client.getWeather('TestCity')).rejects.toThrow('City not found: TestCity')
    })

    // TODO: Write a test for 401 error (Invalid API key)
    test('invalid API Key 401', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 401
      });

      await expect(client.getWeather('Berlin')).rejects.toThrow('Invalid API key')
    })

    // TODO: Write a test for other API errors (e.g. 500)
    test('other API errors', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500
      });

      await expect(client.getWeather('Berlin')).rejects.toThrow('API error: 500')
    })
  });

  describe('getForecast', () => {
    // TODO: Write a test for successful forecast fetch
    // Tip: Mock response should contain a forecast array
    test('successful forecast fetch for valid city and days', async () => {
      const mockForecast = {
        forecast: [
          {
            date: '2026-01-01',
            day: {
              maxtemp_c: 8,
              mintemp_c: 2,
              condition: {
                text: 'Cloudy'
              }
            }
          },
          {
            date: '2026-01-03',
            day: {
              maxtemp_c: 4,
              mintemp_c: 1,
              condition: {
                text: 'Rainy'
              }
            }
          }
        ]
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockForecast
      });

      const forecast = await client.getForecast('Berlin', 2);

      expect(forecast[1]).toEqual({
        date: '2026-01-03',
        maxTemp: 4,
        minTemp: 1,
        condition: 'Rainy'
      });
    })

    // TODO: Write a test that verifies days=3 is used as default
    test('verifies that days=3 is used as default', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ forecast: [] })
      });

      await client.getForecast('Berlin');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('days=3')
      )
    })

    // TODO: Write tests for invalid days values (< 1 or > 7)
    test('throws error when days is less than 1', async () => {

      await expect(client.getForecast('Berlin', 0)).rejects.toThrow(
        'Days must be between 1 and 7'
      );
    });

    test('throws error when days is greater than 7', async () => {

      await expect(client.getForecast('Berlin', 8)).rejects.toThrow(
        'Days must be between 1 and 7'
      );
    });

    // TODO: Write a test that checks an error is thrown when city is missing
    test('throws error when city is missing', async () => {

      await expect(client.getForecast()).rejects.toThrow('City is required');
    });
  });
});
