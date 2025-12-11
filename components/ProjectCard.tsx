import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Magnetic from './Magnetic';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t } = useApp();
  const navigate = useNavigate();
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div 
        ref={container}
        onClick={() => navigate(`/project/${project.id}`)}
        className="group cursor-pointer w-full flex flex-col gap-8 mb-24 last:mb-0"
    >
      <div className="w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gray-200 dark:bg-gray-800 aspect-[16/9] md:aspect-[2/1] relative transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[0.98]">
          <motion.div style={{ y, scale: 1.15 }} className="w-full h-full relative">
            <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-700"
            />
          </motion.div>
          
          {/* Hover Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="bg-primary text-white w-24 h-24 rounded-full flex items-center justify-center font-medium text-lg shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                  {t({en: 'View', zh: '查看'})}
              </div>
          </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between px-2 md:px-6">
        <div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-text dark:text-white mb-2 group-hover:text-primary transition-colors">
                {project.title}
            </h3>
            <div className="flex flex-wrap gap-2 text-gray-500 dark:text-gray-400 text-sm md:text-base">
                <span className="font-medium">{project.category}</span>
                <span>Design</span>
                <span>{project.techStack.join(', ')}</span>
            </div>
        </div>
        
        <div className="hidden md:block">
             <Magnetic>
                <div className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-text hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                    {t({en: 'Case Study', zh: '完整案例'})}
                </div>
             </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;