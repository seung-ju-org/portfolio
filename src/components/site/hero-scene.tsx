"use client";
import { useEffect, useRef } from "react";

export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false,
      frame = 0,
      visible = true,
      loading = false;
    let cleanup = () => {};
    let draw: (() => void) | undefined;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const start = () => {
      if (!cancelled && draw && visible && !document.hidden && !frame) frame = requestAnimationFrame(render);
    };
    const render = () => {
      frame = 0;
      if (cancelled || !visible || document.hidden || !draw) return;
      draw();
      start();
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialize = () => {
      if (cancelled || motion.matches || draw || loading || !element.clientWidth || !element.clientHeight) return;
      loading = true;
      void import("three")
        .then((THREE) => {
          loading = false;
          if (cancelled || motion.matches || !element.clientWidth || !element.clientHeight) return;
          try {
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
            element.appendChild(renderer.domElement);
            const scene = new THREE.Scene(),
              camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100),
              group = new THREE.Group();
            camera.position.z = 8.2;
            scene.add(group);
            const material = new THREE.MeshStandardMaterial({ color: 0x9caf9b, metalness: 0.92, roughness: 0.22 });
            const points: [number, number, number][] = [
              [-2.1, 0.9, 0.2],
              [-1.2, -0.8, 0.3],
              [-0.2, 0.45, -0.5],
              [0.8, -0.75, 0.1],
              [1.8, 0.7, -0.2],
              [0.3, 1.35, 0.15]
            ];
            points.forEach((point, index) => {
              const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(index % 2 ? 0.3 : 0.43, 2), material);
              mesh.position.set(...point);
              group.add(mesh);
            });
            points.forEach((point, index) =>
              points.slice(index + 1).forEach((other, offset) => {
                if ((index + offset) % 2)
                  group.add(
                    new THREE.Line(
                      new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(...point),
                        new THREE.Vector3(...other)
                      ]),
                      new THREE.LineBasicMaterial({ color: 0x486a56, transparent: true, opacity: 0.55 })
                    )
                  );
              })
            );
            scene.add(new THREE.HemisphereLight(0xf6f3ea, 0x133526, 2.2));
            const light = new THREE.DirectionalLight(0xffffff, 3);
            light.position.set(3, 4, 5);
            scene.add(light);
            let mx = 0,
              my = 0;
            const resize = () => {
              const { width, height } = element.getBoundingClientRect();
              if (!width || !height) return;
              renderer.setSize(width, height);
              camera.aspect = width / height;
              camera.updateProjectionMatrix();
            };
            const pointer = (event: PointerEvent) => {
              const rect = element.getBoundingClientRect();
              mx = (event.clientX - rect.left - rect.width / 2) / rect.width;
              my = (event.clientY - rect.top - rect.height / 2) / rect.height;
            };
            resize();
            window.addEventListener("resize", resize);
            element.addEventListener("pointermove", pointer);
            draw = () => {
              group.rotation.y += (0.18 + mx - group.rotation.y) * 0.018;
              group.rotation.x += (-my * 0.35 - group.rotation.x) * 0.025;
              renderer.render(scene, camera);
              element.dataset.webglReady = "true";
            };
            const contextLost = () => {
              delete element.dataset.webglReady;
              stop();
            };
            cleanup = () => {
              window.removeEventListener("resize", resize);
              element.removeEventListener("pointermove", pointer);
              renderer.domElement.removeEventListener("webglcontextlost", contextLost);
              scene.traverse((object) => {
                const mesh = object as {
                  geometry?: { dispose: () => void };
                  material?: { dispose: () => void } | { dispose: () => void }[];
                };
                mesh.geometry?.dispose();
                if (Array.isArray(mesh.material)) mesh.material.forEach((item) => item.dispose());
                else mesh.material?.dispose();
              });
              renderer.dispose();
              renderer.domElement.remove();
            };
            renderer.domElement.addEventListener("webglcontextlost", contextLost);
            if (cancelled) cleanup();
            else start();
          } catch {
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
    observer.observe(element);
    const motionChange = () => {
      stop();
      initialize();
      start();
    };
    const visibilityChange = () => {
      if (document.hidden) stop();
      else {
        initialize();
        start();
      }
    };
    motion.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", visibilityChange);
    initialize();
    return () => {
      cancelled = true;
      stop();
      observer.disconnect();
      motion.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", visibilityChange);
      cleanup();
    };
  }, []);
  return (
    <div aria-hidden="true" className="hero-sculpture" ref={host}>
      <svg className="hero-fallback" viewBox="0 0 520 420">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M75 111 190 264 270 109 427 253 362 79 190 264" />
          <path d="M75 111 427 253M270 109 362 79" />
        </g>
        <g fill="currentColor">
          <circle cx="75" cy="111" r="18" />
          <circle cx="190" cy="264" r="28" />
          <circle cx="270" cy="109" r="22" />
          <circle cx="427" cy="253" r="25" />
          <circle cx="362" cy="79" r="16" />
        </g>
      </svg>
    </div>
  );
}
