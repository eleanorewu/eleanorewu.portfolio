import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import { CurveTransition } from './components/Transition';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark">
                <div className="text-text dark:text-white">Loading...</div>
              </div>
            }>
              <Routes location={location} key={location.pathname}>
                  <Route path="/" element={
                      <>
                          <CurveTransition />
                          <Home />
                      </>
                  } />
                  <Route path="/project/:id" element={
                      <>
                          <CurveTransition />
                          <ProjectDetail />
                      </>
                  } />
              </Routes>
            </Suspense>
        </AnimatePresence>
    );
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only show preloader on first visit and if on home page
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    const isHomePage = window.location.hash === '' || window.location.hash === '#/';
    
    if (!hasSeenPreloader && isHomePage) {
      setIsLoading(true);
      sessionStorage.setItem('hasSeenPreloader', 'true');
    }
  }, []);

  return (
    <AppProvider>
        <Router>
            <AnimatePresence mode="wait">
              {isLoading && <Preloader setIsLoading={setIsLoading} />}
            </AnimatePresence>
            
            {!isLoading && (
              <div className="min-h-screen font-sans antialiased selection:bg-text/20 dark:selection:bg-white/20 selection:text-text dark:selection:text-white">
                <Navbar />
                <AnimatedRoutes />
              </div>
            )}
        </Router>
    </AppProvider>
  );
};

export default App;
