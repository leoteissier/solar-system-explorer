import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { easeInOutCubic } from "../utils/handleTransition.ts";
import { PlanetRender } from '../interfaces/render';

const CameraControllerComponent = ({ currentSection, planetsData }: { currentSection: number, planetsData: PlanetRender[] }) => {
    const { camera, gl, scene } = useThree();
    const controlsRef = useRef<OrbitControls | null>(null);
    const [startPosition, setStartPosition] = useState(new THREE.Vector3());
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = true;
        controlsRef.current = controls;

        return () => {
            controls.dispose();
        };
    }, [camera, gl.domElement]);

    // Update the camera position when the current section changes
    useEffect(() => {
        if (!controlsRef.current) return; // Ensure controls are set before attempting to use them

        setStartPosition(camera.position.clone());
        setProgress(0);

        if (currentSection === 0) {
            camera.position.set(0, 50, 300);
            controlsRef.current.target.set(0, 0, 0);
        } else {
            const targetData = planetsData[currentSection - 1];
            const targetObject = scene.getObjectByName(targetData.name);
            if (targetObject && targetData.cameraOffset !== undefined) {
                const targetPosition = new THREE.Vector3();
                targetObject.getWorldPosition(targetPosition);
                const offset = new THREE.Vector3(0, 0, targetData.cameraOffset);
                const cameraPosition = targetPosition.add(offset);
                camera.position.copy(cameraPosition);
                controlsRef.current.target.copy(targetPosition);
            }
        }
    }, [currentSection, planetsData, scene, camera]);


    useFrame((_, delta) => {
        const controls = controlsRef.current;
        if (controls) {
            if (currentSection !== 0) {
                const targetData = planetsData[currentSection - 1];
                const targetGroup = scene.getObjectByName(targetData.name);

                if (targetGroup) {
                    const targetPosition = new THREE.Vector3();
                    targetGroup.getWorldPosition(targetPosition);
                    controls.target.copy(targetPosition);

                    if (progress < 1) {
                        const p = progress + delta / 1.5;
                        setProgress(p);
                        const easedP = easeInOutCubic(p);
                        const offset = new THREE.Vector3(0, 0, targetData.cameraOffset);
                        const targetCameraPosition = targetPosition.clone().add(offset);
                        const newPos = new THREE.Vector3().lerpVectors(startPosition, targetCameraPosition, easedP);
                        camera.position.copy(newPos);
                    } else {
                        const offset = new THREE.Vector3(0, 0, targetData.cameraOffset);
                        camera.position.copy(targetPosition.clone().add(offset));
                    }
                }
            } else {
                // Handle transition back to the overview (solar system view)
                if (progress < 1) {
                    const p = Math.min(progress + delta / 1.5, 1);
                    setProgress(p);
                    const easedP = easeInOutCubic(p);
                    const newPos = new THREE.Vector3().lerpVectors(startPosition, new THREE.Vector3(0, 50, 300), easedP);
                    camera.position.copy(newPos);
                    controls.target.set(0, 0, 0);
                }
            }
            controls.update();
        }
    });

    return null;
};

export default CameraControllerComponent;