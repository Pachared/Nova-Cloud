"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { LASER_FLOW_FRAGMENT_SHADER, LASER_FLOW_VERTEX_SHADER, hexToRgb } from "./LaserFlowShader";

type Props = {
  className?: string; style?: React.CSSProperties; wispDensity?: number; dpr?: number;
  mouseSmoothTime?: number; mouseTiltStrength?: number; horizontalBeamOffset?: number;
  verticalBeamOffset?: number; flowSpeed?: number; verticalSizing?: number; horizontalSizing?: number;
  fogIntensity?: number; fogScale?: number; wispSpeed?: number; wispIntensity?: number;
  flowStrength?: number; decay?: number; falloffStart?: number; fogFallSpeed?: number; color?: string;
};

type UniformValue = number | THREE.Vector3 | THREE.Vector4;

export default function LaserFlow({
  className,
  style,
  wispDensity = 1,
  dpr,
  mouseSmoothTime = 0.0,
  mouseTiltStrength = 0.01,
  horizontalBeamOffset = 0.1,
  verticalBeamOffset = 0.0,
  flowSpeed = 0.35,
  verticalSizing = 2.0,
  horizontalSizing = 0.5,
  fogIntensity = 0.45,
  fogScale = 0.3,
  wispSpeed = 15.0,
  wispIntensity = 5.0,
  flowStrength = 0.25,
  decay = 1.1,
  falloffStart = 1.2,
  fogFallSpeed = 0.6,
  color = "#a855f7",
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<Record<string, { value: UniformValue }> | null>(null);
  const smoothTimeRef = useRef(mouseSmoothTime);

  useEffect(() => {
    smoothTimeRef.current = mouseSmoothTime;
  }, [mouseSmoothTime]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(dpr ?? window.devicePixelRatio ?? 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      uWispDensity: { value: 1 },
      uTiltScale: { value: 0.01 },
      uFlowTime: { value: 0 },
      uFogTime: { value: 0 },
      uBeamXFrac: { value: 0.1 },
      uBeamYFrac: { value: 0 },
      uFlowSpeed: { value: 0.35 },
      uVLenFactor: { value: 2 },
      uHLenFactor: { value: 0.5 },
      uFogIntensity: { value: 0.45 },
      uFogScale: { value: 0.3 },
      uWSpeed: { value: 15 },
      uWIntensity: { value: 5 },
      uFlowStrength: { value: 0.25 },
      uDecay: { value: 1.1 },
      uFalloffStart: { value: 1.2 },
      uFogFallSpeed: { value: 0.6 },
      uColor: { value: hexToRgb("#a855f7") },
      uFade: { value: 0 },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.RawShaderMaterial({
      vertexShader: LASER_FLOW_VERTEX_SHADER,
      fragmentShader: LASER_FLOW_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseCurrent = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    let animationFrame = 0;
    let fade = 0;
    let visible = true;

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio(), renderer.getPixelRatio());
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    intersectionObserver.observe(mount);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const ratio = renderer.getPixelRatio();
      mouseTarget.set((event.clientX - rect.left) * ratio, (rect.height - (event.clientY - rect.top)) * ratio);
    };

    const handlePointerLeave = () => {
      mouseTarget.set(0, 0);
    };

    renderer.domElement.addEventListener("pointermove", handlePointerMove, { passive: true });
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      if (document.hidden || !visible) return;

      const delta = Math.min(clock.getDelta(), 0.033);
      const elapsed = clock.elapsedTime;
      const tau = Math.max(0.001, smoothTimeRef.current || 0.001);
      const alpha = 1 - Math.exp(-delta / tau);

      fade = Math.min(1, fade + delta);
      mouseCurrent.lerp(mouseTarget, alpha);
      uniforms.iTime.value = elapsed;
      uniforms.uFlowTime.value += delta;
      uniforms.uFogTime.value += delta;
      uniforms.uFade.value = fade;
      uniforms.iMouse.value.set(mouseCurrent.x, mouseCurrent.y, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
      uniformsRef.current = null;
    };
  }, [dpr]);

  useEffect(() => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;

    uniforms.uWispDensity.value = wispDensity;
    uniforms.uTiltScale.value = mouseTiltStrength;
    uniforms.uBeamXFrac.value = horizontalBeamOffset;
    uniforms.uBeamYFrac.value = verticalBeamOffset;
    uniforms.uFlowSpeed.value = flowSpeed;
    uniforms.uVLenFactor.value = verticalSizing;
    uniforms.uHLenFactor.value = horizontalSizing;
    uniforms.uFogIntensity.value = fogIntensity;
    uniforms.uFogScale.value = fogScale;
    uniforms.uWSpeed.value = wispSpeed;
    uniforms.uWIntensity.value = wispIntensity;
    uniforms.uFlowStrength.value = flowStrength;
    uniforms.uDecay.value = decay;
    uniforms.uFalloffStart.value = falloffStart;
    uniforms.uFogFallSpeed.value = fogFallSpeed;
    uniforms.uColor.value.copy(hexToRgb(color));
  }, [wispDensity, mouseTiltStrength, horizontalBeamOffset, verticalBeamOffset, flowSpeed, verticalSizing,
    horizontalSizing, fogIntensity, fogScale, wispSpeed, wispIntensity, flowStrength, decay, falloffStart,
    fogFallSpeed, color]);

  return <div ref={mountRef} className={`relative h-full w-full ${className || ""}`} style={style} />;
}
