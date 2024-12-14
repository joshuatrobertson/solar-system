import * as THREE from 'three';
import { createSun } from './sun.js';
import { camera } from './camera.js';
import { createRenderer } from './renderer.js';
import { Text } from 'troika-three-text';
import { orbitalParams } from './planet_calcs/constants.js';
import { calculateOrbitalSpeed, calculateRotationalSpeed } from './planet_calcs/calculations.js';
import { addPlanet } from "./planets/addPlanet";
import {addOrbitControls} from "./controls";
import {createStarField} from "./stars";

// Set the starting orbital speed to 0
let planets = [];

function setupScene() {
  // Create a renderer to add our scene to
  const renderer = createRenderer();
  document.body.appendChild(renderer.domElement);

  // Create our scene
  const scene = new THREE.Scene();

  // Add stars
  createStarField(scene);

  // Add Sun
  const sun = createSun();
  scene.add(sun);

  // Create a list of planets with their respective parameters

  const planetsData = [
    { name: 'Earth', params: orbitalParams.earth },
    { name: 'Mars', params: orbitalParams.mars },
    { name: 'Jupiter', params: orbitalParams.jupiter },
    { name: 'Venus', params: orbitalParams.venus },
    { name: 'Mercury', params: orbitalParams.mercury },
    { name: 'Saturn', params: orbitalParams.saturn },
    { name: 'Uranus', params: orbitalParams.uranus },
    { name: 'Neptune', params: orbitalParams.neptune },
  ];


  // Create an array to store planet data for easy updates
  planets = planetsData.map(data => {
    const { planet, planetOrbit, planetLabel, speedLabel, params } = addPlanet(scene, data.params, data.name);
    scene.add(planet);

    return {
      planet,
      planetOrbit,
      planetLabel,
      speedLabel,
      params,
      theta: 0,
      currentRotation: 0,
      totalRotations: 0,
    };
  });

  // Initialise OrbitControls for zooming and camera movement
  const { updateControls} = addOrbitControls(camera, renderer, renderer.domElement);

  // Timescale to adjust speed of both rotation and orbit
  let timeScale = 2000;

  // Speed display
  const speedDisplay = document.createElement('div');
  speedDisplay.style.position = 'absolute';
  speedDisplay.style.top = '10px';
  speedDisplay.style.left = '10px';
  speedDisplay.style.color = 'white';
  speedDisplay.style.fontSize = '18px';
  document.body.appendChild(speedDisplay);

  // FOR TESTING // todo
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

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

    // Clamp the value between 1 and 2000
    newTimeScale = Math.max(1, Math.min(50000, newTimeScale));

    updateTimeScale(newTimeScale);
  });

  // Animation Loop using recursion
  function animate() {
    requestAnimationFrame(animate);

    const deltaTime = timeScale * (1 / 60); // Assuming 60fps for simulation

    planets.forEach((planetData) => {
      const params = planetData.params;

      // Update orbital angle (theta) for the planet's movement along its orbit
      planetData.theta += params.adjustedAngularSpeedKmH * deltaTime;
      if (planetData.theta >= 2 * Math.PI) {
        planetData.theta -= 2 * Math.PI;  // Reset angle after a full orbit
      }

      // Rotate the orbit around the Y-axis
      planetData.planetOrbit.rotation.y = planetData.theta;

      // Update the planet's position using theta to create an orbit around the Sun
      const orbitalRadius = params.orbitalRadius; // Orbit radius (distance from the Sun)
      planetData.planet.position.set(
          orbitalRadius * Math.cos(planetData.theta),  // x position
          0,  // y position (assuming flat orbit for simplicity)
          orbitalRadius * Math.sin(planetData.theta)   // z position
      );

      // Update the planet's rotation on its axis
      planetData.currentRotation += params.adjustedRotationSpeedKmH * deltaTime;
      if (planetData.currentRotation >= 2 * Math.PI) {
        planetData.currentRotation -= 2 * Math.PI;
        planetData.totalRotations += 1;
      }

      planetData.planet.rotation.y = planetData.currentRotation;

      // Calculate orbital and rotational speeds
      const orbitalSpeedKmH = calculateOrbitalSpeed(params.realOrbitalSpeedKmH, timeScale);
      const rotationalSpeedKmH = calculateRotationalSpeed(params.rotationalSpeedKmH, timeScale);

      // Update text labels for planet position and speed
      const planetWorldPosition = new THREE.Vector3();
      planetData.planet.getWorldPosition(planetWorldPosition);

      planetData.planetLabel.position.set(planetWorldPosition.x, planetWorldPosition.y + 1.5, planetWorldPosition.z);
      planetData.speedLabel.position.set(planetWorldPosition.x, planetWorldPosition.y - 1.5, planetWorldPosition.z);

      // Update the speed label text
      planetData.speedLabel.text = `Orbital Speed: ${orbitalSpeedKmH.toFixed(0)} km/h
Rotation Speed: ${rotationalSpeedKmH.toFixed(0)} km/h
Full rotations this Orbit: ${planetData.totalRotations}`;
      planetData.speedLabel.sync(); // Synchronise changes
    });

    updateControls();

    renderer.render(scene, camera);
  }

  animate();
}


// Initialise the scene
setupScene();
