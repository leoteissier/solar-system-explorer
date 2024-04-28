export enum CelestialType {
    Star = "Etoile naine jaune",
    RockyPlanet = "Planète rocheuse",
    GasGiant = "Géante gazeuse",
    IceGiant = "Géante de glace",
    NaturalSatellite = "Satellite naturel"
}

export interface CelestialBody {
    name: string;
    type: CelestialType;
    description: string;
    diameter: string;
    mass: string;
    averageTemperature: string;
    rotationPeriod: string;
    composition: string;
    explorationMissions: string[] | string;
    notableFeature: string[] | string;
    atmosphereComposition: string;
    magneticField: string;
}

export interface StarInfo extends CelestialBody {
    type: CelestialType.Star;
}

export interface PlanetInfo extends CelestialBody {
    type: CelestialType.RockyPlanet | CelestialType.GasGiant | CelestialType.IceGiant;
    distanceFromSun: string;
    orbitalPeriod: string;
    lunes?: SatelliteInfo[];
}

export interface SatelliteInfo extends CelestialBody {
    type: CelestialType.NaturalSatellite;
    distanceFromParent: string;
    orbitalPeriod: string;
}

export function isStar(body: CelestialBody): body is StarInfo {
    return body.type === CelestialType.Star;
}

export function isPlanet(body: CelestialBody): body is PlanetInfo {
    return [CelestialType.RockyPlanet, CelestialType.GasGiant, CelestialType.IceGiant].includes(body.type);
}

export function isSatellite(body: CelestialBody): body is SatelliteInfo {
    return body.type === CelestialType.NaturalSatellite;
}
