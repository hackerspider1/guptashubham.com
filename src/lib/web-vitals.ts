type WebVitalsMetric = {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
};

type ReportHandler = (metric: WebVitalsMetric) => void;

const getCLS = (onReport: ReportHandler) => {
  if (typeof window === 'undefined') return;

  // Use the web-vitals polyfill when available
  if ('cumulativeLayoutShift' in window.performance) {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const metric = entry as any;
        const value = metric.value;
        
        // Determine the rating based on Google's thresholds
        let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
        if (value > 0.1) rating = 'needs-improvement';
        if (value > 0.25) rating = 'poor';
        
        onReport({
          id: `cls-${Date.now()}`,
          name: 'CLS',
          value,
          delta: value,
          rating
        });
      }
    });

    observer.observe({type: 'layout-shift', buffered: true});
  }
};

const getLCP = (onReport: ReportHandler) => {
  if (typeof window === 'undefined') return;

  // Use the web-vitals polyfill when available
  if ('largestContentfulPaint' in window.performance) {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const metric = entry as any;
        const value = metric.startTime;

        // LCP thresholds: good <= 2.5s, poor > 4s
        let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
        if (value > 2500) rating = 'needs-improvement';
        if (value > 4000) rating = 'poor';
        
        onReport({
          id: `lcp-${Date.now()}`,
          name: 'LCP',
          value,
          delta: value,
          rating
        });
      }
    });

    observer.observe({type: 'largest-contentful-paint', buffered: true});
  }
};

const getFID = (onReport: ReportHandler) => {
  if (typeof window === 'undefined') return;

  // Use the web-vitals polyfill when available
  if ('firstInputDelay' in performance) {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const metric = entry as any;
        const value = metric.processingStart - metric.startTime;

        // FID thresholds: good <= 100ms, poor > 300ms
        let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
        if (value > 100) rating = 'needs-improvement';
        if (value > 300) rating = 'poor';
        
        onReport({
          id: `fid-${Date.now()}`,
          name: 'FID',
          value,
          delta: value,
          rating
        });
      }
    });

    observer.observe({type: 'first-input', buffered: true});
  }
};

export const reportWebVitals = (onMetric: (metric: WebVitalsMetric) => void) => {
  if (typeof window === 'undefined') return;
  
  getCLS(onMetric);
  getLCP(onMetric);
  getFID(onMetric);
  
  // Log the metrics to console during development
  if (process.env.NODE_ENV !== 'production') {
    const logMetric = (metric: WebVitalsMetric) => {
      console.log(`Web Vital: ${metric.name} - ${metric.value}ms (${metric.rating})`);
    };
    
    getCLS(logMetric);
    getLCP(logMetric);
    getFID(logMetric);
  }
}; 