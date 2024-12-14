
// Earth's real distance from the Sun in km
const earthRealDistanceFromSun = 149600000; // in km
const earthDistanceFromSun = 30;  // scaled distance for Earth

// Calculate the scale factor based on Earth's real distance
const scaleFactor = earthDistanceFromSun / earthRealDistanceFromSun;

// Scale the distances for the other planets
const mercuryRealDistanceFromSun = 57910000;  // in km
const venusRealDistanceFromSun = 108200000;   // in km
const marsRealDistanceFromSun = 227900000;    // in km
const jupiterRealDistanceFromSun = 778300000; // in km
const saturnRealDistanceFromSun = 1427000000; // in km
const uranusRealDistanceFromSun = 2871000000; // in km
const neptuneRealDistanceFromSun = 4495000000; // in km

const mercuryDistanceFromSun = mercuryRealDistanceFromSun * scaleFactor;
const venusDistanceFromSun = venusRealDistanceFromSun * scaleFactor;
const marsDistanceFromSun = marsRealDistanceFromSun * scaleFactor;
const jupiterDistanceFromSun = jupiterRealDistanceFromSun * scaleFactor;
const saturnDistanceFromSun = saturnRealDistanceFromSun * scaleFactor;
const uranusDistanceFromSun = uranusRealDistanceFromSun * scaleFactor;
const neptuneDistanceFromSun = neptuneRealDistanceFromSun * scaleFactor;

export let orbitalParams = {
    mercury: {
        name: 'mercury',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 0.38,  // Radius in AU
        mapTextureURL: '/mercury_texture.jpg',
        hasRings: false,
        ringTextureURL: 'saturn_rings.png',
        orbitalRadius: mercuryDistanceFromSun,
        adjustedAngularSpeedKmH: (4.74e-7 * (mercuryDistanceFromSun / 57910000)) * 149600000,
        adjustedRotationSpeedKmH: (1.023e-4 * (mercuryDistanceFromSun / 57910000)) * 149600000,
        rotationalSpeedKmH: 1407, // Mercury's rotational speed
        realOrbitalSpeedKmH: 47800, // Orbital speed
        tilt: 0.034, // Axial tilt in radians (very small tilt)
    },
    venus: {
        name: 'venus',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 0.95,  // Venus radius
        mapTextureURL: '/venus_texture.jpg',
        hasRings: false,
        orbitalRadius: venusDistanceFromSun,
        adjustedAngularSpeedKmH: (1.174e-7 * (venusDistanceFromSun / 108200000)) * 149600000,
        adjustedRotationSpeedKmH: (2.615e-5 * (venusDistanceFromSun / 108200000)) * 149600000,
        rotationalSpeedKmH: -607, // Venus' rotational speed (negative because it rotates backwards)
        realOrbitalSpeedKmH: 35020, // Orbital speed
        tilt: 2.64 * (Math.PI / 180), // Axial tilt in radians
    },
    earth: {
        name: 'earth',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 0.5,
        mapTextureURL: '/earth_day.jpg',
        hasRings: false,
        orbitalRadius: earthDistanceFromSun,
        adjustedAngularSpeedKmH: (1.99102128e-7 * (earthDistanceFromSun / 149600000)) * 149600000,
        adjustedRotationSpeedKmH: (7.272205e-5 * (earthDistanceFromSun / 149600000)) * 149600000,
        rotationalSpeedKmH: 1668,
        realOrbitalSpeedKmH: 107460,
        tilt: 0.41015237421,
    },
    mars: {
        name: 'mars',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 0.53,
        mapTextureURL: '/mars_texture.jpg',
        hasRings: false,
        orbitalRadius: marsDistanceFromSun,
        adjustedAngularSpeedKmH: (1.602e-7 * (marsDistanceFromSun / 227900000)) * 149600000,
        adjustedRotationSpeedKmH: (7.088e-5 * (marsDistanceFromSun / 227900000)) * 149600000,
        rotationalSpeedKmH: 868,
        realOrbitalSpeedKmH: 86400,
        tilt: 25.19 * (Math.PI / 180),
    },
    jupiter: {
        name: 'jupiter',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 5.2,
        mapTextureURL: '/jupiter_texture.jpg',
        hasRings: true,
        ringTextureURL: 'saturn_rings.png',
        orbitalRadius: jupiterDistanceFromSun,
        adjustedAngularSpeedKmH: (1.303e-7 * (jupiterDistanceFromSun / 778300000)) * 149600000,
        adjustedRotationSpeedKmH: (1.767e-4 * (jupiterDistanceFromSun / 778300000)) * 149600000,
        rotationalSpeedKmH: 45107, // Jupiter's rotational speed
        realOrbitalSpeedKmH: 130700, // Orbital speed
        tilt: 3.13 * (Math.PI / 180), // Axial tilt in radians
    },
    saturn: {
        name: 'saturn',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 4.4,
        mapTextureURL: '/saturn_texture.jpg',
        hasRings: true, // Saturn's famous rings
        ringTextureURL: 'saturn_rings.png',
        orbitalRadius: saturnDistanceFromSun,
        adjustedAngularSpeedKmH: (7.603e-8 * (saturnDistanceFromSun / 1427000000)) * 149600000,
        adjustedRotationSpeedKmH: (1.124e-4 * (saturnDistanceFromSun / 1427000000)) * 149600000,
        rotationalSpeedKmH: 936, // Saturn's rotational speed
        realOrbitalSpeedKmH: 96900, // Orbital speed
        tilt: 26.73 * (Math.PI / 180), // Axial tilt in radians
    },
    uranus: {
        name: 'uranus',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 3.9,
        mapTextureURL: '/uranus_texture.jpg',
        hasRings: true,
        ringTextureURL: 'saturn_rings.png',
        orbitalRadius: uranusDistanceFromSun,
        adjustedAngularSpeedKmH: (5.53e-8 * (uranusDistanceFromSun / 2871000000)) * 149600000,
        adjustedRotationSpeedKmH: (1.235e-4 * (uranusDistanceFromSun / 2871000000)) * 149600000,
        rotationalSpeedKmH: -20650, // Uranus' rotational speed (retrograde rotation)
        realOrbitalSpeedKmH: 68800, // Orbital speed
        tilt: 97.77 * (Math.PI / 180), // Axial tilt in radians (very large tilt)
    },
    neptune: {
        name: 'neptune',
        theta: 0,
        currentRotation: 0,
        totalRotation: 0,
        radius: 3.8,
        mapTextureURL: '/neptune_texture.jpg',
        hasRings: true,
        ringTextureURL: 'saturn_rings.png',
        orbitalRadius: neptuneDistanceFromSun,
        adjustedAngularSpeedKmH: (5.43e-8 * (neptuneDistanceFromSun / 4495000000)) * 149600000,
        adjustedRotationSpeedKmH: (1.541e-4 * (neptuneDistanceFromSun / 4495000000)) * 149600000,
        rotationalSpeedKmH: 16670, // Neptune's rotational speed
        realOrbitalSpeedKmH: 54000, // Orbital speed
        tilt: 28.32 * (Math.PI / 180), // Axial tilt in radians
    },
}
