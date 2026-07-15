"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "motion/react";
import { generateBrainGeometry, generateSynapseLines } from "@/lib/brain-geometry";
import { brainDragState } from "@/lib/brain-drag-state";

interface Keyframe {
  t: number;
  x: number;
  y: number;
  scale: number;
  spread: number;
  opacity: number;
  rotSpeed: number;
  colorMix: number; // 0 = vivid (dark hero/CTA), 1 = muted (light body sections)
}

// Scroll progress (0->1 across the whole page) drives this timeline. `t`
// values are calibrated against the ACTUAL measured section offsets on the
// built page (via getBoundingClientRect / scrollHeight), not guessed
// percentages — real section starts: hero 0.01, socialProof 0.14,
// problem 0.145, pricing 0.25, process 0.42, work 0.53, testimonials 0.70,
// guarantee 0.77, faq 0.86, finalCta 0.99. Re-measure and adjust these if
// section content/heights change enough to shift those offsets.
const KEYFRAMES: Keyframe[] = [
  { t: 0.0, x: 2.3, y: 0.05, scale: 0.82, spread: 1.0, opacity: 1.0, rotSpeed: 0.15, colorMix: 0 },
  { t: 0.11, x: 2.3, y: 0.05, scale: 0.82, spread: 1.0, opacity: 1.0, rotSpeed: 0.15, colorMix: 0 },
  { t: 0.135, x: 0.6, y: -0.15, scale: 0.92, spread: 1.3, opacity: 0.28, rotSpeed: 0.4, colorMix: 1 },
  { t: 0.18, x: 0.4, y: -0.15, scale: 0.95, spread: 1.4, opacity: 0.25, rotSpeed: 0.4, colorMix: 1 },
  { t: 0.25, x: 0.0, y: 0.0, scale: 1.08, spread: 1.0, opacity: 0.3, rotSpeed: 0.55, colorMix: 1 },
  { t: 0.42, x: -1.4, y: 0.05, scale: 0.8, spread: 1.0, opacity: 0.22, rotSpeed: 0.12, colorMix: 1 },
  { t: 0.53, x: 1.8, y: 0.35, scale: 0.55, spread: 1.0, opacity: 0.18, rotSpeed: 0.05, colorMix: 1 },
  { t: 0.86, x: 1.8, y: 0.35, scale: 0.55, spread: 1.0, opacity: 0.12, rotSpeed: 0.05, colorMix: 1 },
  { t: 0.93, x: 0.3, y: -0.1, scale: 0.9, spread: 1.0, opacity: 0.6, rotSpeed: 0.15, colorMix: 0 },
  { t: 0.97, x: 0.0, y: -0.1, scale: 1.15, spread: 1.0, opacity: 1.0, rotSpeed: 0.25, colorMix: 0 },
  { t: 1.0, x: 0.0, y: -0.1, scale: 1.2, spread: 1.0, opacity: 1.0, rotSpeed: 0.2, colorMix: 0 },
];

function sampleKeyframes(progress: number): Keyframe {
  if (progress <= KEYFRAMES[0].t) return KEYFRAMES[0];
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (progress >= a.t && progress <= b.t) {
      const span = b.t - a.t || 1;
      const localT = (progress - a.t) / span;
      return {
        t: progress,
        x: THREE.MathUtils.lerp(a.x, b.x, localT),
        y: THREE.MathUtils.lerp(a.y, b.y, localT),
        scale: THREE.MathUtils.lerp(a.scale, b.scale, localT),
        spread: THREE.MathUtils.lerp(a.spread, b.spread, localT),
        opacity: THREE.MathUtils.lerp(a.opacity, b.opacity, localT),
        rotSpeed: THREE.MathUtils.lerp(a.rotSpeed, b.rotSpeed, localT),
        colorMix: THREE.MathUtils.lerp(a.colorMix, b.colorMix, localT),
      };
    }
  }
  return KEYFRAMES[KEYFRAMES.length - 1];
}

const BG_VIVID = new THREE.Color("#0a0a0a");
const BG_MUTED = new THREE.Color("#eaeae7");
const LINE_VIVID = new THREE.Color("#e3ff3d");
const LINE_MUTED = new THREE.Color("#9a9a94");

interface BrainParticlesProps {
  pointCount: number;
  lineCount: number;
  reducedMotion: boolean;
}

export default function BrainParticles({ pointCount, lineCount, reducedMotion }: BrainParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsGeoRef = useRef<THREE.BufferGeometry>(null);
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null);
  const linesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const bgColorRef = useRef<THREE.Color>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const wasDispersed = useRef(false);
  const lastWrittenColorMix = useRef(-1);
  const isLightBlend = useRef(false);

  const { scrollYProgress } = useScroll();

  const geometry = useMemo(() => generateBrainGeometry(pointCount), [pointCount]);
  const linePositions = useMemo(
    () => generateSynapseLines(geometry.basePositions, lineCount, lineCount * 25),
    [geometry, lineCount]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    const posAttr = pointsGeoRef.current?.attributes.position as THREE.BufferAttribute | undefined;
    const colorAttr = pointsGeoRef.current?.attributes.color as THREE.BufferAttribute | undefined;
    if (!group || !posAttr || !colorAttr) return;

    const progress = scrollYProgress.get();
    const kf = sampleKeyframes(progress);
    const heroWeight = 1 - THREE.MathUtils.smoothstep(progress, 0, 0.15);
    if (!reducedMotion) {
      mouseTarget.current.x = state.pointer.x;
      mouseTarget.current.y = state.pointer.y;
      mouseCurrent.current.x = THREE.MathUtils.lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.04);
      mouseCurrent.current.y = THREE.MathUtils.lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.04);
      group.rotation.y += delta * kf.rotSpeed;
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        mouseCurrent.current.y * 0.15 * (0.2 + heroWeight * 0.8),
        0.05
      );
    }

    // Manual drag input (Hero's BrainDragHitArea) — consumed once per frame
    // and layered on top of the ambient scroll/mouse rotation above.
    if (brainDragState.deltaX !== 0 || brainDragState.deltaY !== 0) {
      group.rotation.y += brainDragState.deltaX * 0.006;
      group.rotation.x += brainDragState.deltaY * 0.006;
      brainDragState.deltaX = 0;
      brainDragState.deltaY = 0;
    }

    const parallaxX = reducedMotion ? 0 : mouseCurrent.current.x * 0.3 * (0.15 + heroWeight * 0.85);
    const parallaxY = reducedMotion ? 0 : mouseCurrent.current.y * 0.2 * (0.15 + heroWeight * 0.85);

    group.position.x = THREE.MathUtils.lerp(group.position.x, kf.x + parallaxX, 0.08);
    group.position.y = THREE.MathUtils.lerp(group.position.y, kf.y + parallaxY, 0.08);
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, kf.scale, 0.08));

    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.opacity = THREE.MathUtils.lerp(
        pointsMaterialRef.current.opacity,
        kf.opacity,
        0.08
      );
    }
    if (linesMaterialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.4) * 0.5 + 0.5;
      linesMaterialRef.current.opacity = THREE.MathUtils.lerp(
        linesMaterialRef.current.opacity,
        kf.opacity * (0.15 + pulse * 0.25),
        0.08
      );
      linesMaterialRef.current.color.lerpColors(LINE_VIVID, LINE_MUTED, kf.colorMix);
    }
    if (bgColorRef.current) {
      bgColorRef.current.lerpColors(BG_VIVID, BG_MUTED, kf.colorMix);
    }

    // Additive blending glows on a dark backdrop but washes out white/near-white
    // on a light one — flip to normal blending once past the midpoint so the
    // muted gray tone actually reads instead of clipping toward white.
    const wantsLightBlend = kf.colorMix > 0.5;
    if (wantsLightBlend !== isLightBlend.current) {
      const mode = wantsLightBlend ? THREE.NormalBlending : THREE.AdditiveBlending;
      if (pointsMaterialRef.current) pointsMaterialRef.current.blending = mode;
      if (linesMaterialRef.current) linesMaterialRef.current.blending = mode;
      isLightBlend.current = wantsLightBlend;
    }

    // Per-vertex color lerp is O(pointCount) — only rewrite while colorMix is
    // actually moving, skip once it has settled at its current keyframe value.
    if (Math.abs(kf.colorMix - lastWrittenColorMix.current) > 0.001) {
      const vivid = geometry.colorsVivid;
      const muted = geometry.colorsMuted;
      for (let i = 0; i < pointCount; i++) {
        const idx = i * 3;
        colorAttr.array[idx] = THREE.MathUtils.lerp(vivid[idx], muted[idx], kf.colorMix);
        colorAttr.array[idx + 1] = THREE.MathUtils.lerp(vivid[idx + 1], muted[idx + 1], kf.colorMix);
        colorAttr.array[idx + 2] = THREE.MathUtils.lerp(vivid[idx + 2], muted[idx + 2], kf.colorMix);
      }
      colorAttr.needsUpdate = true;
      lastWrittenColorMix.current = kf.colorMix;
    }

    // The dispersion loop is O(pointCount) — most of the scroll timeline has
    // spread==1, so skip the array rewrite except while actively dispersed
    // (plus one final pass to snap back to base positions).
    const spread = kf.spread;
    const isDispersed = Math.abs(spread - 1) > 0.001;
    if (isDispersed || wasDispersed.current) {
      const base = geometry.basePositions;
      const jitter = geometry.jitterDirections;
      const amount = (spread - 1) * 0.9;
      for (let i = 0; i < pointCount; i++) {
        const idx = i * 3;
        posAttr.array[idx] = base[idx] + jitter[idx] * amount;
        posAttr.array[idx + 1] = base[idx + 1] + jitter[idx + 1] * amount;
        posAttr.array[idx + 2] = base[idx + 2] + jitter[idx + 2] * amount;
      }
      posAttr.needsUpdate = true;
      wasDispersed.current = isDispersed;
    }
  });

  return (
    <>
      <color attach="background" ref={bgColorRef} args={["#0a0a0a"]} />
      <group ref={groupRef}>
        <points>
          <bufferGeometry ref={pointsGeoRef}>
            <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[geometry.colorsVivid, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={pointsMaterialRef}
            size={0.028}
            vertexColors
            transparent
            opacity={1}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={linesMaterialRef}
            color="#e3ff3d"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </>
  );
}
