import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Only check localStorage on the client side
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowConsent(true);
      }
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'accepted');
    }
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:bottom-4 sm:left-4 sm:right-auto">
      <div className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl p-3 sm:p-4 shadow-2xl max-w-full sm:max-w-[320px]">
        <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 text-left">
          This website uses cookies to enhance your experience.
        </p>
        <div className="flex justify-between items-center">
          <Link 
            href="/privacy-policy" 
            className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <button
            onClick={acceptCookies}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 
                     rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-xs sm:text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
