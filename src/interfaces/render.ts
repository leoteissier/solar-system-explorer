// Définition de l'interface pour les textures et les axes de rotation
export interface globalRender {
    textureUrl: string;
    rotationAxis: number[];
}

// Interface pour les caractéristiques orbitales communes à tous les corps célestes
export interface OrbitalRender {
    orbitalAngle: number;
    orbitRadius: number;
    orbitalSpeed: number;
    cameraOffset: number;
}

// Extension des propriétés de rendu pour les satellites
export interface SatelliteRender extends globalRender, OrbitalRender {
    name: string;
    size: number;
}

// Interface pour les anneaux, spécifique aux planètes géantes gazeuses
export interface RingRender {
    name : string;
    textureUrl: string;
    innerRadius: number;
    outerRadius: number;
}

// Interface pour les planètes, combinant les propriétés de rendu, orbitales, et potentiellement des satellites et anneaux
export interface PlanetRender extends globalRender, OrbitalRender {
    name: string;
    size: number;
    satellites?: SatelliteRender[];
    ring?: RingRender;
}
