import planetsArray from '../data/planetsInfos.json'; // Adjust the path as necessary
import { CelestialBody } from '../interfaces/infos'; // Adjust the path as necessary

export const celestialBodyData: { [key: string]: CelestialBody } = planetsArray.reduce((acc: { [key: string]: CelestialBody }, planet: any) => {
    acc[planet.name] = planet;  // Add the planet
    if (planet.satellites) {
        planet.satellites.forEach((satellite: any) => {
            acc[satellite.name] = satellite;  // Add the satellite
        });
    }
    return acc;
}, {});

export default celestialBodyData;