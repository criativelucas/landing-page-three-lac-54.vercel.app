// Bridges pointer-drag input from a DOM hit-area (Hero.tsx) into the R3F
// scene (BrainParticles.tsx) — they live in separate render trees, so a
// shared mutable ref is simpler here than threading props/context across
// the Canvas boundary.
export const brainDragState = {
  deltaX: 0,
  deltaY: 0,
};
