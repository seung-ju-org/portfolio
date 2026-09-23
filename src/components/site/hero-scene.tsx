"use client";

import { useEffect, useRef } from "react";
import type { WebGLRenderer } from "three";

export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let frame = 0;
    let visible = true;
    let loading = false;
    let contextUnavailable = false;
    let draw: (() => void) | undefined;
    let disposeScene = () => {};
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const render = () => {
      frame = 0;
      if (cancelled || !visible || document.hidden || !draw) return;
      draw();
      frame = requestAnimationFrame(render);
    };
    const start = () => {
      if (!cancelled && visible && !document.hidden && draw && !frame) frame = requestAnimationFrame(render);
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialize = () => {
      if (
        cancelled ||
        contextUnavailable ||
        motion.matches ||
        draw ||
        loading ||
        !element.clientWidth ||
        !element.clientHeight
      )
        return;
      loading = true;
      void import("three")
        .then((THREE) => {
          loading = false;
          if (cancelled || motion.matches || !element.clientWidth || !element.clientHeight) return;
          let renderer: WebGLRenderer | undefined;
          const resources: { dispose: () => void }[] = [];
          let removeListeners = () => {};
          try {
            const webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer = webglRenderer;
            webglRenderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
            element.appendChild(webglRenderer.domElement);
            disposeScene = () => {
              delete element.dataset.webglReady;
              draw = undefined;
              removeListeners();
              resources.forEach((resource) => resource.dispose());
              renderer?.dispose();
              renderer?.domElement.remove();
              disposeScene = () => {};
            };
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
            const sculpture = new THREE.Group();
            camera.position.set(0, 0.05, 8.6);
            scene.add(sculpture);
            // A hand-built pleated sheet: fine folds catch the lights while its envelope reads as one object.
            const columns = 96,
              rows = 42,
              positions: number[] = [],
              ridgePositions: number[] = [];
            const pointAt = (column: number, row: number) => {
              const u = column / columns,
                v = row / rows,
                bend = Math.sin(u * Math.PI);
              return new THREE.Vector3(
                (u - 0.5) * 5.9 + 0.12 * Math.sin(v * Math.PI * 2),
                (v - 0.5) * 5.15 + 0.26 * Math.sin(u * Math.PI * 2.2),
                0.44 * Math.sin(u * Math.PI * 18) * (0.36 + bend * 0.64) +
                  0.42 * Math.cos(v * Math.PI * 1.45 + u * Math.PI * 0.8) * bend -
                  0.13 * Math.cos(u * Math.PI * 2)
              );
            };
            for (let row = 0; row <= rows; row++)
              for (let column = 0; column <= columns; column++) {
                const point = pointAt(column, row);
                positions.push(point.x, point.y, point.z);
              }
            const indices: number[] = [];
            for (let row = 0; row < rows; row++)
              for (let column = 0; column < columns; column++) {
                const a = row * (columns + 1) + column,
                  b = a + 1,
                  c = a + columns + 1;
                indices.push(a, c, b, b, c, c + 1);
              }
            for (let column = 2; column < columns; column += 4)
              for (let row = 0; row < rows; row++) {
                const a = pointAt(column, row),
                  b = pointAt(column, row + 1);
                ridgePositions.push(a.x, a.y, a.z + 0.014, b.x, b.y, b.z + 0.014);
              }
            const surface = new THREE.BufferGeometry();
            surface.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
            surface.setIndex(indices);
            surface.computeVertexNormals();
            resources.push(surface);
            const body = new THREE.Mesh(
              surface,
              new THREE.MeshPhysicalMaterial({
                color: 0xbdb9b0,
                metalness: 0.9,
                roughness: 0.31,
                clearcoat: 0.18,
                clearcoatRoughness: 0.42,
                side: THREE.DoubleSide
              })
            );
            resources.push(body.material);
            const ridges = new THREE.LineSegments(
              new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(ridgePositions, 3)),
              new THREE.LineBasicMaterial({ color: 0xf0ece2, transparent: true, opacity: 0.26 })
            );
            resources.push(ridges.geometry, ridges.material);
            sculpture.add(body, ridges);
            sculpture.rotation.set(-0.13, -0.36, -0.06);
            sculpture.position.set(0.8, 0.05, 0);
            scene.add(new THREE.HemisphereLight(0xf7f2e7, 0x242321, 2.1));
            const key = new THREE.DirectionalLight(0xfffcf4, 3.5);
            key.position.set(-3.8, 4.4, 5.5);
            scene.add(key);
            const rim = new THREE.DirectionalLight(0xd9d1c2, 4.2);
            rim.position.set(4.5, 1.4, -2.4);
            scene.add(rim);
            let mx = 0,
              my = 0;
            const resize = () => {
              const { width, height } = element.getBoundingClientRect();
              if (!width || !height || !renderer) return;
              renderer.setSize(width, height, false);
              camera.aspect = width / height;
              camera.position.z = width < height ? 9.4 : 8.6;
              sculpture.scale.setScalar(width < height ? 0.82 : 1);
              sculpture.position.x = width < height ? 0 : 0.8;
              camera.updateProjectionMatrix();
            };
            const pointer = (event: PointerEvent) => {
              const rect = element.getBoundingClientRect();
              mx = (event.clientX - rect.left - rect.width / 2) / rect.width;
              my = (event.clientY - rect.top - rect.height / 2) / rect.height;
            };
            const contextLost = (event: Event) => {
              event.preventDefault();
              contextUnavailable = true;
              stop();
              disposeScene();
            };
            resize();
            window.addEventListener("resize", resize);
            element.addEventListener("pointermove", pointer);
            webglRenderer.domElement.addEventListener("webglcontextlost", contextLost);
            removeListeners = () => {
              window.removeEventListener("resize", resize);
              element.removeEventListener("pointermove", pointer);
              renderer?.domElement.removeEventListener("webglcontextlost", contextLost);
            };
            draw = () => {
              const time = performance.now() * 0.00035;
              sculpture.rotation.y += (-0.36 + mx * 0.16 + Math.sin(time) * 0.028 - sculpture.rotation.y) * 0.018;
              sculpture.rotation.x += (-0.13 - my * 0.12 + Math.cos(time * 0.8) * 0.018 - sculpture.rotation.x) * 0.018;
              sculpture.rotation.z +=
                (-0.06 + mx * 0.035 + Math.sin(time * 0.7) * 0.012 - sculpture.rotation.z) * 0.014;
              renderer?.render(scene, camera);
              element.dataset.webglReady = "true";
            };
            disposeScene = () => {
              delete element.dataset.webglReady;
              draw = undefined;
              removeListeners();
              resources.forEach((resource) => resource.dispose());
              renderer?.dispose();
              renderer?.domElement.remove();
              disposeScene = () => {};
            };
            if (cancelled || motion.matches) disposeScene();
            else start();
          } catch {
            disposeScene();
            element.dataset.webglFailed = "true";
          }
        })
        .catch(() => {
          loading = false;
          if (!cancelled) element.dataset.webglFailed = "true";
        });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (!visible) stop();
        initialize();
        start();
      },
      { threshold: 0.05 }
    );
    const motionChange = () => {
      stop();
      if (motion.matches) disposeScene();
      else initialize();
      start();
    };
    const visibilityChange = () => {
      if (document.hidden) stop();
      else {
        initialize();
        start();
      }
    };
    observer.observe(element);
    motion.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", visibilityChange);
    initialize();
    return () => {
      cancelled = true;
      stop();
      observer.disconnect();
      motion.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", visibilityChange);
      disposeScene();
    };
  }, []);
  return (
    <div aria-hidden="true" className="hero-sculpture" ref={host}>
      <svg className="hero-fallback" viewBox="0 0 520 420" role="presentation">
        <defs>
          <linearGradient id="folded-silver" x1="0" x2="1" y1="0.15" y2="0.85">
            <stop stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="0.48" stopColor="currentColor" stopOpacity="0.24" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.72" />
          </linearGradient>
        </defs>
        <path
          d="M54 104C121 71 178 95 244 62c70-35 139-11 221 32v179c-61 29-122 4-184 39-69 39-149 13-227-20Z"
          fill="url(#folded-silver)"
          opacity="0.72"
        />
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path
            d="M67 113c52 57 60 113 8 174M91 101c61 55 72 124 10 194M117 90c63 53 78 137 14 210M146 84c67 61 80 143 15 223M177 82c70 66 83 151 14 231M211 76c75 69 90 164 17 238M247 66c71 78 89 174 18 255M286 62c64 77 85 178 19 263M326 66c54 75 77 176 16 254M365 74c48 68 66 159 10 238M403 85c41 60 54 142 5 214M437 99c35 50 43 121 1 183"
            strokeWidth="2.1"
            opacity="0.88"
          />
          <path
            d="M54 104C121 71 178 95 244 62c70-35 139-11 221 32M54 283c78 33 158 59 227 20 62-35 123-10 184-39"
            strokeWidth="1"
            opacity="0.55"
          />
        </g>
      </svg>
    </div>
  );
}
