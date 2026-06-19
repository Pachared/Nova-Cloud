"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import GlassSurfaceFilter from "./GlassSurfaceFilter";
import { createDisplacementMap, type GlassSurfaceProps, useDarkMode } from "./glassSurfaceUtils";

function GlassSurface({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  contentClassName = "p-2",
  style = {},
  ...domProps
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);
  const isDarkMode = useDarkMode();

  const generateDisplacementMap = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;

    return createDisplacementMap({
      width: actualWidth,
      height: actualHeight,
      borderRadius,
      borderWidth,
      brightness,
      opacity,
      blur,
      mixBlendMode,
      redGradId,
      blueGradId,
    });
  }, [
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    mixBlendMode,
    redGradId,
    blueGradId,
  ]);

  const updateDisplacementMap = useCallback(() => {
    feImageRef.current?.setAttribute("href", generateDisplacementMap());
  }, [generateDisplacementMap]);

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      ref.current?.setAttribute("scale", (distortionScale + offset).toString());
      ref.current?.setAttribute("xChannelSelector", xChannel);
      ref.current?.setAttribute("yChannelSelector", yChannel);
    });

    gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
    updateDisplacementMap,
  ]);

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(() => {
      window.setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [updateDisplacementMap]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const frame = window.requestAnimationFrame(() => {
      if (isWebkit || isFirefox) {
        setSvgSupported(false);
        return;
      }

      const div = document.createElement("div");
      div.style.backdropFilter = `url(#${filterId})`;
      setSvgSupported(div.style.backdropFilter !== "");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [filterId]);

  const baseStyles = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
  };

  const supportsBackdropFilter =
    typeof CSS !== "undefined" && CSS.supports("backdrop-filter", "blur(10px)");

  const glassStyles: CSSProperties = svgSupported
    ? {
        ...baseStyles,
        background: isDarkMode
          ? `hsl(0 0% 0% / ${backgroundOpacity})`
          : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: `0 0 2px 1px color-mix(in oklch, white, transparent 72%) inset,
          0 0 12px 4px color-mix(in oklch, white, transparent 88%) inset,
          0 18px 58px rgba(0, 0, 0, 0.24)`,
      }
    : {
        ...baseStyles,
        background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.18)",
        backdropFilter: supportsBackdropFilter
          ? `blur(12px) saturate(${saturation}) brightness(1.08)`
          : undefined,
        WebkitBackdropFilter: supportsBackdropFilter
          ? `blur(12px) saturate(${saturation}) brightness(1.08)`
          : undefined,
        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.12),
          inset 0 -1px 0 0 rgba(255,255,255,0.06),
          0 18px 58px rgba(0,0,0,0.24)`,
      };

  return (
    <div
      {...domProps}
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out ${className}`}
      style={glassStyles}
    >
      <GlassSurfaceFilter
        filterId={filterId}
        feImageRef={feImageRef}
        redChannelRef={redChannelRef}
        greenChannelRef={greenChannelRef}
        blueChannelRef={blueChannelRef}
        gaussianBlurRef={gaussianBlurRef}
      />

      <div className={`relative z-10 flex h-full w-full items-center justify-center rounded-[inherit] ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}

export default GlassSurface;
