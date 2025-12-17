import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, theme, toggleTheme, language, setLanguage } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 當視窗大小改變時，如果螢幕寬度 >= lg (1024px)，自動關閉選單
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive]);

  // 滾動事件監聽，當滾動50px時顯示 border
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: { en: 'About', zh: '關於' }, path: '/#about' },
    { name: { en: 'Work', zh: '作品' }, path: '/#work' },
    { name: { en: 'Contact', zh: '聯絡' }, path: '/#contact' },
  ];

  const handleNavClick = (path: string) => {
    setIsActive(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            document.getElementById(path.substring(2))?.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Wait for page transition
      } else {
        document.getElementById(path.substring(2))?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const menuVariants = {
    open: {
      x: "0%",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    },
    closed: {
      x: "100%",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
  };

  return (
    <>
      <motion.div 
        className="fixed top-5 left-0 w-full z-[60] flex justify-center pointer-events-none px-4 sm:px-5"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.6, 
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.3
        }}
      >
        <div className={`w-full max-w-[1280px] h-[72px] px-4 sm:px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'rounded-full backdrop-blur-md' : ''
        }`}>
        {/* Logo - Acts as Home Button */}
        <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-1 group text-text dark:text-white relative pointer-events-auto h-[24px]"
        >
          {/* Logo with Rotation */}
          <img 
            src="/logo.png"
            alt="Logo"
            className="inline-block mr-1 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-120"
            style={{
              width: "10px",
              height: "10px"
            }}
          />
          
          {/* Text Container with Slide Effect */}
          <div className="relative overflow-hidden h-[20px] flex items-center min-w-[180px]">
             <span 
               className="group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] block font-semibold whitespace-nowrap"
               style={{
                 fontFamily: "'Josefin Sans', sans-serif",
                 fontSize: "20px",
                 lineHeight: "100%",
                 letterSpacing: "-0.72px"
               }}
             >
               Eleanore Wu
             </span>
             <span 
               className="mt-1 absolute top-full group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] block font-semibold whitespace-nowrap"
               style={{
                 fontFamily: "'Josefin Sans', sans-serif",
                 fontSize: "20px",
                 lineHeight: "100%",
                 letterSpacing: "-0.72px"
               }}
             >
               Portfolio Website
             </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
             {/* Desktop Navigation Links */}
             <nav className="hidden lg:flex items-center gap-4 mr-4">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(link.path)}
                    className="text-base font-medium text-text dark:text-white px-2 py-1 relative group/link"
                  >
                    <span className="relative pb-1">
                      {t(link.name)}
                      <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-text dark:bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                    </span>
                  </button>
                ))}
             </nav>

             {/* Theme & Lang Toggles */}
             <div className="hidden lg:flex items-center gap-2 mr-2">
                <Magnetic>
                    <button 
                      onClick={toggleTheme} 
                      className="w-12 h-12 rounded-full bg-text/5 dark:bg-white/5 hover:bg-text/10 dark:hover:bg-white/10 transition-all duration-200 text-text dark:text-white relative z-[70] flex items-center justify-center active:scale-90"
                    >
                        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </Magnetic>
                <Magnetic>
                    <button 
                      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} 
                      className="w-12 h-12 rounded-full bg-text/5 dark:bg-white/5 hover:bg-text/10 dark:hover:bg-white/10 transition-all duration-200 font-medium text-text dark:text-white relative z-[70] flex items-center justify-center text-sm active:scale-90"
                    >
                        {language === 'zh' ? '繁中' : 'EN'}
                    </button>
                </Magnetic>
             </div>

            {/* Menu Button (Mobile/Tablet only) */}
            <Magnetic>
            <button 
                onClick={() => setIsActive(!isActive)} 
                className="flex lg:hidden items-center justify-center w-14 h-14 rounded-full bg-text dark:bg-white text-white dark:text-text relative z-[70] group hover:scale-105 active:scale-95 transition-all duration-200"
            >
                <div className={`w-6 flex flex-col gap-[5px] transition-all duration-300 ${isActive ? 'rotate-45' : ''}`}>
                    <div className={`w-full h-[2px] bg-current transition-all ${isActive ? 'translate-y-[7px] rotate-0' : ''}`}></div>
                    <div className={`w-full h-[2px] bg-current transition-opacity ${isActive ? 'opacity-0' : ''}`}></div>
                    <div className={`w-full h-[2px] bg-current transition-all ${isActive ? '-translate-y-[7px] -rotate-90' : ''}`}></div>
                </div>
            </button>
            </Magnetic>
        </div>
        </div>
      </motion.div>

      {/* Full Screen Menu */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#0F0F0F] text-white z-40 p-12 md:p-24 flex flex-col justify-between shadow-2xl"
          >
             {/* Curve decoration for menu edge could go here */}
             
             <div className="flex flex-col gap-8 mt-20">
                <div className="text-xs uppercase text-gray-500 border-b border-gray-800 pb-4 mb-4">Navigation</div>
                {navLinks.map((link, index) => (
                    <motion.div 
                        key={index}
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + (index * 0.1) }}
                        className="text-4xl md:text-5xl font-display font-medium cursor-pointer hover:text-gray-400 active:text-gray-500 transition-all duration-200 active:scale-98"
                        onClick={() => handleNavClick(link.path)}
                    >
                        {t(link.name)}
                    </motion.div>
                ))}
             </div>
             
             <div className="flex flex-col gap-6">
                 {/* Theme & Language Toggles (Visible in menu for all devices) */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="flex gap-3 relative z-50"
                 >
                     <button 
                       onClick={toggleTheme} 
                       className="flex-1 text-sm font-medium border-2 border-white/20 rounded-full px-4 py-3 flex items-center justify-center gap-2 text-white hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-200"
                     >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                     </button>
                     <button 
                       onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} 
                       className="flex-1 text-sm font-medium border-2 border-white/20 rounded-full px-4 py-3 text-white hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-200"
                     >
                        {language === 'zh' ? '繁中' : 'EN'}
                     </button>
                 </motion.div>

                 <div className="flex flex-col gap-2">
                    <div className="text-xs uppercase text-gray-500">Contact</div>
                    <div className="flex gap-6 text-sm font-medium text-gray-300">
                        <a href="https://www.linkedin.com/in/eleanorewu/" className="hover:text-white active:text-gray-400 transition-all duration-200">LinkedIn</a>
                        {/* <a href="#" className="hover:text-white active:text-gray-400 transition-all duration-200">GitHub</a> */}
                        <a href="mailto:yuenwu850823@gmail.com" className="hover:text-white active:text-gray-400 transition-all duration-200">E-mail</a>
                    </div>
                 </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;