import * as THREE from 'three';

export function createEarth() {
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Earth geometry
    const textureLoader = new THREE.TextureLoader();

    // Load a texture with stripes (you can replace this with your own image)
    const earthTexture = textureLoader.load('/public/earth.webp');

    // Apply the texture to the Earth's material
    const earthMaterial = new THREE.MeshStandardMaterial({
        map: earthTexture,  // Set the texture as the diffuse map
        roughness: 1,
        metalness: 0,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    // Position Earth relative to the Sun
    earth.position.set(10, 0, 0); // 10 units along the X-axis

    // Enable shadow casting and receiving
    earth.castShadow = true;
    earth.receiveShadow = true;

    return earth;
}
