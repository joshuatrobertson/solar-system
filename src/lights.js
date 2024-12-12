import * as THREE from "three";

export function addLights(scene) {
    // Ambient Light for soft overall lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft light in all directions
    scene.add(ambientLight);

    // PointLight for the Sun (emits light in all directions)
    const sunLight = new THREE.PointLight(0xffcc00, 1.5, 100); // Color, intensity, and distance
    sunLight.position.set(0, 10, 0); // Position the Sun
    sunLight.castShadow = true;

    // Shadow settings for the PointLight
    sunLight.shadow.mapSize.width = 1024; // Shadow resolution
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.1; // Shadow camera near plane
    sunLight.shadow.camera.far = 50; // Shadow camera far plane
    sunLight.shadow.camera.left = -50; // Adjust shadow camera bounds
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;



    scene.add(sunLight);
}
