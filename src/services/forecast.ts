import { StormGlass, ForecastPoint } from '@src/clients/stormGlass'
import e from 'express';

export enum BeachPosition {
    S = 'S',
    E = 'E',
    W = 'W',
    N = 'N'
}

export interface Beach {
    name: string;
    position: BeachPosition;
    latitude: number;
    longitude: number;
    user: string;
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint { }

export class Forecast {
    constructor(protected stormGlass = new StormGlass()) { }

    public async processForecastForBeaches(
        beaches: Beach[]
    ): Promise<BeachForecast> {
        const pointsWithCorrectSources: BeachForecast[] = [];
        for (const beach of beaches) {
            const points = await this.stormGlass.fetchPoints(beach.latitude, beach.longitude);
            const enrichedBeachData = points.map((e) => ({
                ...{},
                ...{
                    lat: beach.latitude,
                    lng: beach.longitude,
                    name: beach.name,
                    position: beach.position,
                    rating: 1
                },
                ...e
            }))
            pointsWithCorrectSources.push(...enrichedBeachData);
        }
        return pointsWithCorrectSources;
    }
}