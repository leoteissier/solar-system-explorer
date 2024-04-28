import { PlanetRender } from '../interfaces/render';

export const preprocessDataRender = (data: PlanetRender[]): PlanetRender[] => {
    let processedData: PlanetRender[] = [];

    data.forEach(item => {
        const baseBody: PlanetRender = {
            ...item,
        };

        // Push the planet or star
        processedData.push(baseBody);

        // If it has satellites, push each one as well, adding parent information
        if (item.satellites) {
            item.satellites.forEach((satellite: any) => {
                processedData.push({
                    ...satellite,
                    parentPlanet: item.name // Link back to the parent planet
                });
            });
        }
    });

    return processedData;
};

export default preprocessDataRender;
