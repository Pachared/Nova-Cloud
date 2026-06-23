"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";
import {
  PIXEL_BLAST_FRAGMENT_SHADER,
  PIXEL_BLAST_VERTEX_SHADER,
} from "./PixelBlastShader";

type PixelBlastVariant = "square" | "circle" | "triangle" | "diamond";

type PixelBlastProps = {
  variant?: PixelBlastVariant;
  pixelSize?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  antialias?: boolean;
  patternScale?: number;
  patternDensity?: number;
  liquid?: false;
  liquidStrength?: number;
  liquidRadius?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  liquidWobbleSpeed?: number;
  autoPauseOffscreen?: boolean;
  speed?: number;
  transparent?: boolean;
  edgeFade?: number;
  noiseAmount?: 0;
  dpr?: number;
};

const MAX_CLICKS = 10;
const shapeMap: Record<PixelBlastVariant, number> = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3,
};

function PixelBlast({
  variant = "square",
  pixelSize = 4,
  color = "#B497CF",
  className,
  style,
  antialias = true,
  patternScale = 2,
  patternDensity = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleIntensityScale = 1,
  rippleThickness = 0.1,
  rippleSpeed = 0.3,
  autoPauseOffscreen = true,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.25,
  dpr,
}: PixelBlastProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(dpr ?? window.devicePixelRatio ?? 1, 2));
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    if (transparent) renderer.setClearAlpha(0);
    else renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
      uClickTimes: { value: new Float32Array(MAX_CLICKS) },
      uShapeType: { value: shapeMap[variant] },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uPixelJitter: { value: pixelSizeJitter },
      uEnableRipples: { value: enableRipples ? 1 : 0 },
      uRippleSpeed: { value: rippleSpeed },
      uRippleThickness: { value: rippleThickness },
      uRippleIntensity: { value: rippleIntensityScale },
      uEdgeFade: { value: edgeFade },
    };
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: PIXEL_BLAST_VERTEX_SHADER,
      fragmentShader: PIXEL_BLAST_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: THREE.GLSL3,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      renderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1, false);
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    const visible = { current: true };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible.current = entry?.isIntersecting ?? true;
    });
    visibilityObserver.observe(mount);

    let clickIndex = 0;
    const click = (event: PointerEvent) => {
      if (!enableRipples) return;
      const bounds = renderer.domElement.getBoundingClientRect();
      const scaleX = renderer.domElement.width / bounds.width;
      const scaleY = renderer.domElement.height / bounds.height;
      uniforms.uClickPos.value[clickIndex].set(
        (event.clientX - bounds.left) * scaleX,
        (bounds.height - (event.clientY - bounds.top)) * scaleY,
      );
      uniforms.uClickTimes.value[clickIndex] = uniforms.uTime.value;
      clickIndex = (clickIndex + 1) % MAX_CLICKS;
    };
    renderer.domElement.addEventListener("pointerdown", click, { passive: true });

    const clock = new THREE.Clock();
    const timeOffset = crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff * 1000;
    let frame = 0;
    const render = () => {
      frame = requestAnimationFrame(render);
      if (document.hidden || (autoPauseOffscreen && !visible.current)) return;
      uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speed;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", click);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, [antialias, autoPauseOffscreen, color, dpr, edgeFade, enableRipples, patternDensity, patternScale, pixelSize, pixelSizeJitter, rippleIntensityScale, rippleSpeed, rippleThickness, speed, transparent, variant]);

  return <div ref={mountRef} aria-hidden="true" className={`relative h-full w-full overflow-hidden ${className ?? ""}`} style={style} />;
}

export default PixelBlast;
