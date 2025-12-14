import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  setIsLoading: (loading: boolean) => void;
}

const greetings = [
  "Hello👋🏻",
  "Glad you're here!",
  "My portfolio showcase",
  "Let's connect!"
];

const Preloader: React.FC<PreloaderProps> = ({ setIsLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const tl = gsap.timeline();

    // Animate through each greeting
    greetings.forEach((greeting, index) => {
      if (index < greetings.length - 1) {
        // Not the last one - fade in, pause, fade out
        tl.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
          onStart: () => setCurrentIndex(index)
        })
        .to(textRef.current, {
          duration: 0.25
        })
        .to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.25,
          ease: 'power2.in'
        })
        .set(textRef.current, { y: 20 });
      } else {
        // Last greeting - fade in and stay
        tl.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
          onStart: () => setCurrentIndex(index)
        })
        .to(textRef.current, {
          duration: 0.6
        });
      }
    });

    // After all animations, fade out and end loading
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.inOut',
      onComplete: () => {
        setTimeout(() => setIsLoading(false), 100);
      }
    });

    return () => {
      tl.kill();
    };
  }, [setIsLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0F0F0F] text-white overflow-hidden"
    >
      {/* Main Greeting Text */}
      <div className="relative">
        <h1
          ref={textRef}
          className="text-[4vw] md:text-[2vw] font-display font-bold text-white text-center"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {greetings[currentIndex]}
        </h1>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
