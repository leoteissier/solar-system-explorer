import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { Ring } from '@react-three/drei';
import { RingRender } from "../interfaces/render.ts";

const RingComponent = ({
innerRadius,
    name,
    outerRadius,
    textureUrl,
    setLoaded,
    index
}: RingRender & { setLoaded: (index: number) => void, index: number }) => {
    const ringTexture = useLoader(THREE.TextureLoader, textureUrl, (loader) => {
        loader.load(textureUrl, _ => {
            setLoaded(index);
        }, undefined, error => {
            console.error(`Error loading texture for ${name}:`, error);
        });
    });

    return (
        <Ring name={name + '-Ring'} args={[innerRadius, outerRadius, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial map={ringTexture} side={THREE.DoubleSide}/>
        </Ring>
    );
}


export default RingComponent;