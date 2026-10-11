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
  imageFit?: 'contain' | 'cover';
  award?: { image?: string; label: string };
  githubUrl?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    name: 'Satellite',
    description: 'Satellite was my project for KJSIM Hackathon 2026, the Smart India Hackathon prequalifiers at K. J. Somaiya Institute of Management. I placed runner-up.',
    tags: ['KJSIM Hackathon 2026', 'Smart India Hackathon'],
    image: '/kjsom-hackathon-2026.jpg',
    award: { label: 'Runner-up' },
    details: {
      challenge: 'KJSIM Hackathon 2026 was the college round for the Smart India Hackathon, held at K. J. Somaiya Institute of Management.',
      solution: 'I built Satellite for that round.',
      features: [
        'The trophy in the photo is from that event.'
      ],
      impact: 'Runner-up at the Smart India Hackathon prequalifiers.'
    },
    orientation: 'vertical'
  },
  {
    name: 'AqiLizer',
    description: 'I built a mobile app that routes people along the cleaner path. It pulls live Google Air Quality and Directions data so athletes and pedestrians can dodge the worst of the city air.',
    tags: ['Flutter', 'Spring Boot', 'PostgreSQL'],
    image: '/aqilizer.jpg',
    details: {
      challenge: 'People walking or training in a dense city breathe a lot of bad air. GPS also jumps around between tall buildings. That second problem is called the urban canyon effect.',
      solution: 'The shortest route was the wrong question. I built the app to pick a healthier one, filtering the map with live air and directions data.',
      features: [
        'Pulled Google Air Quality and Directions with polyline sampling and async batches, so the app did not hammer the API on every point.',
        'Decimated the polyline so the map still held 60 frames per second with thousands of coordinates.',
        'Used a GPS Kalman filter to guess the next step and smooth out the phone’s signal glitches.'
      ],
      impact: 'The rate limits stopped getting exhausted. Turn-by-turn tracking stayed up, and the route still accounted for the air.'
    },
    orientation: 'vertical'
  },
  {
    name: 'Zenhospitality.in',
    description: 'I put a FastAPI and React app on cPanel shared hosting. a2wsgi plus custom .htaccess rules send /api to Python and leave the rest of the routes for the React app. Guests get Gemini itineraries and a streaming chat. The owner gets an admin portal with JWT.',
    tags: ['React 19', 'FastAPI', 'Python', 'SQLAlchemy 2.0', 'Gemini AI', 'LiteSpeed'],
    image: '/zenhospitality.jpg',
    liveUrl: 'https://zenhospitality.in/',
    githubUrl: 'https://github.com/sahilas-gif/Zenhospitality',
    details: {
      challenge: 'FastAPI is async. This host is cPanel with LiteSpeed, and it wanted a normal WSGI app. The usual adapters broke the coroutines. Passenger expected a synchronous app. SQLite with the async driver also failed on cold start unless the database path was absolute.',
      solution: 'I put a2wsgi inside passenger_wsgi.py so ASGI could run as WSGI. .htaccess sends /api to Python and everything else to the React index.html. The database is SQLAlchemy 2.0 with aiosqlite, absolute paths, and handlers that create the file and seed it if it is missing.',
      features: [
        'Gemini tries gemini-3.6-flash, then gemini-2.5-pro, then gemini-3.5-flash, for itineraries and streaming chat, so a rate limit on one model does not take the chat down.',
        'Admin login is JWT in HttpOnly cookies. Axios refreshes the token quietly. Package and enquiry screens stay locked without a third-party auth service.',
        'The admin can edit packages, read enquiries, and upload images. The mark is a gold monogram on dark green, exported as SVG, PNG, JPG, and ICO.'
      ],
      impact: 'The travel site is live on cheap shared hosting. Deploys do not take it down, the AI model can fail over, and the owner can run packages and enquiries from the admin.'
    },
    orientation: 'horizontal'
  },
  {
    name: 'Magic Mehendi Art by Punam',
    description: 'I built the site for a local mehendi business so bookings did not depend on phone calls and Instagram DMs. The owner gets an SMS when someone books. The design gallery is compressed so phones can actually open it.',
    tags: ['React', 'Spring Boot', 'PostgreSQL', 'Twilio SDK', 'Netlify', 'Back4app'],
    image: '/IMG_2489.png',
    liveUrl: 'https://magicmehendiartbypunam.netlify.app',
    details: {
      challenge: 'Bookings came in by phone and Instagram DM, so leads got missed. The gallery had more than 50 huge images. On phones that crashed WebKit, shoved the layout around, and took too long to load.',
      solution: 'I moved bookings onto the site. Spring Boot sends SMS and email when a form comes in. Gallery photos are WebP, lazy loaded, and the page is written for local search in Mulund and Mumbai.',
      features: [
        'Twilio and JavaMail fire an SMS and an email to the owner as soon as someone submits the booking form.',
        'Each photo has a 400w and an 800w WebP, plus a skeleton that holds the aspect ratio. The image payload dropped by half, and layout shift on mobile went to 0px.',
        'The layout starts at 320px, the gallery uses Load More, and JSON-LD schema marks the business for local search in Mulund and Mumbai.'
      ],
      impact: 'The first load is about half the weight it was. Mobile layout shift is 0px. Every booking form now pings the owner.'
    },
    orientation: 'vertical'
  },
  {
    name: 'Zeu (formerly NexKirana)',
    description: 'This started as an MBA-side look at how people feel after a chatbot handles a complaint. It turned into a demo that NexKirana, later Zeu, used for customer service, with the RIDDL Incubator involved.',
    tags: ['Python', 'Machine Learning', 'React', 'Gemini API'],
    image: '/nexkirana.png',
    githubUrl: 'https://github.com/sahilas-gif/chatbot_in_marketing',
    liveUrl: 'https://chatbot-in-marketing-1.onrender.com/',
    details: {
      challenge: 'The data was an MBA survey on chatbot service recovery. Random Forest and the other ensemble models overfit. We only had 34 responses.',
      solution: 'I switched to ridge and lasso. Those held up. The pipeline predicts satisfaction, frustration, and whether the problem got solved, then uses all three to predict whether the person would buy again.',
      features: [
        'An unresolved complaint that stayed polite still drove loyalty. That was the result that surprised us.',
        'Gemini is in the demo for longer replies. Fast wrong answers annoyed people more than slow ones.',
        'Missing and late orders were fine for the bot. Messier problems needed a person, so there is a plain handoff to a human.'
      ],
      impact: 'That work became a published paper, a React demo, and a live setup for NexKirana, with the RIDDL Incubator on the startup side.'
    },
    orientation: 'horizontal'
  },
  {
    name: 'Ocean Suites',
    description: 'The owner of Ocean Suites gave me 12 months of the bill register. I cleaned it and built a Power BI dashboard so we could see which bookings actually made money.',
    tags: ['Power BI', 'Python', 'Data Analytics'],
    image: '/bi-dashboard.png',
    details: {
      challenge: 'About ₹2.07 crore of revenue sat in a year of Excel. The owner needed to know where food and room money was leaking, not another raw export.',
      solution: 'I went through the bills and kept three findings: food spend by channel, what corporate bookings were worth, and how executive rooms ordered.',
      features: [
        'MakeMyTrip brought the volume, but the average food cart was under ₹110. I suggested a "Breakfast Included" rate.',
        'Carnival Support Services and similar corporate channels averaged ₹3,026 in food and beverage per booking. One of those outspent about 15 OTA bookings.',
        'Executive rooms ordered about 36 percent more food than standard rooms, so room service needed to be easy to reach.'
      ],
      impact: 'I walked the owner through it. He put the MakeMyTrip breakfast package in place.'
    },
    orientation: 'horizontal'
  },
  {
    name: 'Dx-EDGE',
    description: 'I finished an IT consultancy at Savvydigitech through DxEDGE, a CII program backed by NITI Aayog and AICTE. Students sit with a company and work on a problem they actually have.',
    tags: ['IT Consultancy', 'Digital Transformation', 'MSME'],
    image: '/dexedge.jfif',
    imageFit: 'contain',
    details: {
      challenge: 'No case study, no fake brief. Savvydigitech does ERP, IT security, and cloud work. I had to find where their own digital work was getting stuck.',
      solution: 'I mapped the workflows and wrote proposals their team could actually build.',
      features: [
        'The problems were the company’s, not a classroom scenario.',
        'I looked for slow spots in their ERP and cloud pipelines.',
        'Dr. Naimesh Tugare Sir and Subhash Salvi Sir kept the work practical.'
      ],
      impact: 'Savvydigitech got proposals they could implement. I had real work and room to figure it out.'
    },
    orientation: 'horizontal'
  },
];

// Helper to highlight keywords
const highlightKeywords = (text: string) => {
  const parts = text.split(/(Java|Python|React.js|React|FastAPI|Spring Boot|Flutter)/gi);
  return parts.map((part, i) =>
    /^(Java|Python|React\.js|React|FastAPI|Spring Boot|Flutter)$/i.test(part) ? (
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
      <div className="relative lg:w-[20%] w-full h-[200px] md:h-[220px] rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-[#ececec]">
        <img
          loading="lazy"
          decoding="async"
          src={project.image}
          alt={project.name}
          className={`w-full h-full hover:scale-105 transition-transform duration-500 ${
            project.orientation === 'vertical' || project.imageFit === 'contain'
              ? 'object-contain'
              : 'object-cover object-top'
          }`}
        />
        {project.award && (
          <span className="absolute bottom-3 left-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full border-[2.5px] border-black shadow-[3px_3px_0px_0px_#eb901a]">
            {project.award.label}
          </span>
        )}
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
const MemoizedImage = React.memo(({ image, name, orientation, badge, onImageClick }: { image: string, name: string, orientation?: 'vertical' | 'horizontal', badge?: string, onImageClick: (img: string) => void }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div 
      className={`w-full ${isHorizontal ? 'h-[40vh] md:h-[50vh] border-b border-gray-200' : 'md:w-1/2 h-[40vh] md:h-full'} relative flex-shrink-0 bg-[#e8e8e8] overflow-hidden group cursor-zoom-in`}
      onClick={() => onImageClick(image)}
    >
       <div 
         className="absolute inset-0 bg-cover bg-center blur-xl opacity-20 transform scale-110 will-change-transform"
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
         decoding="async"
         className={`absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-[1.02] ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
       />
       
       {badge && (
         <span className="absolute top-6 left-6 z-30 bg-white text-black text-xs md:text-sm font-bold px-4 py-2 rounded-full border-[2.5px] border-black shadow-[3px_3px_0px_0px_#eb901a]">
           {badge}
         </span>
       )}

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
                {selectedProject.award?.image ? (
                  <div className={`w-full ${selectedProject.orientation === 'horizontal' ? 'h-[40vh] md:h-[50vh] border-b border-gray-200' : 'md:w-1/2 h-[40vh] md:h-full'} flex flex-row flex-shrink-0 bg-[#ececec]`}>
                    <button
                      type="button"
                      className="relative flex-1 min-w-0 h-full cursor-zoom-in"
                      onClick={() => setZoomedImage(selectedProject.image)}
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.name}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 md:p-8 pointer-events-none">
                        <h2 className="text-white font-bold text-2xl md:text-4xl tracking-tight drop-shadow-lg">
                          {selectedProject.name}
                        </h2>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="relative flex-1 min-w-0 h-full cursor-zoom-in border-l border-black/10"
                      onClick={() => selectedProject.award?.image && setZoomedImage(selectedProject.award.image)}
                    >
                      <img
                        src={selectedProject.award.image}
                        alt={`${selectedProject.name} ${selectedProject.award.label}`}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <span className="absolute top-4 left-4 bg-white text-black text-xs md:text-sm font-bold px-4 py-2 rounded-full border-[2.5px] border-black shadow-[3px_3px_0px_0px_#eb901a]">
                        {selectedProject.award.label}
                      </span>
                    </button>
                  </div>
                ) : (
                  <MemoizedImage 
                    image={selectedProject.image} 
                    name={selectedProject.name} 
                    orientation={selectedProject.orientation}
                    badge={selectedProject.award?.label}
                    onImageClick={(img) => setZoomedImage(img)}
                  />
                )}

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
