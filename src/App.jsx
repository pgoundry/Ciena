import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Bell, 
  MessageSquare, 
  Zap, 
  Award, 
  Users, 
  TrendingUp, 
  Shield,
  ToggleLeft,
  ToggleRight,
  X,
  Share2,
  MoreVertical,
  Briefcase,
  Beaker,
  Truck,
  Scale,
  Cpu,
  Brain,
  Bot,
  BarChart,
  FileText,
  Layers,
  CheckCircle2,
  Lock,
  Pause,
  Volume2,
  Maximize,
  Calendar,
  MapPin,
  Video,
  Plus
} from 'lucide-react';

/* --- CONTENT DATABASE --- */

const LEVELS = [
  { id: 1, title: "Awareness", tagline: "The Basics" },
  { id: 2, title: "Active", tagline: "Productivity" },
  { id: 3, title: "Operational", tagline: "Integration" },
  { id: 4, title: "Systemic", tagline: "Strategy" },
  { id: 5, title: "Transformational", tagline: "Reinvention" }
];

const TOPICS = [
  { id: 'basics', label: 'Basic AI Models', icon: Brain },
  { id: 'genai', label: 'Generative AI', icon: Zap },
  { id: 'agents', label: 'Agentic Concepts', icon: Bot },
  { id: 'prompting', label: 'Prompt Engineering', icon: MessageSquare },
  { id: 'data', label: 'Data & Analytics', icon: BarChart },
  { id: 'ethics', label: 'Ethical Usage', icon: Shield },
  { id: 'application', label: 'Application', icon: Layers },
];

const EVENTS = [
  { title: "AI Lunch & Learn: Prompting", date: "Today, 12:00 PM", type: "Online", icon: Video, img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80" },
  { title: "Lausanne R&D Hackathon", date: "Oct 24, 09:00 AM", type: "In-Person", location: "The Cube", icon: MapPin, img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80" },
  { title: "Executive AI Briefing", date: "Oct 28, 02:00 PM", type: "Online", icon: Video, img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" },
  { title: "London Community Meetup", date: "Nov 02, 05:30 PM", type: "In-Person", location: "London Office", icon: MapPin, img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80" },
];

const CONTENT = {
  hero: {
    1: { title: "Level 1: Awareness", subtitle: "Welcome to your AI journey. This short video introduces the fundamentals and why they matter for our Smoke-Free Future.", progress: 35, image: "https://www.thedigitalspeaker.com/content/images/2023/11/AI-office-work-futurist-AI-speaker.jpg" }, 
    2: { title: "Level 2: Active Usage", subtitle: "You understand the basics. Now, let's look at how to use GenAI tools to automate your daily routine.", progress: 10, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2670" }, 
    3: { title: "Level 3: Operational", subtitle: "Deploying AI in R&D, Supply Chain, and Commercial functions to drive real value.", progress: 0, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2670" }, 
    4: { title: "Level 4: Systemic", subtitle: "Scaling intelligence across the enterprise. Governance, strategy, and leadership.", progress: 0, image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2670" }, 
    5: { title: "Level 5: Transformational", subtitle: "Reinventing our business model for a post-AI world.", progress: 0, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2670" } 
  },
  rows: {
    1: [
      { 
        title: "Basic AI Models & Concepts", 
        data: [
          { title: "What is AI?", type: "Short", time: "2m", completed: true, img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" }, 
          { title: "Why AI Matters for PMI", type: "Video", time: "5m", completed: true, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" }, 
          { title: "Key Terminology", type: "PDF", time: "Read", completed: false, img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" },
          { title: "Machine Learning 101", type: "Video", time: "6m", completed: false, img: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&q=80" }
        ] 
      },
      { 
        title: "Ethical & Responsible AI Usage", 
        data: [
          { title: "PMI AI Code of Conduct", type: "Policy", time: "10m", completed: false, img: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80" }, 
          { title: "Understanding Bias", type: "Video", time: "8m", completed: false, img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80" },
          // Updated Image to Cybersecurity/Privacy Theme
          { title: "Data Privacy Basics", type: "Quiz", time: "5m", completed: false, img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80" }
        ] 
      },
      { 
        title: "Generative AI", 
        data: [
          { title: "Intro to GenAI", type: "Short", time: "3m", completed: true, img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" }, 
          { title: "Text vs Image Models", type: "Video", time: "5m", completed: false, img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80" },
          { title: "Prompting First Steps", type: "Guide", time: "7m", completed: false, img: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=80" }
        ] 
      }
    ],
    2: [
      { 
        title: "Prompt Engineering", 
        data: [
          { title: "Structure Your Prompts", type: "Guide", time: "8m", completed: false, img: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=80" }, 
          { title: "The CO-STAR Framework", type: "Video", time: "6m", completed: false, img: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80" }, 
          { title: "Refining Outputs", type: "Tool", time: "Try", completed: false, img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" }
        ] 
      },
      { 
        title: "Application", 
        data: [
          { title: "Drafting Emails", type: "Module", time: "5m", completed: false, img: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80" }, 
          { title: "Summarizing Meetings", type: "Template", time: "Use", completed: false, img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80" },
          { title: "Creating Presentations", type: "Video", time: "10m", completed: false, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" }
        ] 
      }
    ],
    3: [
        { 
          title: "Data & Analytics", 
          data: [
            { title: "Extracting Insights from Data", type: "Course", time: "30m", completed: false, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
            { title: "Data Visualization Tools", type: "Video", time: "15m", completed: false, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
            { title: "Predictive Basics", type: "Article", time: "10m", completed: false, img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80" }
          ] 
        },
        { 
          title: "Agentic Concepts", 
          data: [
            { title: "What is an AI Agent?", type: "Deep Dive", time: "20m", completed: false, img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80" },
            { title: "Autonomous Workflows", type: "Case Study", time: "12m", completed: false, img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80" },
            { title: "Human-in-the-loop", type: "Guide", time: "8m", completed: false, img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80" }
          ] 
        }
    ],
    4: [
        { 
          title: "Strategy & Governance", 
          data: [
            { title: "Orchestrating Workflows", type: "Masterclass", time: "45m", completed: false, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
            { title: "AI Governance Framework", type: "Policy", time: "25m", completed: false, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" },
            { title: "Managing AI Teams", type: "Guide", time: "20m", completed: false, img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" }
          ] 
        },
        {
          title: "Enterprise Scale",
          data: [
             { title: "Global Deployment", type: "Case Study", time: "30m", completed: false, img: "https://images.unsplash.com/photo-1526304640152-d4619684e484?w=800&q=80" },
             { title: "Infrastructure Needs", type: "Video", time: "15m", completed: false, img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80" }
          ]
        }
    ],
    5: [
        { 
          title: "Vision & Transformation", 
          data: [
            { title: "Future of Foundation Models", type: "Talk", time: "20m", completed: false, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" },
            { title: "The Autonomous Enterprise", type: "Keynote", time: "40m", completed: false, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
            { title: "Reinventing Business Models", type: "Workshop", time: "60m", completed: false, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" }
          ] 
        }
    ]
  }
};

/* --- COMPONENTS --- */

const Navbar = ({ view, setView, showAnnotations, setShowAnnotations }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 px-8 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
          <img 
             src="https://companieslogo.com/img/orig/PM-9b5fa1ae.png" 
             alt="PMI Logo" 
             className="h-8 w-auto object-contain drop-shadow-sm" 
           />
        </div>

        <div className={`hidden md:flex items-center gap-6 text-sm font-medium transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>
          <button onClick={() => setView('home')} className={`hover:text-blue-500 transition-colors ${view === 'home' ? 'font-bold border-b-2 border-blue-500 pb-1' : ''}`}>Journey</button>
          <button className="hover:text-blue-500 transition-colors">Topics</button>
          <button onClick={() => setView('manager')} className={`hover:text-blue-500 transition-colors ${view === 'manager' ? 'font-bold border-b-2 border-blue-500 pb-1' : ''}`}>Leader Hub</button>
        </div>
      </div>
      <div className={`flex items-center gap-6 transition-colors ${scrolled ? 'text-slate-600' : 'text-white'}`}>
        <Search className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
        <div className="flex items-center gap-2 border-l border-slate-300/30 pl-4">
          <span className={`text-[10px] uppercase font-bold tracking-wider ${showAnnotations ? 'text-yellow-500' : 'opacity-70'}`}>UX Notes</span>
          <button onClick={() => setShowAnnotations(!showAnnotations)}>
            {showAnnotations ? <ToggleRight className="text-yellow-500 w-6 h-6" /> : <ToggleLeft className="w-6 h-6 opacity-70" />}
          </button>
        </div>
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white shadow-lg">MK</div>
      </div>
    </nav>
  );
};

const Annotation = ({ show, text, className }) => {
  if (!show) return null;
  return (
    <div className={`absolute z-40 bg-yellow-100 text-slate-900 text-xs font-bold p-3 rounded shadow-xl border-2 border-slate-900 max-w-[200px] animate-fade-in ${className}`}>
      <div className="uppercase tracking-wider text-[9px] opacity-60 mb-1">UX Rationale</div>
      {text}
      <div className="absolute w-2 h-2 bg-yellow-100 border-r-2 border-b-2 border-slate-900 transform rotate-45 -bottom-1.5 left-4"></div>
    </div>
  );
};

const JourneyTracker = ({ currentLevel, setLevel, showAnnotations }) => (
  <div className="w-full bg-white border-b border-slate-200 py-4 px-12 relative z-40 shadow-sm">
    <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
      {LEVELS.map((lvl) => {
        const isActive = lvl.id === currentLevel;
        return (
          <button 
            key={lvl.id}
            onClick={() => setLevel(lvl.id)}
            className={`flex-1 py-3 px-2 rounded-lg transition-all duration-300 flex flex-col items-center gap-1 group relative overflow-hidden ${isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'}`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              Level {lvl.id}
            </span>
            <span className={`text-sm font-bold ${isActive ? 'text-blue-900' : 'text-slate-500 group-hover:text-slate-800'}`}>
              {lvl.title}
            </span>
            {isActive && <div className="h-1 w-12 bg-blue-500 mt-1.5 rounded-full" />}
          </button>
        );
      })}
    </div>
  </div>
);

const TopicExplorer = ({ showAnnotations }) => (
  <div className="px-12 mb-8 relative">
    <h3 className="text-slate-500 text-sm font-bold mb-4 flex items-center gap-2">
      <Briefcase className="w-4 h-4 text-blue-600" /> Explore by Topic
    </h3>
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
      {TOPICS.map((topic) => (
        <button key={topic.id} className="flex-none bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-full px-4 py-2 flex items-center gap-2 transition-all group whitespace-nowrap shadow-sm">
          <topic.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          <span className="text-slate-600 text-xs font-medium group-hover:text-blue-900 transition-colors">{topic.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const EventsRow = () => (
  <div className="mb-12 px-12 group">
    <h3 className="text-xl text-slate-900 font-bold mb-4 flex items-center gap-2">
      Upcoming Live Events <ChevronRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </h3>
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
      {EVENTS.map((event, i) => (
        <div key={i} className="relative flex-none w-80 h-44 bg-white rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:z-10 transition-all duration-300 group/card border border-slate-200 hover:border-blue-400 shadow-md hover:shadow-xl">
          <div className="absolute inset-0">
            <img src={event.img} className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 p-4 w-full">
             <div className="flex items-center gap-2 mb-2">
                <span className={`text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider ${event.type === 'Online' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
                  {event.type}
                </span>
                <span className="text-xs text-white/90 font-medium flex items-center gap-1"><Calendar className="w-3 h-3"/> {event.date}</span>
             </div>
             <h4 className="text-white font-bold leading-tight drop-shadow-md">{event.title}</h4>
             {event.location && <p className="text-xs text-slate-300 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {event.location}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContentRow = ({ title, items, showAnnotations, note }) => {
  const scrollRef = useRef(null);
  const scroll = (offset) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="mb-12 relative group/row px-12">
      <h3 className="text-lg text-slate-800 font-bold mb-3 flex items-center gap-2 group-hover/row:text-blue-600 cursor-pointer transition-colors">
        {title} 
        <ChevronRight className="w-4 h-4 opacity-0 group-hover/row:opacity-100 transition-opacity text-blue-500" />
      </h3>
      <Annotation show={showAnnotations && note} text={note} className="-top-10 left-32" />
      <div className="relative group/slider">
        <button onClick={() => scroll(-300)} className="absolute left-[-40px] top-0 bottom-0 z-20 bg-white/90 hover:bg-white w-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all text-slate-600 shadow-md border border-slate-200 rounded-r-lg"><ChevronLeft /></button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-8 pt-4 -ml-2 pl-2 scroll-smooth">
          {items && items.map((item, idx) => (
            <div key={idx} className="relative flex-none w-64 h-40 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-xl group/card bg-white border border-slate-200 hover:border-blue-300">
              <img src={item.img} alt={item.title} className="w-full h-24 object-cover" />
              
              {/* Card Meta */}
              <div className="p-3 h-16 flex flex-col justify-between bg-white relative z-10">
                 <h4 className="text-slate-800 text-xs font-bold leading-tight line-clamp-2">{item.title}</h4>
                 <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] border border-slate-200 text-slate-500 px-1.5 rounded uppercase font-medium">{item.type}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1"><Play className="w-2 h-2" /> {item.time}</span>
                 </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/90 opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 backdrop-blur-sm z-20">
                 <div className="flex items-center gap-3 mb-3">
                    <button className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><Play className="w-5 h-5 fill-current ml-0.5" /></button>
                    <button className="w-8 h-8 rounded-full border-2 border-slate-400 text-slate-300 flex items-center justify-center hover:border-white hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
                 </div>
                 <div className="text-center">
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">98% Match</span>
                    {item.completed ? 
                      <span className="text-[10px] text-white flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400"/> Completed</span> :
                      <span className="text-[10px] text-slate-300">Start Learning</span>
                    }
                 </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll(300)} className="absolute right-[-40px] top-0 bottom-0 z-20 bg-white/90 hover:bg-white w-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all text-slate-600 shadow-md border border-slate-200 rounded-l-lg"><ChevronRight /></button>
      </div>
    </div>
  );
};

const HeroVideo = ({ content, showAnnotations }) => (
  <div className="relative h-[55vh] w-full bg-slate-900 overflow-hidden group">
    <Annotation show={showAnnotations} text="Reduced height hero section for immediate access to content." className="bottom-20 right-20" />
    
    {/* Top Right Logo from Dropbox */}
    <div className="absolute top-24 right-12 z-40 animate-fade-in opacity-80">
        <img 
            src="https://www.dropbox.com/scl/fi/hhs1hz2esse8env4lk8kj/logo.png?rlkey=5v7kx3jjxj2pfrfj3b8jwt8cr&raw=1" 
            alt="Logo" 
            className="h-32 w-auto object-contain drop-shadow-xl"
        />
    </div>

    {/* Video Background Simulation */}
    <div className="absolute inset-0">
      <img src={content.image} alt="Video Background" className="w-full h-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
    </div>

    {/* Video UI Overlays */}
    <div className="absolute inset-0 flex flex-col justify-center px-12">
       {/* Bottom Info & Controls */}
       <div className="relative z-20 max-w-2xl mt-12">
          <div className="mb-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3">
               <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 flex items-center gap-1 shadow-lg rounded-sm tracking-wider">
                  SERIES
               </div>
               <span className="text-blue-200 font-bold tracking-widest text-xs uppercase border-l border-blue-500 pl-3">Level {String(content.title).split(' ')[1]}</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-3 tracking-tight drop-shadow-2xl leading-none">{content.title.split(':')[1]}</h1>
            <p className="text-base text-slate-200 font-medium leading-relaxed drop-shadow-md max-w-xl">{content.subtitle}</p>
          </div>

          {/* Progress Bar for the Level */}
          <div className="mb-6 w-2/3">
             <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
               <span>Level Progress</span>
               <span className="text-white">{content.progress}%</span>
             </div>
             <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
               <div 
                 className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                 style={{ width: `${content.progress}%` }}
               />
             </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-md font-bold flex items-center gap-3 transition-transform active:scale-95 text-base shadow-lg">
              <Play className="fill-slate-900 w-5 h-5" /> Resume
            </button>
            <button className="bg-slate-800/60 backdrop-blur-md text-white hover:bg-slate-800/80 px-8 py-3 rounded-md font-bold flex items-center gap-3 transition-colors text-base border border-white/20">
              <Info className="w-5 h-5" /> More Info
            </button>
          </div>
       </div>
    </div>
  </div>
);

export default function App() {
  const [userLevel, setUserLevel] = useState(1);
  const [view, setView] = useState('home');
  const [showAnnotations, setShowAnnotations] = useState(false);

  const currentContent = CONTENT.rows[userLevel] || CONTENT.rows[1];
  const heroContent = CONTENT.hero[userLevel] || CONTENT.hero[1];

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-blue-600 selection:text-white pb-20">
      <Navbar view={view} setView={setView} showAnnotations={showAnnotations} setShowAnnotations={setShowAnnotations} />

      {view === 'home' && (
        <>
          <HeroVideo content={heroContent} showAnnotations={showAnnotations} />
          
          <div className="relative z-30 pb-12">
             <JourneyTracker currentLevel={userLevel} setLevel={setUserLevel} showAnnotations={showAnnotations} />
             
             <div className="mt-8 space-y-2">
                <TopicExplorer showAnnotations={showAnnotations} />
                <EventsRow />
                
                {currentContent.map((row, i) => (
                  <ContentRow key={i} title={row.title} items={row.data} showAnnotations={showAnnotations} />
                ))}
             </div>
          </div>
        </>
      )}

      {view === 'manager' && (
        <div className="pt-32 px-12 text-center text-slate-500">
           <h1 className="text-2xl text-slate-900 font-bold mb-4">Leader Hub</h1>
           <p>This section remains available for team management simulation.</p>
        </div>
      )}
    </div>
  );
}
