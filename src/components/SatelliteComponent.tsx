import { useRef } from 'react';
import * as THREE from 'three';
import { Mesh } from "three";
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { SatelliteRender } from "../interfaces/render.ts";

const SatelliteComponent = ({
    name,
    textureUrl,
    size,
    orbitalAngle,
    orbitRadius,
    orbitalSpeed,
    rotationAxis,
    setLoaded,
    index
}: SatelliteRender & { setLoaded: (index: number) => void, index: number }) => {
    const satelliteRef = useRef<Mesh>(null);
    const satelliteOrbitAngleRef = useRef(orbitalAngle);

    const satelliteTexture = useLoader(THREE.TextureLoader, textureUrl, (loader) => {
        loader.load(textureUrl, _ => {
            setLoaded(index);
        }, undefined, error => {
            console.error(`Error loading texture for ${name}:`, error);
        });
    });

    useFrame(() => {
        if (satelliteRef.current) {
            satelliteOrbitAngleRef.current += orbitalSpeed * 0.01;
            satelliteRef.current.position.x = Math.cos(satelliteOrbitAngleRef.current) * orbitRadius;
            satelliteRef.current.position.z = Math.sin(satelliteOrbitAngleRef.current) * orbitRadius;
            satelliteRef.current.rotateOnAxis(new THREE.Vector3(...rotationAxis), 0.01);
        }
    });

    return (
        <Sphere name={name} ref={satelliteRef} args={[size, 32, 32]}>
            <meshStandardMaterial map={satelliteTexture} />
        </Sphere>
    );
};

export default SatelliteComponent;
