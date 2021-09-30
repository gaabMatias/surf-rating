import { StormGlass } from '@src/clients/stormGlass';
import stormglassNormalizedResponseFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import * as stormglassWeatherPointFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import axios from 'axios';

jest.mock('@src/util/request');
jest.mock('@src/util/cache');

describe('StormGlass client', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>

    it('should return normalized forecast from stormGlass service', async () => {
        const latitude = -33.792726;
        const longitude = 151.289824;

        mockedAxios.get.mockResolvedValue({ data: stormglassWeatherPointFixture });

        const stormGlass = new StormGlass(mockedAxios);
        const response = await stormGlass.fetchPoints(latitude, longitude);
        expect(response).toEqual(stormglassNormalizedResponseFixture);
    })
})