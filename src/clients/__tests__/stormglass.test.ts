import { StormGlass } from '@src/clients/stormGlass'


describe('StormGlass client', () => {
    it('should return normalized forecast from stormGlass service', async () => {
        const lat = -33.792726;
        const lng = 151.289824;

        mockedAxios.get.mockResolvedValue({ data: stormglassWeatherPointFixture });

        const stormGlass = new StormGlass(mockedAxios);
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual(stormglassNormalizedResponseFixture);
    })
})