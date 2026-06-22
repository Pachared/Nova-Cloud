"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  PIXEL_BLAST_FRAGMENT_SHADER,
  PIXEL_BLAST_VERTEX_SHADER,
} from "./PixelBlastShader";

type PixelBlastProps = {
  className?: string;
  variant?: "square" | "circle" | "triangle" | "diamond";
  pixelSize?: number;
  color?: string;
  patternScale?: number;
  patternDensity?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleSpeed?: number;
  rippleThickness?: number;
  rippleIntensityScale?: number;
  liquid?: false;
  liquidStrength?: number;
  liquidRadius?: number;
  liquidWobbleSpeed?: number;
  speed?: number;
  edgeFade?: number;
  noiseAmount?: number;
  transparent?: boolean;
};

const MAX_RIPPLES = 8;
const shapeTypes = { square: 0, circle: 1, triangle: 2, diamond: 3 };

function PixelBlast({
  className,
  variant = "square",
  pixelSize = 6,
  color = "#a855f7",
  patternScale = 3,
  patternDensity = 0.72,
  pixelSizeJitter = 0.32,
  enableRipples = true,
  rippleSpeed = 0.42,
  rippleThickness = 0.12,
  rippleIntensityScale = 1.35,
  speed = 0.6,
  edgeFade = 0.1,
  noiseAmount = 0,
  transparent = true,
}: PixelBlastProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.style.cssText = "display:block;height:100%;width:100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: PIXEL_BLAST_VERTEX_SHADER,
      fragmentShader: PIXEL_BLAST_FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uColor: { value: new THREE.Color(color) },
        uTime: { value: 0 },
        uPixelSize: { value: pixelSize },
        uScale: { value: patternScale },
        uDensity: { value: patternDensity },
        uJitter: { value: pixelSizeJitter },
        uEdgeFade: { value: edgeFade },
        uNoiseAmount: { value: noiseAmount },
        uShapeType: { value: shapeTypes[variant] },
        uTransparent: { value: transparent ? 1 : 0 },
        uRippleSpeed: { value: rippleSpeed },
        uRippleThickness: { value: rippleThickness },
        uRippleIntensity: { value: rippleIntensityScale },
        uRipplePositions: {
          value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector2(-1, -1)),
        },
        uRippleTimes: { value: new Float32Array(MAX_RIPPLES) },
      },
    });
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      renderer.setSize(width, height, false);
      material.uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      material.uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    const clock = new THREE.Clock();
    let visible = true;
    let frame = 0;
    let rippleIndex = 0;

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    visibilityObserver.observe(mount);

    const addRipple = (event: PointerEvent) => {
      if (!enableRipples) return;
      const bounds = renderer.domElement.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = 1 - (event.clientY - bounds.top) / bounds.height;
      material.uniforms.uRipplePositions.value[rippleIndex].set(x, y);
      material.uniforms.uRippleTimes.value[rippleIndex] = material.uniforms.uTime.value;
      rippleIndex = (rippleIndex + 1) % MAX_RIPPLES;
    };
    renderer.domElement.addEventListener("pointerdown", addRipple, { passive: true });

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (document.hidden || !visible) return;
      material.uniforms.uTime.value = clock.getElapsedTime() * speed;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", addRipple);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, [
    color,
    edgeFade,
    enableRipples,
    patternDensity,
    patternScale,
    pixelSize,
    pixelSizeJitter,
    rippleIntensityScale,
    rippleSpeed,
    rippleThickness,
    speed,
    transparent,
    noiseAmount,
    variant,
  ]);

  return <div ref={mountRef} aria-hidden="true" className={`h-full w-full ${className ?? ""}`} />;
}

export default PixelBlast;
