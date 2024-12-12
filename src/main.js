import * as THREE from 'three';
import { scene } from './scene.js';
import { camera } from './camera.js';
import { createSun } from './sun.js';
import { addLights } from './lights.js';
import { createEarth } from './planets/earth.js';
import { addAxesHelper } from './helpers.js';

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add Sun and Earth
const sun = createSun();
scene.add(sun);

const earth = createEarth();
scene.add(earth);

// Add Lights and Axes
addLights(scene);
addAxesHelper(scene);

// Time scale to adjust speed of both rotation and orbit
let timeScale = 20000; // Speed multiplier

// Constants
const earthYearInSeconds = 365.25 * 24 * 60 * 60; // Earth's year in seconds
const earthDayInSeconds = 24 * 60 * 60; // Earth's day in seconds

// Orbital Parameters
const orbitalParams = {
    earth: {
        radius: 10, // Distance from the Sun (scaled down)
        theta: 0, // Initial angle in the orbit
        angularSpeed: (2 * Math.PI) / earthYearInSeconds, // Orbital speed (radians/second)
        rotationSpeed: (2 * Math.PI) / earthDayInSeconds, // Rotational speed (radians/second)
        tilt: 23.5 * (Math.PI / 180), // Axial tilt in radians
    },
};

// Create a pivot point for Earth's orbit
const earthOrbit = new THREE.Object3D();
scene.add(earthOrbit);
earthOrbit.add(earth);

// Set Earth's tilt
earth.rotation.x = orbitalParams.earth.tilt;

// Position the Earth initially at the orbit's radius
earth.position.set(orbitalParams.earth.radius, 0, 0);

// Constants for easier reference
const expectedRotationsPerOrbit = 365;  // Earth should rotate 365 times per orbit

// Track the Earth's current axial rotation (reset after 360 degrees)
let currentEarthRotation = 0;
let totalEarthRotations = 0;  // This tracks the total rotations for one full orbit

// Track the total orbital progress
let totalOrbitProgress = 0;

// Function to validate and log after one full orbit
function validateRotationsDuringOrbit() {
    // Log the total rotations after one full cycle
    console.log(`Total Earth rotations after one orbit: ${totalEarthRotations}`);

    // Check if Earth completed 365 rotations after one full orbit around the Sun
    if (Math.abs(totalEarthRotations - expectedRotationsPerOrbit) < 1) {
        console.log("Validation: Earth has completed 365 rotations as expected.");
    } else {
        console.log("Validation: Earth has NOT completed the correct number of rotations.");
    }

    // Reset for next orbit
    totalEarthRotations = 0;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Update time step
    const deltaTime = timeScale * (1 / 60); // Assuming 60fps

    // Update Earth's orbital position
    orbitalParams.earth.theta += orbitalParams.earth.angularSpeed * deltaTime;
    earthOrbit.rotation.y = orbitalParams.earth.theta;

    // Update Earth's axial rotation (1 full rotation per day)
    currentEarthRotation += orbitalParams.earth.rotationSpeed * deltaTime;

    // Log each full rotation (when Earth completes 360 degrees)
    if (currentEarthRotation >= 2 * Math.PI) {
        currentEarthRotation -= 2 * Math.PI; // Reset after one full rotation
        totalEarthRotations += 1; // Increment the total rotations after a full day
        console.log(`Earth completed a full rotation! Total rotations: ${totalEarthRotations}`);
    }

    earth.rotation.y = currentEarthRotation;

    // Check if the Earth has completed one full orbit (360 degrees)
    if (orbitalParams.earth.theta >= 2 * Math.PI) {
        // Reset Earth's position after one full orbit
        orbitalParams.earth.theta -= 2 * Math.PI;

        // Validate and reset total rotations after one full cycle around the Sun
        validateRotationsDuringOrbit();
    }

    // Render Scene
    renderer.render(scene, camera);
}

animate();
