import React, { useEffect, useState } from 'react';

interface BackToTopProps {
  text?: string;
  size?: number;
}

const BackToTop: React.FC<BackToTopProps> = ({ 
  text = 'BACK TO TOP — ',
  size = 120 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // 計算需要重複的次數來填滿圓周
  // 圓周長 = 2 * π * r，其中 r = 75 (SVG viewBox 中的半徑)
  const radius = 75;
  const circumference = 2 * Math.PI * radius; // ≈ 471
  // 假設每個字元平均佔據 12 個單位 (fontSize 16 + letterSpacing)
  const charWidth = 12;
  const textLength = text.length * charWidth;
  const repeatCount = Math.ceil(circumference / textLength);
  const repeatedText = text.repeat(repeatCount);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 cursor-pointer group transition-all duration-500 select-none ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-90 pointer-events-none'
      }`}
      style={{ zIndex: 50 }}
    >
      <div 
        className="relative rounded-full duration-300"
        style={{ 
          width: size, 
          height: size,
        }}
      >
        {/* Rotating text ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full animate-spin-slow select-none"
          style={{ animationDuration: '8s', userSelect: 'none' }}
        >
          <defs>
            <path
              id="circle"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text
            fill="#674BD4"
            fontSize="16"
            fontWeight="700"
            letterSpacing="2"
          >
            <textPath href="#circle" startOffset="0">
              {repeatedText}
            </textPath>
          </text>
        </svg>

        {/* Center circle with arrow */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div 
            className="rounded-full flex items-center justify-center shadow-inner"
            style={{
              width: '55%',
              height: '55%',
              backgroundColor: '#674BD4'
            }}
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white"
              className="arrow-bounce"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .group:hover .arrow-bounce {
          animation: bounce-arrow 0.5s ease-in;
        }
      `}} />
    </div>
  );
};

export default BackToTop;
