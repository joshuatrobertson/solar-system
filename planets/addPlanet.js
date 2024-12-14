import * as THREE from "three";
import { Text } from "troika-three-text";

export function addPlanet(scene, params, planetName) {
    console.log(`Adding planet: ${planetName}`);
    // Load planet texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(params.mapTextureURL);

    // Create material for the planet
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1,
    });

    // Create geometry for the planet
    const geometry = new THREE.SphereGeometry(params.radius, 50, 50);
    const planet = new THREE.Mesh(geometry, material);

    // Enable shadow casting and receiving
    planet.castShadow = true;
    planet.receiveShadow = true;

    // Create a pivot point for the planet's orbit
    const planetOrbit = new THREE.Object3D();
    scene.add(planetOrbit);
    planetOrbit.add(planet);

    // Set the planet's tilt
    planet.rotation.x = params.tilt;

    // Position the planet at the orbit's radius
    planet.position.set(params.orbitalRadius, 0, 0);

    // Add rings if the planet has them
    if (params.hasRings) {
        const ringTexture = textureLoader.load(params.ringTextureURL); // Load the ring texture

        // Create the ring geometry
        const ringGeometry = new THREE.RingGeometry(params.radius * 1.2, params.radius * 2, 64); // Adjust inner and outer radii
        const ringMaterial = new THREE.MeshBasicMaterial({
            map: ringTexture,
            side: THREE.DoubleSide, // Make the ring visible from both sides
            transparent: true,
            opacity: 0.6, // Adjust opacity if needed
        });

        // Create the ring mesh and add it to the scene
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2; // Rotate the ring to make it horizontal

        planet.add(ring);
    }

    // Add 3D text label for the planet
    const planetLabel = new Text();
    planetLabel.text = planetName;
    planetLabel.fontSize = 0.5;
    planetLabel.position.set(0, 1.5, 0);
    planetLabel.color = 0xffffff;
    planetLabel.sync();
    scene.add(planetLabel);

    // Add speed label for the planet
    const speedLabel = new Text();
    speedLabel.text = 'Speed: 0 km/h';
    speedLabel.fontSize = 0.4;
    speedLabel.position.set(0, -1.5, 0);
    speedLabel.color = 0xffffff;
    speedLabel.sync();
    scene.add(speedLabel);

    // Return planet data including ring information
    return {
        planet,
        planetOrbit,
        planetLabel,
        speedLabel,
        params,
        rotationAngle: 0,
        orbitAngle: 0,
        totalRotations: 0,
    };
}
