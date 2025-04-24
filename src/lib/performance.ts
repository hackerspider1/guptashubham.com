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
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Run immediately
    lazyLoadImages();
    
    // Run after page load
    window.addEventListener('load', () => {
      deferNonCriticalResources();
    });
  }
}; 