import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function addOrbitControls(camera, renderer, domElement) {
  // Initialise OrbitControls
  const controls = new OrbitControls(camera, domElement);

  // Enable zooming, panning, and rotating
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.enableRotate = true;

  // Set some control parameters
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.rotateSpeed = 0.5;

  // Function to update controls
  function updateControls() {
    controls.update(); // Update on each frame
  }

  // Return the update function along with zoom methods
  return { updateControls};
}
