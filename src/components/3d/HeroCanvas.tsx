'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'default',
      });
    } catch (err) {
      console.warn('WebGL initialization failed, using visual fallback:', err);
      setWebGLError(true);
      return;
    }

    const getDimensions = () => {
      const width = canvas.parentElement?.clientWidth || canvas.clientWidth || 500;
      const height = canvas.parentElement?.clientHeight || canvas.clientHeight || 520;
      return { width, height };
    };

    const { width, height } = getDimensions();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      width / Math.max(height, 1),
      0.1,
      1000
    );
    camera.position.z = 24;

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const group = new THREE.Group();
    scene.add(group);

    // 1. Outer Icosahedron Wireframe
    const icoGeometry = new THREE.IcosahedronGeometry(7.5, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xC8B195, // Khaki
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    group.add(icosahedron);

    // 2. Central Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(3.6, 0.85, 128, 32);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x5C3A21, // Luxury Brown
      roughness: 0.25,
      metalness: 0.85,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knot);

    // 3. DNA / Molecular particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 9 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xD4AF37, // Gold accent
      size: 0.2,
      transparent: true,
      opacity: 0.8,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xE5D9CC, 3, 60);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xD4AF37, 3, 60);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      const { width: newW, height: newH } = getDimensions();
      camera.aspect = newW / Math.max(newH, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH, false);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = elapsedTime * 0.2 + mouseX;
      group.rotation.x = elapsedTime * 0.1 + mouseY;

      knot.rotation.x = elapsedTime * 0.3;
      knot.rotation.y = elapsedTime * 0.4;

      particleSystem.rotation.y = -elapsedTime * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      icoGeometry.dispose();
      icoMaterial.dispose();
      knotGeometry.dispose();
      knotMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-[460px] md:h-[540px] relative flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10"
        style={{ touchAction: 'none' }}
      />

      {/* Fallback Graphic (shows if WebGL fails) */}
      {webGLError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-somaro-khaki-soft/40 to-white z-0">
          <div className="w-24 h-24 rounded-full border-4 border-somaro-khaki border-t-somaro-brown animate-spin mb-4" />
          <div className="font-serif font-bold text-2xl text-somaro-brown">SOMARO MEDIKA UTAMA</div>
          <div className="text-xs text-somaro-khaki-dark uppercase tracking-widest mt-1">
            Integrated Healthcare Holding
          </div>
        </div>
      )}
    </div>
  );
}
