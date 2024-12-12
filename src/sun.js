import * as THREE from 'three';

export function createSun() {
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffcc00,
        emissiveIntensity: 1,
    });

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.castShadow = true;
    return sun;
}
