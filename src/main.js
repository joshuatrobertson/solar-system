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
let timeScale = 100; // Speed multiplier

// Constants
const earthYearInSeconds = 365.25 * 24 * 60 * 60; // Earth's year in seconds
const earthDayInSeconds = 24 * 60 * 60; // Earth's day in seconds
const earthEquatorialRadius = 6378; // Earth's equatorial radius in km
const realEarthOrbitalRadiusKm = 149.6e6; // Real Earth's distance from the Sun in km (149.6 million km)
const orbitalRadius = 10; // Distance from the Sun in the simulation (scaled down)

// Orbital Parameters
const orbitalParams = {
    earth: {
        radius: orbitalRadius, // Distance from the Sun (scaled down)
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

// Speed display
const speedDisplay = document.createElement('div');
speedDisplay.style.position = 'absolute';
speedDisplay.style.top = '10px';
speedDisplay.style.left = '10px';
speedDisplay.style.color = 'white';
speedDisplay.style.fontSize = '18px';
document.body.appendChild(speedDisplay);

// Slider and input controls
const timeScaleSlider = document.getElementById('timeScaleSlider');
const timeScaleInput = document.getElementById('timeScaleInput');

// Function to update timeScale
function updateTimeScale(newTimeScale) {
    timeScale = newTimeScale;

    // Sync slider and input
    timeScaleSlider.value = newTimeScale;
    timeScaleInput.value = newTimeScale;
}

// Add event listener for slider
timeScaleSlider.addEventListener('input', (event) => {
    updateTimeScale(Number(event.target.value));
});

// Add event listener for input box
timeScaleInput.addEventListener('change', (event) => {
    let newTimeScale = Number(event.target.value);

    // Clamp the value between 1 and 5000
    newTimeScale = Math.max(1, Math.min(5000, newTimeScale));

    updateTimeScale(newTimeScale);
});

// Function to calculate actual orbital speed in km/h
function calculateOrbitalSpeed() {
    const realOrbitalSpeedKmH = (2 * Math.PI * realEarthOrbitalRadiusKm) / earthYearInSeconds * 3600; // km/h
    return realOrbitalSpeedKmH * timeScale;
}

// Function to calculate rotational speed in km/h
function calculateRotationalSpeed() {
    const earthCircumference = 2 * Math.PI * earthEquatorialRadius; // Circumference of Earth in km
    const rotationalSpeedKmPerSec = earthCircumference / earthDayInSeconds; // Speed in km/sec
    return rotationalSpeedKmPerSec * 3600 * timeScale;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const deltaTime = Math.pow(timeScale, 2) * (1 / 60); // Assuming 60fps with exponential scaling

    orbitalParams.earth.theta += orbitalParams.earth.angularSpeed * deltaTime;
    earthOrbit.rotation.y = orbitalParams.earth.theta;

    currentEarthRotation += orbitalParams.earth.rotationSpeed * deltaTime;

    if (currentEarthRotation >= 2 * Math.PI) {
        currentEarthRotation -= 2 * Math.PI;
        totalEarthRotations += 1;
    }

    earth.rotation.y = currentEarthRotation;

    if (orbitalParams.earth.theta >= 2 * Math.PI) {
        orbitalParams.earth.theta -= 2 * Math.PI;
        totalEarthRotations = 0;
    }

    const orbitalSpeedKmH = calculateOrbitalSpeed();
    const rotationalSpeedKmH = calculateRotationalSpeed();

    speedDisplay.innerHTML = `
        Earth Orbital Speed: ${orbitalSpeedKmH.toFixed(2)} km/h<br>
        Earth Rotation Speed: ${rotationalSpeedKmH.toFixed(2)} km/h<br>
        Earth Spins this Orbit: ${totalEarthRotations}<br>
    `;

    renderer.render(scene, camera);
}

animate();
