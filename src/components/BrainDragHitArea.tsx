"use client";

import { useRef, useState } from "react";
import { brainDragState } from "@/lib/brain-drag-state";

export default function BrainDragHitArea() {
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  return (
    <div
      role="presentation"
      aria-hidden
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") return;
        setDragging(true);
        lastPos.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        brainDragState.deltaX += e.clientX - lastPos.current.x;
        brainDragState.deltaY += e.clientY - lastPos.current.y;
        lastPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className={`absolute inset-y-0 right-0 hidden w-1/2 md:block ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
    />
  );
}
