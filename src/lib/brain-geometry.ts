// Procedural, stylized point-cloud brain: two hemispheres split from a single
// Fibonacci sphere, folded with layered sine noise, squashed into a brain-ish
// silhouette. No external model/license needed.
// ponytail: math-based shape, not a scanned mesh. Swap for a sampled GLTF
// (MeshSurfaceSampler) later if literal anatomical accuracy is ever needed.

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function foldNoise(x: number, y: number, z: number) {
  const hash = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  const jitter = hash - Math.floor(hash) - 0.5;
  return (
    Math.sin(x * 6 + y * 3) * 0.05 +
    Math.sin(y * 8 + z * 5) * 0.045 +
    jitter * 0.05
  );
}

export interface BrainGeometry {
  positions: Float32Array;
  basePositions: Float32Array;
  jitterDirections: Float32Array;
  colorsVivid: Float32Array;
  colorsMuted: Float32Array;
}

export function generateBrainGeometry(count: number, radius = 1.6): BrainGeometry {
  const positions = new Float32Array(count * 3);
  const jitterDirections = new Float32Array(count * 3);
  const colorsVivid = new Float32Array(count * 3);
  const colorsMuted = new Float32Array(count * 3);

  // vivid: acid yellow -> off-white, used over the dark hero/CTA canvas
  const vividTop = { r: 0.89, g: 1, b: 0.24 };
  const vividBottom = { r: 0.85, g: 0.85, b: 0.82 };
  // muted: soft light gray, used over the light-themed body sections
  const mutedTop = { r: 0.66, g: 0.66, b: 0.63 };
  const mutedBottom = { r: 0.55, g: 0.55, b: 0.53 };

  for (let i = 0; i < count; i++) {
    const yFrac = 1 - (i / Math.max(count - 1, 1)) * 2; // 1 -> -1
    const ringRadius = Math.sqrt(Math.max(0, 1 - yFrac * yFrac));
    const theta = GOLDEN_ANGLE * i;

    const x0 = Math.cos(theta) * ringRadius;
    const y0 = yFrac;
    const z0 = Math.sin(theta) * ringRadius;

    const fold = 1 + foldNoise(x0, y0, z0);
    let x = x0 * fold;
    let y = y0 * fold;
    let z = z0 * fold;

    // brain silhouette: flatten top-to-bottom, elongate front-to-back
    y *= 0.72;
    z *= 1.2;
    if (z < -0.1) z *= 0.9; // taper the back slightly

    // split into two hemispheres with a visible longitudinal fissure
    const side = x0 >= 0 ? 1 : -1;
    x = x * 0.82 + side * 0.14;

    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;

    // precomputed outward jitter direction, used for the "disperse" effect
    jitterDirections[i * 3] = x0;
    jitterDirections[i * 3 + 1] = y0;
    jitterDirections[i * 3 + 2] = z0;

    const mix = (y0 + 1) / 2;
    colorsVivid[i * 3] = vividBottom.r + (vividTop.r - vividBottom.r) * mix;
    colorsVivid[i * 3 + 1] = vividBottom.g + (vividTop.g - vividBottom.g) * mix;
    colorsVivid[i * 3 + 2] = vividBottom.b + (vividTop.b - vividBottom.b) * mix;
    colorsMuted[i * 3] = mutedBottom.r + (mutedTop.r - mutedBottom.r) * mix;
    colorsMuted[i * 3 + 1] = mutedBottom.g + (mutedTop.g - mutedBottom.g) * mix;
    colorsMuted[i * 3 + 2] = mutedBottom.b + (mutedTop.b - mutedBottom.b) * mix;
  }

  return { positions, basePositions: positions.slice(), jitterDirections, colorsVivid, colorsMuted };
}

export function generateSynapseLines(
  basePositions: Float32Array,
  lineCount: number,
  sampleAttempts: number
): Float32Array {
  const pointCount = basePositions.length / 3;
  const candidates: { a: number; b: number; distSq: number }[] = [];

  for (let i = 0; i < sampleAttempts; i++) {
    const a = Math.floor(Math.random() * pointCount);
    const b = Math.floor(Math.random() * pointCount);
    if (a === b) continue;
    const dx = basePositions[a * 3] - basePositions[b * 3];
    const dy = basePositions[a * 3 + 1] - basePositions[b * 3 + 1];
    const dz = basePositions[a * 3 + 2] - basePositions[b * 3 + 2];
    candidates.push({ a, b, distSq: dx * dx + dy * dy + dz * dz });
  }

  candidates.sort((p, q) => p.distSq - q.distSq);
  const chosen = candidates.slice(0, lineCount);
  const linePositions = new Float32Array(chosen.length * 6);

  chosen.forEach((pair, i) => {
    linePositions[i * 6] = basePositions[pair.a * 3];
    linePositions[i * 6 + 1] = basePositions[pair.a * 3 + 1];
    linePositions[i * 6 + 2] = basePositions[pair.a * 3 + 2];
    linePositions[i * 6 + 3] = basePositions[pair.b * 3];
    linePositions[i * 6 + 4] = basePositions[pair.b * 3 + 1];
    linePositions[i * 6 + 5] = basePositions[pair.b * 3 + 2];
  });

  return linePositions;
}
