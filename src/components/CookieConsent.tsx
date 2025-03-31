import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 max-w-[320px] z-50">
      <div className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl">
        <p className="text-sm text-gray-300 mb-4 text-left">
          This website uses cookies to enhance your experience.
        </p>
        <div className="flex justify-between items-center">
          <Link 
            href="/privacy-policy" 
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 
                     rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
