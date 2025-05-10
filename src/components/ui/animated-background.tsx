"use client";
import { useEffect, useRef, useState } from "react";

interface GridLine {
  x: number;
  y: number;
  length: number;
  isVertical: boolean;
}

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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

    setIsMounted(true);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with high DPI support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set display size (css pixels)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale context to match DPI
      ctx.scale(dpr, dpr);
      
      // Set CSS size
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles with varied sizes and colors - REDUCED COUNT
    const particles = Array.from({ length: 25 }, () => {
      const size = Math.random() * 1.5 + 0.5;
      // Create a more hacking-themed color palette with emphasis on greens and blues
      const colors = [
        `rgba(16, 185, 129, ${Math.random() * 0.15 + 0.05})`, // green (higher opacity)
        `rgba(14, 165, 115, ${Math.random() * 0.15 + 0.05})`, // green variant
        `rgba(59, 130, 246, ${Math.random() * 0.1 + 0.05})`, // blue
        `rgba(6, 182, 212, ${Math.random() * 0.1 + 0.03})`, // cyan
      ];
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        speedX: (Math.random() - 0.5) * 0.2, // Slightly slower
        speedY: (Math.random() - 0.5) * 0.2, // Slightly slower
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseAmount: Math.random() * 0.4 + 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    // Create grid lines with larger spacing
    const gridSize = 250; // Increased spacing
    const gridLines: GridLine[] = [];
    for (let x = 0; x < window.innerWidth; x += gridSize) {
      gridLines.push({ x, y: 0, length: window.innerHeight, isVertical: true });
    }
    for (let y = 0; y < window.innerHeight; y += gridSize) {
      gridLines.push({ x: 0, y, length: window.innerWidth, isVertical: false });
    }

    // Create connection lines
    const connections: Connection[] = [];

    // Add occasional "pulse" effect nodes - REDUCED COUNT
    const pulseNodes = Array.from({ length: 3 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 0,
      maxRadius: Math.random() * 120 + 50,
      speed: Math.random() * 0.7 + 0.3, // Slower expansion
      active: false,
      activationDelay: Math.random() * 15000 + 8000, // Longer delays
      lastActivated: Date.now() - (Math.random() * 10000),
      color: Math.random() > 0.3 ? 'rgba(16, 185, 129, 0.04)' : 'rgba(59, 130, 246, 0.03)' // Mostly green
    }));

    // Animation loop with throttling
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastFrameTime;
      
      if (deltaTime >= frameInterval) {
        lastFrameTime = timestamp - (deltaTime % frameInterval);
        
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw grid lines with perspective effect - more subtle
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

        // Draw pulse nodes
        const now = Date.now();
        pulseNodes.forEach(node => {
          if (!node.active && now - node.lastActivated > node.activationDelay) {
            node.active = true;
            node.radius = 0;
          }
          
          if (node.active) {
            node.radius += node.speed;
            
            if (node.radius > node.maxRadius) {
              node.active = false;
              node.radius = 0;
              node.lastActivated = now;
            }
            
            // Create gradient for pulse
            const gradient = ctx.createRadialGradient(
              node.x, node.y, 0,
              node.x, node.y, node.radius
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
            gradient.addColorStop(0.5, node.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Update and draw particles
        particles.forEach((particle) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Pulse size effect
          const pulseFactor = Math.sin(timestamp * particle.pulseSpeed + particle.pulseOffset) * particle.pulseAmount + 1;
          const currentSize = particle.size * pulseFactor;

          // Bounce off edges
          if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });

        // Draw connections - more selective
        connections.length = 0;
        const maxDistance = 120; // Reduced connection distance
        
        // Only connect every 3rd particle to reduce density
        for (let i = 0; i < particles.length; i += 3) {
          const p1 = particles[i];
          for (let j = i + 3; j < particles.length; j += 3) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const squareDistance = dx * dx + dy * dy;

            if (squareDistance < maxDistance * maxDistance) {
              // Calculate opacity based on distance
              const distance = Math.sqrt(squareDistance);
              const opacity = 1 - distance / maxDistance;
              
              connections.push({
                x1: p1.x,
                y1: p1.y,
                x2: p2.x,
                y2: p2.y,
                opacity
              });
            }
          }
        }

        // Draw connections with gradient
        connections.forEach(conn => {
          const gradient = ctx.createLinearGradient(conn.x1, conn.y1, conn.x2, conn.y2);
          gradient.addColorStop(0, `rgba(16, 185, 129, ${0.04 * conn.opacity})`); // Green tint
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8; // Thinner lines
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
  }, [isVisible, isMounted]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ opacity: 0.5 }} // Slightly increased opacity
    />
  );
}; 