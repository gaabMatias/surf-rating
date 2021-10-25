import nock from 'nock';

import apiForecastResponse1Beach from '@test/fixtures/api_forecast_response_1_beach.json'
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json'
import { Beach, BeachPosition } from "@src/models/beach";



describe('Beach forecast functional tests', () => {
  beforeEach(async () => {
    await Beach.deleteMany({})
    const defaultBeach = {
      latitude: -33.792726,
      longitude: 151.289824,
      name: 'Manly',
      position: BeachPosition.E,
    }
    const beach = new Beach(defaultBeach);
    await beach.save();
  })
  it('should return a forecast with just a few times', async () => {
    nock('https://api.stormglass.io:443', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true,
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v2/weather/point')
      .query({
        lat: '-33.792726',
        lng: '151.289824',
        params: /(.*)/,
        source: 'noaa',
      })
      .reply(200, stormGlassWeather3HoursFixture);
    const { body, status } = await global.testRequest.get('/forecast');
    expect(status).toBe(200);
    // Make sure we use toEqual to check value not the object and array itself
    expect(body).toEqual(apiForecastResponse1Beach);
  });
});
