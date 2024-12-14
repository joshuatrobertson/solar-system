import * as THREE from 'three';

// Function to create a starry background with circular stars using points
export function createStarField(scene) {
    const numStars = 10000;
    const positions = new Float32Array(numStars * 3);

    for (let i = 0; i < numStars; i++) {
        positions[i * 3] = Math.random() * 15000 - 10000;
        positions[i * 3 + 1] = Math.random() * 15000 - 10000;
        positions[i * 3 + 2] = Math.random() * 15000 - 10000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create a material with circular stars by adjusting the point size
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,  // Increase the size for larger stars
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
}
