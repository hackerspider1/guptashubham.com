"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GridLine {
  x: number;
  y: number;
  length: number;
  isVertical: boolean;
}

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only initialize the animation once the component is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Reduce the number of particles for better performance
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2, // Slower motion
      speedY: (Math.random() - 0.5) * 0.2, // Slower motion
      color: `rgba(255, 255, 255, ${Math.random() * 0.05})`,
    }));

    // Create fewer grid lines for better performance
    const gridSize = 200; // Larger grid size
    const gridLines: GridLine[] = [];
    for (let x = 0; x < canvas.width; x += gridSize) {
      gridLines.push({ x, y: 0, length: canvas.height, isVertical: true });
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      gridLines.push({ x: 0, y, length: canvas.width, isVertical: false });
    }

    // Create connection lines
    const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];

    // Animation loop with throttling
    let lastFrameTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastFrameTime;
      
      if (deltaTime >= frameInterval) {
        lastFrameTime = timestamp - (deltaTime % frameInterval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines with perspective effect
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
        ctx.lineWidth = 1;
        gridLines.forEach(line => {
          ctx.beginPath();
          if (line.isVertical) {
            ctx.moveTo(line.x, 0);
            ctx.lineTo(line.x, line.length);
          } else {
            ctx.moveTo(0, line.y);
            ctx.lineTo(line.length, line.y);
          }
          ctx.stroke();
        });

        // Update and draw particles
        particles.forEach((particle) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });

        // Draw connections only for particles that are close to each other (less computation)
        connections.length = 0;
        const maxDistance = 150; // Reduced connection distance
        particles.forEach((p1, i) => {
          // Only check every other particle for connections to reduce calculations
          for (let j = i + 2; j < particles.length; j += 2) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            // Use square distance to avoid expensive sqrt operations
            const squareDistance = dx * dx + dy * dy;

            if (squareDistance < maxDistance * maxDistance) {
              connections.push({
                x1: p1.x,
                y1: p1.y,
                x2: p2.x,
                y2: p2.y,
              });
            }
          }
        });

        // Draw connections with gradient
        connections.forEach(conn => {
          const gradient = ctx.createLinearGradient(conn.x1, conn.y1, conn.x2, conn.y2);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(conn.x1, conn.y1);
          ctx.lineTo(conn.x2, conn.y2);
          ctx.stroke();
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ opacity: 0.3 }}
    />
  );
}; 