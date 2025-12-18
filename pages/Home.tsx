import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ProjectShowcase } from '../components/ProjectShowcase';
import MarqueeParallax from '../components/MarqueeParallax';
import BackToTop from '../components/BackToTopButton';
import Gallery from '../components/Gallery';
import DotTextBackground from '../components/DotTextBackground';
import Gallery01 from '../src/assets/imgs/Gallery01.png';
import Gallery02 from '../src/assets/imgs/Gallery02.png';
import Gallery03 from '../src/assets/imgs/Gallery03.png';
import Gallery04 from '../src/assets/imgs/Gallery04.png';
import Gallery05 from '../src/assets/imgs/Gallery05.png';
import Gallery06 from '../src/assets/imgs/Gallery06.png';
import Gallery07 from '../src/assets/imgs/Gallery07.png';
import Gallery08 from '../src/assets/imgs/Gallery08.png';

// About Section Component with Scroll Animation
const AboutSection: React.FC<{ t: (obj: any) => any }> = ({ t }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="about" 
      className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-[#1A1A1A] rounded-t-[3rem] relative mt-0" 
      style={{ zIndex: 5 }}
    >
      <motion.div 
        className="container mx-auto flex flex-col md:flex-row gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="md:w-1/3" variants={itemVariants}>
          <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2">
            {t({en: 'About Me', zh: '關於我'})}
          </span>
        </motion.div>
        <motion.div className="md:w-2/3" variants={itemVariants}>
          <p className="text-2xl md:text-4xl leading-snug font-medium text-text dark:text-white mb-12">
            {t({
              en: "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.",
              zh: "協助品牌在數位時代脫穎而出。我們將共同樹立新標竿。拒絕空談，始終走在設計的最前沿。"
            })}
          </p>
          <motion.p 
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8"
            variants={itemVariants}
          >
            {t({
              en: "The combination of my passion for design, code & interaction positions me in a unique place in the web design world.",
              zh: "我對設計、程式與互動的熱情，讓我在網頁設計領域佔有獨特的位置。"
            })}
          </motion.p>
          <motion.a 
            href="#contact" 
            className="inline-flex items-center justify-center bg-text dark:bg-white text-white dark:text-background rounded-full px-8 py-4 text-base font-medium hover:scale-105 transition-transform duration-300"
            variants={itemVariants}
          >
            {t({en: 'About me', zh: '更多關於我'})}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Work Section Component with Scroll Animation
const WorkSection: React.FC<{ t: (obj: any) => any }> = ({ t }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="work" 
      className="py-8 px-6 md:px-12 bg-background dark:bg-background-dark"
    >
      <div className="container mx-auto">
        <motion.div 
          className="mb-16 flex items-end justify-between px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {t({en: 'Recent Work', zh: '近期作品'})}
          </h2>
        </motion.div>
        
        <ProjectShowcase />
      </div>
    </section>
  );
};

// Footer Section Component with Scroll Animation
const FooterSection: React.FC<{ t: (obj: any) => any; xMoveReverse: any }> = ({ t, xMoveReverse }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="contact" 
      className="py-16 md:py-24 px-6 md:px-12 bg-[#0F0F0F] text-white rounded-t-[3rem] relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          style={{ y: xMoveReverse }} 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
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

        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Copyright</p>
            <p className="text-sm">© 2025 Eleanore Wu</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Local Time</p>
            <p className="text-sm">{new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })} GMT+8</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Contact</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="hover:text-gray-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gray-400 transition-colors">GitHub</a>
              <a href="mailto:yuenwu850823@gmail.com" className="hover:text-white transition-colors">E-mail</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { t, theme } = useApp();
  const container = useRef(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  
  // Mouse Parallax for Hero Image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform values for parallax effect
  const rotateX = useTransform(y, [-30, 30], [3, -3]);
  const rotateY = useTransform(x, [-30, 30], [-3, 3]);
  
  // Parallax Text
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const xMove = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const xMoveReverse = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Gallery items - 8 images
  const galleryItems = [
    { id: 1, image: Gallery01, alt: 'Gallery Image 1' },
    { id: 2, image: Gallery02, alt: 'Gallery Image 2' },
    { id: 3, image: Gallery03, alt: 'Gallery Image 3' },
    { id: 4, image: Gallery04, alt: 'Gallery Image 4' },
    { id: 5, image: Gallery05, alt: 'Gallery Image 5' },
    { id: 6, image: Gallery06, alt: 'Gallery Image 6' },
    { id: 7, image: Gallery07, alt: 'Gallery Image 7' },
    { id: 8, image: Gallery08, alt: 'Gallery Image 8' },
  ];

  // 確保 Hero Section 有正確的 data 屬性
  useEffect(() => {
    if (heroSectionRef.current) {
      heroSectionRef.current.setAttribute('data-hero-section', 'true');
    }
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroSectionRef.current) return;
      
      const rect = heroSectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // 計算鼠標相對於中心點的位置 (-1 到 1)
      const relativeX = (e.clientX - centerX) / (rect.width / 2);
      const relativeY = (e.clientY - centerY) / (rect.height / 2);
      
      // 設置視差移動距離（可調整強度）
      const parallaxStrength = 30;
      mouseX.set(relativeX * parallaxStrength);
      mouseY.set(relativeY * parallaxStrength);
    };

    const handleMouseLeave = () => {
      // 鼠標離開時回到中心位置
      mouseX.set(0);
      mouseY.set(0);
    };

    const heroSection = heroSectionRef.current;
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={container} className="min-h-screen cursor-default transition-colors duration-500">
      
      {/* --- HERO --- */}
      <section 
        ref={heroSectionRef}
        data-hero-section="true"
        className="h-[80vh] md:h-[85vh] lg:h-screen relative overflow-hidden md:overflow-visible" 
        style={{ 
          padding: 0,
          margin: 0,
          position: 'relative'
        }}
      >
        {/* Dot Text Background - Behind the hero image */}
        <DotTextBackground 
          text={[
            "design with empathy",
            "strategy with influence"
          ]}
          containerRef={heroSectionRef}
          theme={theme}
        />
        
        {/* Hero Image - Centered and Bottom Aligned */}
        <motion.div
            className="absolute left-1/2 bottom-0 -translate-x-1/2"
            style={{ 
              zIndex: 20,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
        >
            <motion.div 
                ref={heroImageRef}
                className="w-[300px] md:w-[480px] lg:w-[480px] aspect-[2/3] md:aspect-[4/5] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden"
                style={{ 
                  x,
                  y,
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                  transformPerspective: 1000,
                }}
            >
                <motion.img 
                    src="/src/assets/imgs/hero.png" 
                    alt="Eleanore Wu" 
                    className="w-full h-full object-cover object-bottom"
                />
            </motion.div>
        </motion.div>
        
        {/* Marquee at bottom of Hero */}
        <motion.div 
          className="w-full absolute bottom-0 left-0 overflow-hidden md:overflow-visible" 
          style={{ zIndex: 30, height: 'auto' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
        >
          <MarqueeParallax text="UIUX Designer" speed={2} theme={theme} />
        </motion.div>
      </section>

      {/* --- ABOUT --- */}
      <AboutSection t={t} />

      {/* --- WORK --- */}
      <WorkSection t={t} />

      {/* --- GALLERY --- */}
      <Gallery items={galleryItems} />

      {/* --- SCROLLING TEXT --- */}
      <section className="py-16 md:py-24 overflow-hidden bg-transparent border-t border-gray-300 dark:border-gray-800">
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
      <FooterSection t={t} xMoveReverse={xMoveReverse} />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Home;