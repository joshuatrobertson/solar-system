// Function to calculate orbital speed in km/h
export function calculateOrbitalSpeed(realOrbitalSpeed, timescale) {
    // Adjust the orbital speed by a factor of the timescale.
    return realOrbitalSpeed * timescale;
}

// Function to calculate rotational speed in km/h
export function calculateRotationalSpeed(rotationalSpeed, timescale) {
    return rotationalSpeed * timescale;
}
