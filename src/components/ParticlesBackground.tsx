"use client";

import React, { useEffect, useRef, useState } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      if (canvas && window) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Create particles
    let particles: Particle[] = [];
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const numParticles = Math.min(window.innerWidth, window.innerHeight) * 0.07;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    };

    setCanvasSize();
    init();
    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      setCanvasSize();
      init();
    });

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-black" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-black"
    />
  );
};

export default ParticlesBackground;
