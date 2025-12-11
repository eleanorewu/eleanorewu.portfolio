import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, theme, toggleTheme, language, setLanguage } = useApp();
  const [isActive, setIsActive] = useState(false);
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
      <div className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 z-[60] flex justify-between items-center pointer-events-none">
        {/* Logo - Acts as Home Button */}
        <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-1 group text-text dark:text-white relative pointer-events-auto"
        >
          {/* Copyright Symbol with Rotation */}
          <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-180">
            ©
          </span>
          
          {/* Text Container with Slide Effect */}
          <div className="relative overflow-hidden h-6 flex items-center text-base min-w-[180px]">
             <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] block font-medium whitespace-nowrap">
               Eleanore
             </span>
             <span className="absolute top-full group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] block font-medium whitespace-nowrap">
               Portfolio Website
             </span>
          </div>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
             {/* Desktop Navigation Links */}
             <nav className="hidden lg:flex items-center gap-8 mr-8">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(link.path)}
                    className="text-base font-medium text-text dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:bg-text/5 dark:hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
                  >
                    {t(link.name)}
                  </button>
                ))}
             </nav>

             {/* Theme & Lang Toggles */}
             <div className="hidden lg:flex items-center gap-2 mr-4">
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
                        <a href="#" className="hover:text-white active:text-gray-400 transition-all duration-200">LinkedIn</a>
                        <a href="#" className="hover:text-white active:text-gray-400 transition-all duration-200">GitHub</a>
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