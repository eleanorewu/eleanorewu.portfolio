import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PROJECTS } from '../constants';
import { Project } from '../types';

export function ProjectShowcase() {
  const { t, theme } = useApp();
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: containerRef.current,
      threshold: 0.6,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = imageRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveProject(index);
          }
        }
      });
    }, options);

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToProject = (index: number) => {
    imageRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleViewProject = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center px-6 md:px-8 py-12 md:py-16 bg-background dark:bg-background-dark transition-colors duration-500">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-10 gap-8 md:gap-12 lg:gap-16">
        {/* 左側 - 作品列表 (30%) */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-4 md:space-y-6">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`border-b transition-all duration-500 ${
                isDark 
                  ? 'border-gray-700' 
                  : 'border-gray-300'
              } ${
                activeProject === index ? 'pb-6' : 'pb-4'
              }`}
            >
              <h3
                className={`transition-all duration-500 mb-3 cursor-pointer font-display transform hover:translate-x-2 text-[20px] ${
                  activeProject === index
                    ? isDark
                      ? 'text-white font-bold'
                      : 'text-text font-bold'
                    : isDark
                      ? 'text-gray-500 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => scrollToProject(index)}
              >
                {project.title}
              </h3>
              
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  activeProject === index
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  {project.period && (
                    <p className={`mb-2 text-[14px] ${
                      isDark ? 'text-gray-500/70' : 'text-gray-500/70'
                    }`}>
                      {project.period}
                    </p>
                  )}
                  <p className={`mb-4 leading-relaxed text-[14px] ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {t(project.description)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-[4px] ${
                      isDark 
                        ? 'bg-gray-800 text-gray-400' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {project.category}
                    </span>
                    {project.techStack.slice(0, 2).map((tech, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-[4px] ${
                        isDark 
                          ? 'bg-gray-800 text-gray-400' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleViewProject(project)}
                    className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-300 active:scale-95 ${
                      isDark
                        ? 'border border-white/30 text-white hover:border-white/50'
                        : 'border border-gray-400 text-text hover:border-gray-600'
                    }`}
                  >
                    {t({en: 'View Case Study', zh: '查看完整案例'})}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 右側 - 作品圖片 (70%) */}
        <div
          ref={containerRef}
          className="lg:col-span-7 h-[500px] md:h-[600px] overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        >
          <div className="space-y-6 md:space-y-8">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (imageRefs.current[index] = el)}
                className="snap-center h-[450px] md:h-[500px] overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-2xl"
                onClick={() => handleViewProject(project)}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProject(project);
                      }}
                      className={`px-6 py-3 rounded-full font-medium transform transition-all duration-300 group-hover:scale-110 active:scale-95 ${
                        isDark
                          ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/40'
                          : 'bg-black/20 backdrop-blur-md border border-white/30 text-white hover:bg-black/30 hover:border-white/40'
                      }`}
                    >
                      {t({en: 'View Case Study', zh: '查看完整案例'})}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}