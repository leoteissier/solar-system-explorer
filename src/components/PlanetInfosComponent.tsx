import { useEffect, useState } from "react";
import celestialBodyData from "../utils/preprocessDataInfos.ts";
import {
    CelestialBody,
    StarInfo,
    PlanetInfo,
    SatelliteInfo,
    isStar,
    isPlanet,
    isSatellite
} from '../interfaces/infos.ts';

const PlanetInfosComponent =  ({ planetName }: { planetName: string }) => {
    const [inProp, setInProp] = useState(false);
    const body: CelestialBody = celestialBodyData[planetName];

    useEffect(() => {
        setInProp(true);
        const timer = setTimeout(() => setInProp(false), 300);
        return () => clearTimeout(timer);
    }, [planetName]);

    if (!body) return <div>Information not found for {planetName}</div>;

    const renderStarInfo = (star: StarInfo) => (
        <div>
            <h2>{star.name}</h2>
            <p>{star.description}</p>
        </div>
    );

    const renderPlanetInfo = (planet: PlanetInfo) => (
        <div>
            <h2>{planet.name}</h2>
            <p>{planet.description}</p>
        </div>
    );

    const renderSatelliteInfo = (satellite: SatelliteInfo) => (
        <div>
            <h2>{satellite.name}</h2>
            <p>{satellite.description}</p>
        </div>
    );

    return (
        <div className={`planet-infos ${inProp ? 'fade-in' : 'fade-out'}`}>
            {isStar(body) && renderStarInfo(body as StarInfo)}
            {isPlanet(body) && renderPlanetInfo(body as PlanetInfo)}
            {isSatellite(body) && renderSatelliteInfo(body as SatelliteInfo)}
        </div>
    );
};

export default PlanetInfosComponent;