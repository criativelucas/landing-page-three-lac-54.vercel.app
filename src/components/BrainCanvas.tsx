"use client";

import { useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import BrainParticles from "./BrainParticles";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

interface EnvConfig {
  webglSupported: boolean;
  reducedMotion: boolean;
  isLowEnd: boolean;
}

// Device capabilities don't change mid-session, so this is computed once
// (lazily, client-only) and cached — useSyncExternalStore needs a stable
// snapshot reference, and this avoids the extra render an effect+setState
// pattern would cause.
let cachedEnv: EnvConfig | null = null;
function getEnvSnapshot(): EnvConfig {
  if (!cachedEnv) {
    cachedEnv = {
      webglSupported: hasWebGL(),
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      isLowEnd: (navigator.hardwareConcurrency ?? 8) < 4 || window.innerWidth < 640,
    };
  }
  return cachedEnv;
}
function getServerSnapshot(): EnvConfig | null {
  return null;
}
function subscribe(): () => void {
  return () => {};
}

export default function BrainCanvas() {
  const env = useSyncExternalStore(subscribe, getEnvSnapshot, getServerSnapshot);

  if (!env) return null;
  const { webglSupported, reducedMotion, isLowEnd } = env;

  if (!webglSupported) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-ink bg-[radial-gradient(circle_at_70%_35%,rgba(227,255,61,0.25),transparent_55%)]"
      />
    );
  }

  const pointCount = isLowEnd ? 1200 : 2600;
  const lineCount = isLowEnd ? 50 : 110;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={isLowEnd ? 1 : [1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        {/* BrainParticles owns the background color — it lerps dark<->light with scroll */}
        <BrainParticles pointCount={pointCount} lineCount={lineCount} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
