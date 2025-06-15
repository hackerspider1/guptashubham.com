/**
 * Utility functions for performance optimization
 */

/**
 * Lazy loads images that are currently not in the viewport
 */
export const lazyLoadImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
          }
          
          lazyImage.classList.remove('lazy');
          imageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach((image) => {
      imageObserver.observe(image);
    });
  }
};

/**
 * Defers non-critical resources
 */
export const deferNonCriticalResources = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      // Load non-critical CSS
      const linkElements = document.querySelectorAll('link[data-defer="true"]');
      linkElements.forEach(link => {
        (link as HTMLLinkElement).media = 'all';
      });
      
      // Load non-critical scripts
      const scriptElements = document.querySelectorAll('script[data-defer="true"]');
      scriptElements.forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
          if (attr.name !== 'data-defer') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
        newScript.textContent = script.textContent;
        script.parentNode?.replaceChild(newScript, script);
      });
    }, 2000); // Wait 2 seconds after page load
  }
};

/**
 * Preloads critical resources
 */
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontUrls = [
      '/fonts/inter.woff2',
    ];
    
    fontUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload critical images
    const criticalImages = [
      '/grid.svg',
      '/logos/burp.png',
      '/logos/nmap.jpeg',
    ];
    
    criticalImages.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }
};

/**
 * Optimizes animations for better performance
 */
export const optimizeAnimations = () => {
  if (typeof window !== 'undefined') {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    // Use will-change sparingly and remove after animation
    const animatedElements = document.querySelectorAll('[data-animate="true"]');
    animatedElements.forEach(element => {
      const el = element as HTMLElement;
      el.style.willChange = 'transform, opacity';
      
      // Remove will-change after animation completes
      setTimeout(() => {
        el.style.willChange = 'auto';
      }, 1000);
    });
  }
};

/**
 * Debounces scroll events for better performance
 */
export const optimizeScrollEvents = () => {
  if (typeof window !== 'undefined') {
    let ticking = false;
    
    const updateScrollPosition = () => {
      // Update scroll-dependent elements here
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
  }
};

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Run immediately
    lazyLoadImages();
    preloadCriticalResources();
    optimizeAnimations();
    optimizeScrollEvents();
    
    // Run after page load
    window.addEventListener('load', () => {
      deferNonCriticalResources();
    });
  }
}; 