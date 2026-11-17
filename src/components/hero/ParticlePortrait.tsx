"use client";

import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type ParticleSample = {
  targets: Float32Array;
  scatter: Float32Array;
  colors: Float32Array;
  opacities: Float32Array;
  seeds: Float32Array;
  aspect: number;
  sampleStep: number;
  subjectWidth: number;
};

const PORTRAIT_PATH = "/images/hamza-portrait-transparent.png";
const MAX_PARTICLES = 12000;
const FORMATION_SECONDS = 4.8;

const vertexShader = `
  attribute vec3 aTarget;
  attribute vec3 aColor;
  attribute float aOpacity;
  attribute float aSeed;
  uniform float uProgress;
  uniform float uTime;
  uniform float uPointSize;
  uniform vec2 uPointer;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float progress = clamp(uProgress, 0.0, 1.0);
    float eased = 1.0 - pow(1.0 - progress, 3.0);
    vec3 positionNow = mix(position, aTarget, eased);
    float formationEnergy = sin(progress * 3.14159265);
    float drift = 0.004 + formationEnergy * 0.11;

    positionNow.x += sin(uTime * 0.58 + aSeed * 19.0) * drift;
    positionNow.y += cos(uTime * 0.47 + aSeed * 23.0) * drift;
    positionNow.z += sin(uTime * 0.72 + aSeed * 13.0) * (0.025 + formationEnergy * 0.08);
    positionNow.xy += uPointer * (0.025 + formationEnergy * 0.045);

    vec4 viewPosition = modelViewMatrix * vec4(positionNow, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uPointSize * (1.0 + 1.2 / max(1.0, -viewPosition.z));
    vColor = aColor;
    vAlpha = (0.72 + 0.28 * eased) * aOpacity;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float radius = length(gl_PointCoord - 0.5);
    float softness = 1.0 - smoothstep(0.18, 0.5, radius);
    if (softness < 0.015) discard;
    gl_FragColor = vec4(vColor, softness * vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function ParticleCloud({
  mode,
  onFormationComplete,
  onImageError,
}: {
  mode: "intro" | "inline";
  onFormationComplete?: () => void;
  onImageError?: () => void;
}) {
  const [samples, setSamples] = useState<ParticleSample | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const formationStart = useRef<number | null>(null);
  const hasCompletedFormation = useRef(false);
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const gl = useThree((state) => state.gl);
  const progress = useRef(0);
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      const downsample = Math.min(1, 480 / Math.max(image.naturalWidth, image.naturalHeight));
      const width = Math.max(1, Math.round(image.naturalWidth * downsample));
      const height = Math.max(1, Math.round(image.naturalHeight * downsample));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        onImageError?.();
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      const pixels = context.getImageData(0, 0, width, height).data;
      const targets: number[] = [];
      const colors: number[] = [];
      const opacities: number[] = [];
      const seeds: number[] = [];
      let subjectMinX = width;
      let subjectMinY = height;
      let subjectMaxX = -1;
      let subjectMaxY = -1;

      for (let pixelY = 0; pixelY < height; pixelY += 1) {
        for (let pixelX = 0; pixelX < width; pixelX += 1) {
          const alpha = pixels[(pixelY * width + pixelX) * 4 + 3];
          if (alpha < 16) continue;

          subjectMinX = Math.min(subjectMinX, pixelX);
          subjectMinY = Math.min(subjectMinY, pixelY);
          subjectMaxX = Math.max(subjectMaxX, pixelX);
          subjectMaxY = Math.max(subjectMaxY, pixelY);
        }
      }

      if (subjectMaxX < subjectMinX || subjectMaxY < subjectMinY) {
        onImageError?.();
        return;
      }

      const subjectWidth = subjectMaxX - subjectMinX + 1;
      const subjectHeight = subjectMaxY - subjectMinY + 1;
      const step = Math.max(2, Math.ceil(Math.sqrt((subjectWidth * subjectHeight) / MAX_PARTICLES)));

      for (let pixelY = subjectMinY, rowIndex = 0; pixelY <= subjectMaxY; pixelY += step, rowIndex += 1) {
        const rowOffset = rowIndex % 2 === 0 ? 0 : Math.floor(step / 2);
        for (let pixelX = subjectMinX + rowOffset; pixelX <= subjectMaxX; pixelX += step) {
          const index = (pixelY * width + pixelX) * 4;
          if (pixels[index + 3] < 16) continue;

          const red = pixels[index] / 255;
          const green = pixels[index + 1] / 255;
          const blue = pixels[index + 2] / 255;
          const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
          const particleLuminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
          const particleBrightness = Math.pow(particleLuminance, 0.82);
          const grayscale = new THREE.Color().setRGB(
            particleBrightness,
            particleBrightness,
            particleBrightness,
            THREE.SRGBColorSpace,
          );

          targets.push(
            (pixelX - subjectMinX + 0.5) / subjectWidth,
            (pixelY - subjectMinY + 0.5) / subjectHeight,
            (luminance - 0.5) * 0.18,
          );
          colors.push(grayscale.r, grayscale.g, grayscale.b);
          opacities.push(pixels[index + 3] / 255);
          const seedValue = Math.sin(pixelX * 127.1 + pixelY * 311.7) * 43758.5453;
          seeds.push(seedValue - Math.floor(seedValue));
        }
      }

      if (targets.length === 0) {
        onImageError?.();
        return;
      }

      let targetMinX = Infinity;
      let targetMinY = Infinity;
      let targetMaxX = -Infinity;
      let targetMaxY = -Infinity;
      for (let index = 0; index < targets.length; index += 3) {
        targetMinX = Math.min(targetMinX, targets[index]);
        targetMinY = Math.min(targetMinY, targets[index + 1]);
        targetMaxX = Math.max(targetMaxX, targets[index]);
        targetMaxY = Math.max(targetMaxY, targets[index + 1]);
      }

      const targetOffsetX = 0.5 - (targetMinX + targetMaxX) / 2;
      const targetOffsetY = 0.5 - (targetMinY + targetMaxY) / 2;
      for (let index = 0; index < targets.length; index += 3) {
        targets[index] += targetOffsetX;
        targets[index + 1] += targetOffsetY;
      }

      const targetArray = new Float32Array(targets);
      const scatterArray = new Float32Array(targetArray.length);
      for (let index = 0; index < seeds.length; index += 1) {
        const randomA = (Math.sin((index + 1) * 127.1) * 43758.5453) % 1;
        const randomB = (Math.sin((index + 1) * 269.5) * 24634.6345) % 1;
        const randomC = (Math.sin((index + 1) * 183.3) * 56445.2341) % 1;
        scatterArray[index * 3] = randomA * 10;
        scatterArray[index * 3 + 1] = randomB * 11;
        scatterArray[index * 3 + 2] = randomC * 12 - 6;
      }

      setSamples({
        targets: targetArray,
        scatter: scatterArray,
        colors: new Float32Array(colors),
        opacities: new Float32Array(opacities),
        seeds: new Float32Array(seeds),
        aspect: subjectWidth / subjectHeight,
        sampleStep: step,
        subjectWidth,
      });
    };
    image.onerror = () => onImageError?.();

    image.src = PORTRAIT_PATH;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [onImageError]);

  const geometry = useMemo(() => {
    if (!samples) return null;

    const widthRatio = size.width < 640 ? 0.93 : size.width < 1024 ? 0.84 : 0.72;
    const maxWidth = viewport.width * widthRatio;
    const maxHeight = viewport.height * (mode === "intro" ? 0.84 : 0.88);
    const imageWidth = Math.min(maxWidth, maxHeight * samples.aspect);
    const imageHeight = imageWidth / samples.aspect;
    const targets = new Float32Array(samples.targets.length);
    for (let index = 0; index < samples.targets.length; index += 3) {
      targets[index] = (samples.targets[index] - 0.5) * imageWidth;
      targets[index + 1] = (0.5 - samples.targets[index + 1]) * imageHeight;
      targets[index + 2] = samples.targets[index + 2];
    }

    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(mode === "intro" ? samples.scatter : targets, 3),
    );
    nextGeometry.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
    nextGeometry.setAttribute("aColor", new THREE.BufferAttribute(samples.colors, 3));
    nextGeometry.setAttribute("aOpacity", new THREE.BufferAttribute(samples.opacities, 1));
    nextGeometry.setAttribute("aSeed", new THREE.BufferAttribute(samples.seeds, 1));
    nextGeometry.computeBoundingSphere();
    return nextGeometry;
  }, [mode, samples, size.width, viewport.height, viewport.width]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uProgress: { value: mode === "inline" ? 1 : 0 },
          uTime: { value: 0 },
          uPointSize: { value: mode === "intro" ? 3.1 : 2.8 },
          uPointer: { value: new THREE.Vector2() },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    [mode],
  );

  useEffect(() => () => {
    geometry?.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points || !samples) return;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    const widthRatio = size.width < 640 ? 0.93 : size.width < 1024 ? 0.84 : 0.72;
    const targetWidth = Math.min(
      viewport.width * widthRatio,
      viewport.height * (mode === "intro" ? 0.84 : 0.88) * samples.aspect,
    );
    const samplePitch =
      (samples.sampleStep / samples.subjectWidth) *
      targetWidth *
      (size.width / viewport.width) *
      gl.getPixelRatio();
    material.uniforms.uPointSize.value = THREE.MathUtils.clamp(samplePitch * 0.5, 2.4, 6);
    pointer.current.set(state.pointer.x, state.pointer.y);
    material.uniforms.uPointer.value.lerp(pointer.current, Math.min(1, delta * 3));
    if (mode === "intro") {
      if (formationStart.current === null) formationStart.current = state.clock.elapsedTime;
      progress.current = Math.min(
        1,
        (state.clock.elapsedTime - formationStart.current) / FORMATION_SECONDS,
      );
      material.uniforms.uProgress.value = progress.current;
      if (progress.current === 1 && !hasCompletedFormation.current) {
        hasCompletedFormation.current = true;
        onFormationComplete?.();
      }
    }
    points.rotation.y = THREE.MathUtils.lerp(points.rotation.y, state.pointer.x * 0.08, 0.04);
    points.rotation.x = THREE.MathUtils.lerp(points.rotation.x, -state.pointer.y * 0.06, 0.04);
  });

  if (!samples || !geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}

export default function ParticlePortrait() {
  const [isWebglAvailable, setIsWebglAvailable] = useState<boolean | null>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [introStage, setIntroStage] = useState<"forming" | "title" | "exiting">("forming");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleImageError = useCallback(() => setIsWebglAvailable(false), []);

  useEffect(() => {
    setIsMounted(true);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(prefersReducedMotion);
    if (prefersReducedMotion) {
      setIsIntroComplete(true);
    }

    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return !!context;
      } catch {
        return false;
      }
    })();

    setIsWebglAvailable(hasWebGL);
  }, []);

  useEffect(() => {
    if (introStage !== "title") return;
    const timeout = window.setTimeout(() => setIntroStage("exiting"), 1500);
    return () => window.clearTimeout(timeout);
  }, [introStage]);

  useEffect(() => {
    if (introStage !== "exiting") return;
    const timeout = window.setTimeout(() => setIsIntroComplete(true), 900);
    return () => window.clearTimeout(timeout);
  }, [introStage]);

  if (isWebglAvailable === false) {
    return (
      <div className="relative h-full w-full min-w-0">
        <Image
          src={PORTRAIT_PATH}
          alt="Hamza Imtiaz portrait"
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>
    );
  }

  if (isWebglAvailable === null || (reduceMotion && !isIntroComplete)) {
    return <div className="relative h-full w-full min-w-0" aria-hidden="true" />;
  }

  if (!isIntroComplete && isMounted) {
    return createPortal(
      <div
        className={`fixed inset-0 z-[100] bg-[#05070b] transition-opacity duration-[900ms] ${
          introStage === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="Hamza Imtiaz particle portrait introduction"
        aria-live="polite"
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ParticleCloud
            mode="intro"
            onFormationComplete={() => setIntroStage("title")}
            onImageError={handleImageError}
          />
        </Canvas>
      </div>,
      document.body,
    );
  }

  return (
    <div className="relative h-full w-full min-w-0">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ParticleCloud mode="inline" onImageError={handleImageError} />
      </Canvas>
    </div>
  );
}
