import * as THREE from 'three';

export const sunRadius = 8;

export function createSun() {
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load('/sun_texture.png');

    // Create the sun's material with emissive properties and the texture
    const sunMaterial = new THREE.MeshStandardMaterial({
        map: sunTexture,
        emissive: 0xFFFF00,
        emissiveIntensity: 1,
        roughness: 1,
        metalness: 0,
        emissiveMap: sunTexture,    // Ensures the emissive part uses the same texture
    });

    // Create a sphere to represent the sun
    const sunGeometry = new THREE.SphereGeometry(sunRadius, 32, 32); // Larger sphere for Sun
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // Create a PointLight at the center of the Sun sphere so it shines in all directions
    const pointLight = new THREE.PointLight(0xffffff, 400, 100000000);  // Color, intensity, distance
    pointLight.position.set(0, 0, 0); // Position the point light at the center of the Sun
    sun.add(pointLight);  // Add the point light to the Sun mesh

    return sun;
}
