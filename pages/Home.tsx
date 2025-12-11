import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';
import MarqueeParallax from '../components/MarqueeParallax';
import BackToTop from '../components/BackToTopButton';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const { t } = useApp();
  const container = useRef(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  // Parallax Text
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const xMove = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const xMoveReverse = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // GSAP Parallax animations
  useEffect(() => {
    if (!heroImageRef.current || !heroTextRef.current) return;

    // Hero image parallax
    gsap.to(heroImageRef.current, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImageRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Hero text parallax
    gsap.to(heroTextRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroTextRef.current,
        start: 'top center',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={container} className="bg-background dark:bg-background-dark min-h-screen cursor-default transition-colors duration-500">
      
      {/* --- HERO --- */}
      <section className="min-h-screen md:h-screen flex flex-col justify-center item-center relative py-20 md:py-0" style={{ overflow: 'visible' }}>
        <div className="px-6 md:px-12 pb-8 md:pb-20">
            <div className="container mx-auto w-full">
                <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center">
                
                {/* Hero Image (Rounded & Asymmetric) */}
                <motion.div 
                    ref={heroImageRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="w-10/12 md:w-5/12 aspect-[3/4] md:aspect-[4/5] bg-gray-300 dark:bg-gray-700 rounded-[2.5rem] overflow-hidden relative"
                >
                    <img src="https://picsum.photos/id/64/800/1200" alt="Eleanore Wu" className="w-full h-full object-cover" />
                    <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/70 backdrop-blur px-6 py-3 rounded-full flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-text dark:text-white">Located in Taipei</span>
                    </div>
                </motion.div>

                {/* Hero Text */}
                <div className="w-full md:w-7/12 flex flex-col justify-between py-4">
                     <div className="hidden md:flex justify-end items-start mb-8">
                         <span className="text-lg md:text-xl font-medium text-text dark:text-white text-right">
                             {t({en: 'Freelance', zh: '自由接案'})}<br/>
                             {t({en: 'Designer & Developer', zh: '設計與前端工程'})}
                         </span>
                     </div>
                     
                     <div className="mt-4 md:mt-0 relative z-10 px-8 md:px-0" ref={heroTextRef}>
                        <motion.h1 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                            className="text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] font-display font-bold text-text dark:text-white uppercase -ml-1 md:-ml-2 tracking-tighter"
                        >
                            Eleanore<br/>
                            Wu
                        </motion.h1>
                        
                        {/* 手機版職業標題 */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="md:hidden mt-2 text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                            {t({en: 'Freelance', zh: '自由接案'})} ·{' '}
                            {t({en: 'Designer & Developer', zh: '設計與前端工程'})}
                        </motion.div>
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-xs md:text-xl text-gray-600 dark:text-gray-400 mt-3 md:mt-8 max-w-md leading-relaxed"
                        >
                            {t({
                                en: "Helping brands to stand out in the digital era.",
                                zh: "協助品牌在數位時代脫穎而出。"
                            })}
                        </motion.p>
                     </div>
                </div>
                </div>
            </div>
        </div>
        
        {/* Marquee at bottom of Hero */}
        <div className="w-full absolute bottom-0 left-0" style={{ zIndex: 30, height: 'auto' }}>
          <MarqueeParallax text="UIUX Designer" speed={2} />
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-[#1A1A1A] rounded-t-[3rem] relative" style={{ zIndex: 5 }}>
         <div className="container mx-auto flex flex-col md:flex-row gap-16">
             <div className="md:w-1/3">
                 <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2">
                     {t({en: 'About Me', zh: '關於我'})}
                 </span>
             </div>
             <div className="md:w-2/3">
                 <p className="text-2xl md:text-4xl leading-snug font-medium text-text dark:text-white mb-12">
                     {t({
                         en: "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.",
                         zh: "協助品牌在數位時代脫穎而出。我們將共同樹立新標竿。拒絕空談，始終走在設計的最前沿。"
                     })}
                 </p>
                 <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
                     {t({
                         en: "The combination of my passion for design, code & interaction positions me in a unique place in the web design world.",
                         zh: "我對設計、程式與互動的熱情，讓我在網頁設計領域佔有獨特的位置。"
                     })}
                 </p>
                 <a 
                   href="#contact" 
                   className="inline-flex items-center justify-center bg-text dark:bg-white text-white dark:text-background rounded-full px-8 py-4 text-base font-medium hover:scale-105 transition-transform duration-300"
                 >
                     {t({en: 'About me', zh: '更多關於我'})}
                 </a>
             </div>
         </div>
      </section>

      {/* --- WORK --- */}
      <section id="work" className="py-24 px-6 md:px-12 bg-background dark:bg-background-dark">
        <div className="container mx-auto">
             <div className="mb-16 flex items-end justify-between px-2">
                 <h2 className="text-sm uppercase tracking-widest text-gray-500">{t({en: 'Recent Work', zh: '近期作品'})}</h2>
             </div>
             
             <div className="flex flex-col">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
             </div>
        </div>
      </section>

      {/* --- SCROLLING TEXT --- */}
      <section className="py-24 overflow-hidden bg-transparent border-t border-gray-300 dark:border-gray-800">
          <motion.div 
            style={{ x: xMove }}
            className="flex whitespace-nowrap"
          >
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex gap-12 items-center text-[6vw] font-display font-bold uppercase pr-12 text-gray-300 dark:text-gray-700"
              >
                  <span>Development</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Design</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Strategy</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Motion</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Development</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Design</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Strategy</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Motion</span>
                  <span className="text-text dark:text-white">•</span>
              </motion.div>
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex gap-12 items-center text-[6vw] font-display font-bold uppercase text-gray-300 dark:text-gray-700"
              >
                  <span>Development</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Design</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Strategy</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Motion</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Development</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Design</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Strategy</span>
                  <span className="text-text dark:text-white">•</span>
                  <span>Motion</span>
                  <span className="text-text dark:text-white">•</span>
              </motion.div>
          </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#0F0F0F] text-white rounded-t-[3rem] relative overflow-hidden">
          <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
              <motion.div 
                style={{ y: xMoveReverse }} 
                className="flex flex-col items-center"
              >
                  <div className="relative border border-white/10 rounded-full p-16 md:p-24 aspect-square flex items-center justify-center group cursor-pointer overflow-hidden bg-transparent hover:border-white/30 transition-all duration-500">
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full"></div>
                      <div className="relative z-10 text-center group-hover:text-black transition-colors duration-300">
                          <p className="text-sm uppercase tracking-widest text-gray-400 group-hover:text-gray-600 mb-2 transition-colors">
                            {t({en: 'Have an idea?', zh: '有想法嗎？'})}
                          </p>
                          <h2 className="text-4xl md:text-6xl font-display font-bold">
                              {t({en: 'Let\'s work', zh: '開始'})}
                              <br/>
                              {t({en: 'together', zh: '合作'})}
                          </h2>
                      </div>
                  </div>
              </motion.div>

              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-white/10">
                  <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Copyright</p>
                      <p className="text-sm">© 2025 Eleanore Wu</p>
                  </div>
                  <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Local Time</p>
                      <p className="text-sm">{new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })} GMT+8</p>
                  </div>
                  <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Contact</p>
                      <div className="flex flex-col gap-2 text-sm">
                          <a href="#" className="hover:text-gray-400 transition-colors">LinkedIn</a>
                          <a href="#" className="hover:text-gray-400 transition-colors">GitHub</a>
                          <a href="mailto:yuenwu850823@gmail.com" className="hover:text-white transition-colors">E-mail</a>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Home;