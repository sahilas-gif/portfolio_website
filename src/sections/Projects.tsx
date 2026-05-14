import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type ProjectDetail = {
  challenge: string;
  solution: string;
  features: string[];
  impact: string;
};

type Project = {
  name: string;
  description: string;
  tags: string[];
  image: string;
  details: ProjectDetail;
  orientation?: 'vertical' | 'horizontal';
  githubUrl?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    name: 'AqiLizer',
    description: 'I built a mobile application that actively routes users along the healthiest path possible. By bringing in real time Google Air Quality and Directions data, the app helps athletes and pedestrians avoid harmful urban air pollution.',
    tags: ['Flutter', 'Spring Boot', 'PostgreSQL'],
    image: '/aqilizer.jpg',
    details: {
      challenge: 'Athletes and pedestrians face constant exposure to harmful urban air pollution, and this is made worse by GPS inaccuracies in dense cities known as the urban canyon effect.',
      solution: 'Instead of just finding the shortest route, I architected a mobile app that dynamically routes users along the healthiest path by using advanced geographical filtering algorithms.',
      features: [
        'Brought in Google Air Quality and Directions data using Polyline Sampling and asynchronous batching.',
        'Engineered Polyline Decimation so the mobile map renders at a smooth 60 frames per second even with thousands of coordinates.',
        'Used mathematical GPS Kalman Filtering to predict user movement and smooth out annoying hardware signal glitches.'
      ],
      impact: 'Successfully eliminated rate limit exhaustion, keeping turn by turn tracking completely stable while providing accurate, pollution aware navigation.'
    },
    orientation: 'vertical'
  },
  {
    name: 'NexKirana Chatbot',
    description: 'I started this project as an academic analysis to understand customer satisfaction when dealing with chatbots. We ended up building a live demonstration model that the NexKirana startup used for their customer service, backed by the RIDDL Incubator.',
    tags: ['Python', 'Machine Learning', 'React', 'Gemini API'],
    image: '/nexkirana.png',
    githubUrl: 'https://github.com/sahilas-gif/chatbot_in_marketing',
    liveUrl: 'https://chatbot-in-marketing-1.onrender.com/',
    details: {
      challenge: 'We started by analyzing MBA survey data regarding chatbot service recovery. We quickly found out that complex ensemble methods like Random Forest suffered from overfitting due to our small sample size of 34.',
      solution: 'I pivoted to using Linear models like Ridge and Lasso Regression which proved highly robust. We built a machine learning pipeline that predicted Satisfaction, Frustration, and Problem Resolution, all combined to predict Repeat purchase intent.',
      features: [
        'Machine Learning: Our research showed that an "Unresolved but polite" interaction still heavily dictates customer loyalty.',
        'We integrated the Gemini model to enable deep thinking, discovering that fast but inaccurate answers deeply frustrated customers.',
        'Built an easy human transfer protocol. Research showed missing and late orders were easily solved by AI, but complex issues required human empathy.'
      ],
      impact: 'The analytical phase resulted in a published academic research paper, a React based interactive demo, and a real world implementation for NexKirana with guidance from the RIDDL Incubator.'
    },
    orientation: 'horizontal'
  },
  {
    name: 'Hospitality BI',
    description: 'The hotel owner handed over 12 months of raw bill register data. I engineered a data pipeline and built an interactive Power BI dashboard to figure out exactly where they were making money and where they were losing it.',
    tags: ['Power BI', 'Python', 'Data Analytics'],
    image: '/bi-dashboard.png',
    details: {
      challenge: 'The challenge was digging through approximately 2.07 Crore in total revenue across 12 months to find actionable insights for Ocean Suites rather than just looking at messy Excel files.',
      solution: 'I analyzed the data and uncovered three major findings: The Food and Beverage Gap, The B2B Goldmine, and The Executive Audience.',
      features: [
        'The F&B Gap: MakeMyTrip brought massive volume but the average food cart size was under ₹110. I suggested packaging "Breakfast Included" rates.',
        'The B2B Goldmine: Corporate channels like Carnival Support Services averaged ₹3,026 in F&B per booking. One corporate booking outspends 15 OTA bookings.',
        'The Executive Audience: Executive rooms showed a 36 percent higher food order value than standard rooms, highlighting the need for quick dial room service.'
      ],
      impact: 'I presented these findings directly to the hotel owner, who immediately implemented the MakeMyTrip package recommendations we suggested to plug the revenue leaks.'
    },
    orientation: 'horizontal'
  },
  {
    name: 'DxEDGE IT Consultancy',
    description: 'I recently finished IT consultancy at Savvydigitech, part of the DxEDGE program run by CII, with support from NITI Aayog and AICTE. The basic idea: students get placed with actual companies to work on actual problems.',
    tags: ['IT Consultancy', 'Digital Transformation', 'MSME'],
    image: '/dexedge.jfif',
    details: {
      challenge: 'There were no case studies or simulated scenarios. Savvydigitech handles ERP, IT Security, and Cloud Solutions. My task was to find where things were slowing down digitally.',
      solution: 'I mapped out their digital workflows and proposed actionable solutions that could realistically be built and implemented by their team.',
      features: [
        'Worked on actual problems within a real corporate environment, stepping away from purely academic exercises.',
        'Analyzed digital bottlenecks across their Enterprise Resource Planning and Cloud Solution pipelines.',
        'Received invaluable mentorship from Dr. Naimesh Tugare Sir and Subhash Salvi Sir to keep the project focused and practical.'
      ],
      impact: 'Successfully completed the consultancy, providing Savvydigitech with realistic proposals to improve their digital efficiency. I was given actual work to do and room to figure it out.'
    },
    orientation: 'horizontal'
  },
];

// Helper to highlight keywords
const highlightKeywords = (text: string) => {
  const parts = text.split(/(Java|Python|React.js|React)/gi);
  return parts.map((part, i) =>
    /^(Java|Python|React\.js|React)$/i.test(part) ? (
      <strong key={i} className="text-orange-600 font-bold">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

// Memoized Project Card for 60 FPS performance
const ProjectCard = React.memo(({ project, onClick, cardRef }: { project: Project; onClick: () => void; cardRef: (el: HTMLDivElement | null) => void }) => {
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="bg-white rounded-[20px] p-6 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer will-change-transform"
      style={{ opacity: 0 }}
    >
      <div className="lg:w-[20%] w-full rounded-xl overflow-hidden shadow-md flex-shrink-0">
        <img loading="lazy" src={project.image} alt={project.name} className="w-full h-full object-cover aspect-video hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="lg:w-[25%]">
        <h3 className="text-black font-bold text-[32px] md:text-[40px] lg:text-[44px] leading-tight tracking-[-1px]">
          {project.name}
        </h3>
      </div>

      <div className="lg:w-[35%] flex flex-col gap-4">
        <p className="text-[#333] text-base md:text-lg leading-relaxed">
          {highlightKeywords(project.description)}
        </p>

        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-4 mt-1" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>

      <div className="lg:w-[20%] flex flex-wrap gap-2 justify-start lg:justify-end">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-black text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});

// Image Memoization for Modal Performance
const MemoizedImage = React.memo(({ image, name, orientation, onImageClick }: { image: string, name: string, orientation?: 'vertical' | 'horizontal', onImageClick: (img: string) => void }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div 
      className={`w-full ${isHorizontal ? 'h-[40vh] md:h-[50vh] border-b border-gray-200' : 'md:w-1/2 h-[40vh] md:h-full'} relative flex-shrink-0 bg-[#e8e8e8] overflow-hidden group cursor-zoom-in`}
      onClick={() => onImageClick(image)}
    >
       {/* Blurred background */}
       <div 
         className="absolute inset-0 bg-cover bg-center blur-3xl opacity-60 transform scale-125 will-change-transform"
         style={{ backgroundImage: `url(${image})` }}
       />
       
       {!imgLoaded && (
         <div className="absolute inset-0 flex items-center justify-center z-10">
           <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
         </div>
       )}
       <img
         src={image}
         alt={name}
         onLoad={() => setImgLoaded(true)}
         className={`absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-[1.02] ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
       />
       
       {/* Title Overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 flex items-end p-8 md:p-12 pointer-events-none">
         <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight translate-z-0 drop-shadow-lg">
           {name}
         </h2>
       </div>
    </div>
  );
});

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (selectedProject || zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, zoomedImage]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
            delay: 0.2 + index * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-[120px] px-[5vw] relative"
      style={{ backgroundColor: '#f4f4f4' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <span
          ref={labelRef}
          className="text-sm font-medium tracking-[2px] uppercase text-[#333] block mb-12"
          style={{ opacity: 0 }}
        >
          MY WORK
        </span>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              onClick={() => setSelectedProject(project)}
              cardRef={(el) => { cardsRef.current[index] = el; }}
            />
          ))}
        </div>
      </div>

      {/* Expandable Project Modal - 50/50 Split */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 transform-gpu"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 md:inset-10 z-50 flex items-center justify-center pointer-events-none p-4 md:p-0 transform-gpu"
            >
              <div className={`bg-white/95 backdrop-blur-xl w-full ${selectedProject.orientation === 'horizontal' ? 'max-w-5xl' : 'max-w-7xl'} h-[90vh] md:h-[85vh] rounded-[32px] shadow-2xl overflow-hidden pointer-events-auto border border-white/40 flex flex-col ${selectedProject.orientation === 'horizontal' ? '' : 'md:flex-row'} transform-gpu`}>
                
                {/* Visual Half */}
                <MemoizedImage 
                  image={selectedProject.image} 
                  name={selectedProject.name} 
                  orientation={selectedProject.orientation} 
                  onImageClick={(img) => setZoomedImage(img)}
                />

                {/* Content Half */}
                <div className={`w-full ${selectedProject.orientation === 'horizontal' ? '' : 'md:w-1/2'} h-full overflow-y-auto relative bg-transparent`}>
                  {/* Exit Strategy */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-3 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-full shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-90 z-50 group"
                  >
                    <X className="w-6 h-6 text-gray-500 group-hover:text-black transition-colors" />
                  </button>

                  <div className="p-8 md:p-12 space-y-10">
                    {/* Summary */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Project Overview</h3>
                      <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        {highlightKeywords(selectedProject.description)}
                      </p>

                      {/* Action Buttons */}
                      {(selectedProject.githubUrl || selectedProject.liveUrl) && (
                        <div className="flex flex-wrap gap-4 mb-2">
                          {selectedProject.liveUrl && (
                            <a 
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <ExternalLink className="w-5 h-5" />
                              View Live Demo
                            </a>
                          )}
                          {selectedProject.githubUrl && (
                            <a 
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <Github className="w-5 h-5" />
                              Source Code
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Row */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Core Technologies</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technical Highlights / Headpoints */}
                    <div className="space-y-8 pt-6 border-t border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">The Challenge</h4>
                        <p className="text-gray-800 leading-relaxed font-medium">
                          {highlightKeywords(selectedProject.details.challenge)}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">The Solution</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {highlightKeywords(selectedProject.details.solution)}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Key Features</h4>
                        <ul className="space-y-4">
                          {selectedProject.details.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-orange-500 mr-4 text-xl leading-none">•</span>
                              <span className="text-gray-700 leading-relaxed">{highlightKeywords(feature)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Measurable Impact</h4>
                        <p className="text-gray-900 font-semibold leading-relaxed">
                          {highlightKeywords(selectedProject.details.impact)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen HD Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full shadow-sm transition-all duration-300 hover:scale-110 z-50 group"
            >
              <X className="w-8 h-8 text-white group-hover:text-white" />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={zoomedImage}
              alt="Fullscreen HD Project"
              className="w-full h-full object-contain cursor-zoom-out shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing it immediately
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
