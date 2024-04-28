export const easeInOutCubic = (t: number) => { // Easing function for smooth transitions
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}