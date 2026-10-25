'use client';

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowDownIcon, type ArrowDownIconHandle } from '@/shared/navigation/ArrowDownIcon';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'enabled'
  | 'fadeToContent'
  | 'mobileStartWidth';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  fadeToContent?: boolean;
  mobileStartWidth?: number;
  onRevealChange?: (visible: boolean) => void;
  heroMorph?: boolean;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  fadeToContent = false,
  mobileStartWidth = 84,
  onRevealChange,
  heroMorph = false,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>(
    {} as Required<Pick<ScrollExpandProps, ConfigKey>>
  );
  const refreshRef = useRef<(() => void) | null>(null);
  const revealRef = useRef(false);
  const skipFocusRef = useRef(false);
  const arrowRef = useRef<ArrowDownIconHandle>(null);
  const morphRef = useRef({ x: 0, y: 0 });
  const onRevealRef = useRef(onRevealChange);

  useLayoutEffect(() => {
    onRevealRef.current = onRevealChange;
    propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
    fadeToContent,
    mobileStartWidth
    };
    refreshRef.current?.();
  }, [startWidth, startHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim, useWindowScroll, enabled, fadeToContent, mobileStartWidth, onRevealChange]);

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
      const media = mediaRef.current;
    if (!frame || (!media && !heroMorph)) return;
    const c = propsRef.current;

    const e = smoothstep(0, c.fadeToContent ? 0.65 : 1, p);
    const start = (stageRef.current?.clientWidth ?? 0) < 640 ? Math.max(c.startWidth, c.mobileStartWidth) : c.startWidth;

    const w = start + (100 - start) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    if (media) media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = c.fadeToContent ? smoothstep(0.25, 0.62, p) : smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
      hintRef.current.inert = gone > 0.99;
      hintRef.current.setAttribute('aria-hidden', String(gone > 0.99));
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      if (heroMorph) {
        const overlay = overlayRef.current;
        const stage = stageRef.current;
        const brand = overlay.querySelector<HTMLElement>('[data-testid="hero-tech-text"]');
        overlay.style.opacity = '1';
        const background = overlay.querySelector<HTMLElement>('[data-hero-background]');
        if (background) background.style.clipPath = frame.style.clipPath;
        overlay.style.setProperty('--hero-copy-opacity', String(smoothstep(0.5, 1, p)));
        overlay.inert = p < 0.95;
        overlay.style.pointerEvents = p >= 0.95 ? 'auto' : 'none';
        const ready = p >= 0.95;
        if (revealRef.current !== ready) {
          revealRef.current = ready;
          onRevealRef.current?.(ready);
        }
        if (brand && stage) {
          const box = brand.getBoundingClientRect();
          const bounds = stage.getBoundingClientRect();
          const baseX = box.left - bounds.left + box.width / 2 - morphRef.current.x;
          const baseY = box.top - bounds.top + box.height / 2 - morphRef.current.y;
          const move = 1 - smoothstep(0, 1, p);
          const x = (bounds.width / 2 - baseX) * move;
          const y = (bounds.height / 2 - baseY) * move;
          const initialScale = Math.min(5.5, Math.max(3.2, bounds.width * 0.65 / brand.offsetWidth));
          const scale = 1 + (initialScale - 1) * move;
          brand.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
          morphRef.current = { x, y };
        }
        if (skipFocusRef.current && p >= 0.99) {
          skipFocusRef.current = false;
          overlay.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true });
        }
        return;
      }
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = c.fadeToContent ? 'none' : `translate3d(0, ${18 * (1 - inn)}px, 0)`;
      overlayRef.current.style.pointerEvents = inn > 0.5 ? 'auto' : 'none';
      overlayRef.current.inert = inn <= 0.5;
      overlayRef.current.setAttribute('aria-hidden', String(inn < 0.01));
      if (c.fadeToContent) frame.style.opacity = `${1 - inn}`;
      const revealing = inn > 0.01;
      if (revealRef.current !== revealing) {
        revealRef.current = revealing;
        onRevealRef.current?.(revealing);
      }
      if (skipFocusRef.current && inn > 0.99) {
        skipFocusRef.current = false;
        overlayRef.current.querySelector<HTMLElement>('a[href], button')?.focus({ preventScroll: true });
      }
    }
  }, [heroMorph]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;
    let lastTime = 0;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = (time: number) => {
      const c = propsRef.current;
      const elapsed = lastTime ? Math.max(0, time - lastTime) / 1000 : 1 / 60;
      lastTime = time;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-elapsed / c.smoothing);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    refreshRef.current = onResize;
    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      refreshRef.current = null;
    };
  }, [applyProgress, useWindowScroll]);

  const skipToContent = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const root = rootRef.current;
    if (!track || !stage || !root) return;
    const distance = stage.clientHeight * Math.max(0, propsRef.current.scrollDistance);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    skipFocusRef.current = true;
    if (propsRef.current.useWindowScroll) {
      window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top + distance, behavior });
    } else {
      root.scrollTo({ top: distance, behavior });
    }
  }, []);

  const overlay = children ? (
    <div
      ref={overlayRef}
      data-scroll-overlay
      className={fadeToContent
        ? 'absolute inset-0 bg-black opacity-0 [will-change:opacity]'
        : 'absolute inset-0 flex flex-col items-center justify-center text-center p-[6%] opacity-0 [will-change:opacity,transform]'}
    >
      {children}
    </div>
  ) : null;

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
        src={src}
        alt={alt}
        draggable={false}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    );

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full ${useWindowScroll ? '' : 'overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} data-scroll-track className="relative w-full" style={useWindowScroll ? { height: `${100 * (1 + Math.max(0, scrollDistance) + Math.max(0, holdDistance))}svh` } : undefined}>
        <div ref={stageRef} data-scroll-stage className="sticky top-0 w-full overflow-hidden [--se-title-size:4rem]" style={{ height: useWindowScroll ? '100svh' : '100%' }}>
          <div
            ref={frameRef}
            data-scroll-frame
            className="absolute inset-0 [will-change:clip-path,opacity]"
            style={{ clipPath: `inset(${(100 - startHeight) / 2}% ${ (100 - startWidth) / 2}% round ${startRadius}px)` }}
          >
            {!heroMorph && media}
            <div
              ref={scrimRef}
              className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.35))]"
            />
            {!fadeToContent && overlay}
          </div>
          {fadeToContent && overlay}
          {title ? (
            <div
              ref={titleRef}
              data-scroll-title
              className="absolute inset-0 flex items-center justify-center m-0 px-[6%] text-center font-bold leading-none tracking-[-0.03em] text-white [font-size:var(--se-title-size)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] pointer-events-none [will-change:opacity,transform]"
            >
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div
              ref={hintRef}
              data-scroll-hint
              className="absolute inset-x-0 bottom-5 text-center text-[0.8125rem] tracking-[0.02em] text-white/55 pointer-events-none [will-change:opacity,transform]"
            >
              <button type="button" onClick={skipToContent}
                onMouseEnter={() => arrowRef.current?.startAnimation()}
                onMouseLeave={() => arrowRef.current?.stopAnimation()}
                onFocus={() => arrowRef.current?.startAnimation()}
                onBlur={() => arrowRef.current?.stopAnimation()}
                className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-white/75 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                {scrollHint} <ArrowDownIcon ref={arrowRef} loop />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
