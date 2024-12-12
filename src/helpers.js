import * as THREE from 'three';

export function addAxesHelper(scene) {
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
}
