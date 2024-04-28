import { useRef } from 'react';
import * as THREE from 'three';
import { Mesh } from "three";
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { PlanetRender } from "../interfaces/render.ts";
import SatelliteComponent from "./SatelliteComponent";
import RingComponent from "./RingComponent";

const PlanetComponent = ({
    name,
    textureUrl,
    size,
    orbitalAngle,
    orbitRadius,
    orbitalSpeed,
    rotationAxis,
    satellites,
    ring,
    setLoaded,
    index
}: PlanetRender & { setLoaded: (index: number) => void, index: number }) => {
    const planetRef = useRef<Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const orbitAngleRef = useRef(orbitalAngle);

    const planetTexture = useLoader(THREE.TextureLoader, textureUrl, (loader) => {
        loader.load(textureUrl, _ => {
            setLoaded(index);
        }, undefined, error => {
            console.error(`Error loading texture for ${name}:`, error);
        });
    });



    const scale = 0.001;
    useFrame(() => {
        if (groupRef.current && planetRef.current) {
            const angle = orbitAngleRef.current += orbitalSpeed * scale;
            groupRef.current.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);
            planetRef.current.rotateOnAxis(new THREE.Vector3(...rotationAxis), scale);
        }
    });

    return (
        <group ref={groupRef} name={name}
               position={[Math.cos(orbitalAngle) * orbitRadius, 0, Math.sin(orbitalAngle) * orbitRadius]}>
            <Sphere ref={planetRef} scale={[size, size, size]} args={[1, 64, 64]}>
                <meshStandardMaterial map={planetTexture}/>
            </Sphere>
            {ring && <RingComponent {...ring} setLoaded={() => setLoaded(index)} index={index} />}
            {satellites?.map((satellite, idx) => (
                <SatelliteComponent key={idx} {...satellite} setLoaded={() => setLoaded(index)} index={index} />
            ))}
        </group>
    );
};

export default PlanetComponent;
