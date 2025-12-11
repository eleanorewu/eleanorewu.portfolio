import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import BackToTop from '../components/BackToTopButton';
import Breadcrumb from '../components/Breadcrumb';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useApp();
  const container = useRef(null);
  
  const project = PROJECTS.find((p) => p.id === id);
  const nextProjectIndex = PROJECTS.findIndex(p => p.id === id) + 1;
  const nextProject = PROJECTS[nextProjectIndex] || PROJECTS[0];

  const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start start", "end end"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div>Project not found</div>;

  return (
    <div ref={container} className="min-h-screen bg-background dark:bg-background-dark text-text dark:text-white">
      
      {/* Header Image with Parallax */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-b-[3rem] relative z-10">
         <motion.div style={{ y: headerY }} className="w-full h-full relative">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover brightness-75" />
         </motion.div>
         
         <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 pb-12">
             <div className="container mx-auto">
                 <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="text-5xl md:text-8xl font-display font-bold text-white mb-6"
                 >
                     {project.title}
                 </motion.h1>
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="flex flex-wrap gap-6 text-white text-lg font-medium"
                 >
                     <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full">{project.category}</span>
                     <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full">{project.period || '2024'}</span>
                 </motion.div>
             </div>
         </div>
         
         <div className="absolute top-24 left-6 md:left-8 z-50">
             <Magnetic>
                <button 
                    onClick={() => navigate('/')}
                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg"
                >
                    <ArrowLeft size={24} />
                </button>
             </Magnetic>
         </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-8">
         <Breadcrumb 
           items={[
             {
               label: { en: 'Home', zh: '首頁' },
               path: '/'
             },
             {
               label: { en: 'Work', zh: '作品' },
               onClick: () => {
                 navigate('/');
                 setTimeout(() => {
                   document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                 }, 100);
               }
             },
             {
               label: { en: project.title, zh: project.title }
             }
           ]}
         />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-12 mb-32">
         <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
             {/* Main Content */}
             <div className="md:col-span-7 lg:col-span-8">
                 <h2 className="text-xl font-bold mb-8 uppercase tracking-widest border-b border-gray-200 dark:border-gray-800 pb-4">
                     {t({en: 'Overview', zh: '專案概覽'})}
                 </h2>
                 <p className="text-xl md:text-2xl leading-relaxed font-light mb-16 text-gray-600 dark:text-gray-300">
                     {t(project.description)}
                 </p>
                 
                 <div className="space-y-12">
                     <h3 className="text-xl font-bold uppercase tracking-widest">{t({en: 'Highlights', zh: '專案亮點'})}</h3>
                     <div className="grid gap-8">
                        {t(project.details).map((detail: string, i: number) => (
                            <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                                <span className="text-primary font-bold text-sm mb-4 block">0{i + 1}</span>
                                <p className="text-lg text-gray-700 dark:text-gray-200">{detail}</p>
                            </div>
                        ))}
                     </div>
                 </div>
             </div>

             {/* Sidebar Info */}
             <div className="md:col-span-5 lg:col-span-4 space-y-12 sticky top-24 h-fit">
                 <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-8">
                     <div className="mb-8">
                         <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Role</span>
                         <p className="text-lg font-medium">{t(project.role)}</p>
                     </div>
                     <div className="mb-8">
                         <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Tech Stack</span>
                         <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <span key={tech} className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                    {tech}
                                </span>
                            ))}
                         </div>
                     </div>
                     {project.link && (
                         <a href={project.link} target="_blank" rel="noreferrer" className="block w-full">
                             <button className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                {t({en: 'Visit Live Site', zh: '訪問網站'})} <ExternalLink size={20} />
                             </button>
                         </a>
                     )}
                 </div>
             </div>
         </div>
      </div>
      
      {/* Next Project Navigation */}
      <div className="w-full bg-[#1C1D20] text-white py-32 rounded-t-[3rem] relative overflow-hidden flex flex-col items-center justify-center text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-8">{t({en: 'Next Case', zh: '下一個案例'})}</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-12 relative z-10">{nextProject.title}</h2>
            <Magnetic>
                <button 
                    onClick={() => navigate(`/project/${nextProject.id}`)}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary text-white text-xl font-medium flex items-center justify-center hover:scale-110 transition-transform duration-500 relative z-10"
                >
                    {t({en: 'View', zh: '查看'})}
                </button>
            </Magnetic>
            <div className="absolute inset-0 opacity-20">
                <img src={nextProject.thumbnail} alt="" className="w-full h-full object-cover grayscale" />
            </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default ProjectDetail;