import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

import CameraControllerComponent from '../components/CameraControllerComponent';
import PlanetComponent from '../components/PlanetComponent';
import PlanetInfosComponent from "../components/PlanetInfosComponent";
import handleScroll from "../utils/handleScroll.ts";
import preprocessDataRender from "../utils/preprocessDataRender.ts"
import planetsRender from '../data/planetsRender.json';
import './App.css';

const App = () => {
    const [currentSection, setCurrentSection] = useState<number>(0);
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [loaded, setLoaded] = useState(false);
    const [_, setLoadStates] = useState(new Array(planetsRender.length).fill(false));

    const processedPlanetsData = preprocessDataRender(planetsRender as any[]);

    useEffect(() => {
        const onScroll = (event: Event) => {
            if (canScroll) {
                setCanScroll(false);
                handleScroll(event, setCurrentSection, processedPlanetsData);
                setTimeout(() => setCanScroll(true), 1500);
            }
        };

        window.addEventListener('wheel', onScroll);
        return () => window.removeEventListener('wheel', onScroll);
    }, [canScroll, currentSection]);

    useEffect(() => {
        setSelectedPlanet(currentSection > 0 ? processedPlanetsData[currentSection - 1].name : null);
    }, [currentSection]);

    const handleTextureLoaded = (index: number) => {
        setLoadStates(prevLoadStates => {
            const newLoadStates = [...prevLoadStates];
            newLoadStates[index] = true;

            // Check if all textures are loaded
            if (newLoadStates.every(state => state)) {
                setTimeout(() => setLoaded(true), 1000); // Extra delay to ensure all textures are fully processed
            }

            return newLoadStates;
        });
    };

    return (
        <main id="app">
            <div id="loader" style={{ display: loaded ? 'none' : 'block' }}>
                <div className="loader"></div>
            </div>
            <div id="render" style={{ visibility: loaded ? 'visible' : 'hidden' }}>
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 0, 5]} intensity={1} />
                    <Stars radius={300} depth={50} count={10000} factor={10} saturation={10} fade speed={1} />
                    <group name="solar-system">
                        {planetsRender.map((planet, index) => (
                            <PlanetComponent
                                key={index}
                                index={index}
                                {...planet}
                                setLoaded={handleTextureLoaded}
                            />
                        ))}
                    </group>
                    <CameraControllerComponent currentSection={currentSection} planetsData={processedPlanetsData} />
                </Canvas>
                {selectedPlanet && currentSection !== 0 && <PlanetInfosComponent planetName={selectedPlanet} />}
            </div>
        </main>
    );
};
export default App;