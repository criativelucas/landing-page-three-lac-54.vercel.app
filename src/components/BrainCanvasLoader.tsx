"use client";

import dynamic from "next/dynamic";

// ssr:false must live inside a Client Component in Next 16; this wrapper
// exists only to satisfy that and keep the 3D bundle out of the first paint.
const BrainCanvas = dynamic(() => import("./BrainCanvas"), { ssr: false });

export default function BrainCanvasLoader() {
  return <BrainCanvas />;
}
