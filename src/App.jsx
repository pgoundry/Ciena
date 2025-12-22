import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Cpu, Users, TrendingUp, ShieldCheck, Zap, Smartphone, 
  PlayCircle, Mic, MessageSquare, Video, ArrowRight, X, Send, 
  Menu, Globe, Server, Activity, Layers, Search, Filter, ChevronDown, ChevronRight, Lock, Mail,
  Wifi, Box, Key, Network, Download, BarChart, CheckCircle, HelpCircle, BookOpen, Clock, Target, Award, ExternalLink, Compass
} from 'lucide-react';

// ==========================================
// SHARED COMPONENTS
// ==========================================

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-red-200",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
    white: "bg-white text-gray-900 hover:bg-gray-100 shadow-md",
    text: "text-red-600 hover:text-red-800 px-0 hover:translate-y-0"
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ title, description, icon: Icon, actionText, onClick, accentColor = "red", badges = [], isLiveLink = false }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-lg bg-${accentColor}-50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 text-${accentColor}-600`} />
      </div>
      {badges.length > 0 && (
        <div className="flex gap-2">
          {badges.map((badge, i) => <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase tracking-wider">{badge}</span>)}
        </div>
      )}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors flex items-center gap-2">
      {title}
      {isLiveLink && <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wide font-bold flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Live</span>}
    </h3>
    <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{description}</p>
    {actionText && (
      <div className={`flex items-center font-semibold text-sm group-hover:translate-x-1 transition-transform ${isLiveLink ? 'text-green-600' : 'text-red-600'}`}>
        {actionText} <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    )}
  </div>
);

const TrendCard = ({ title, subtitle, icon: Icon }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-white rounded-lg shadow-sm"><Icon className="w-6 h-6 text-gray-700" /></div>
    </div>
    <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">{subtitle}</h4>
    <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
  </div>
);

const ChatWidget = ({ isOpen, onClose, context = "Finance" }) => {
  if (!isOpen) return null;

  // Iframe HTML content for the ElevenLabs widget
  // This isolates the widget's script from the main React app to prevent conflicts
  const widgetHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #f9fafb; font-family: system-ui, -apple-system, sans-serif; }
        elevenlabs-convai { width: 100%; height: 100%; border: none; }
      </style>
    </head>
    <body>
      <elevenlabs-convai agent-id="agent_1201kc008ybte0k8482vr509ax5a"></elevenlabs-convai>
      <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" type="text/javascript"></script>
    </body>
    </html>
  `;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center text-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-bold">{context} AI Coach</span>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Container for the iframe */}
      <div className="flex-1 relative w-full h-full">
         <iframe 
           srcDoc={widgetHtml}
           className="w-full h-full border-none block"
           title="AI Coach Widget"
           allow="microphone" 
         />
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: LOGIN
// ==========================================
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('consultant@ciena.com');
  const [password, setPassword] = useState('cienaportal@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isValidEmail = email.toLowerCase().endsWith('@ciena.com');
      const isValidPassword = password === 'cienaportal@123';
      if (isValidEmail && isValidPassword) {
        onLogin();
      } else {
        setError('Invalid credentials. Please use a valid Ciena email and the correct portal password.');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-40"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" /></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-gray-900/90"></div>
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="flex justify-center mb-8">
           <img src="https://logo.clearbit.com/ciena.com" alt="Ciena" className="h-10 w-auto" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-4xl font-black text-red-600 tracking-tighter">ciena</span>'; }}/>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Sign in to access the Enablement Portal</p>
        {error && <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium animate-pulse">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label><div className="relative"><Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" placeholder="name@ciena.com"/></div></div>
           <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label><div className="relative"><Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" placeholder="••••••••"/></div></div>
           <Button type="submit" className="w-full py-3 text-lg shadow-xl" disabled={loading}>{loading ? 'Verifying...' : 'Sign In'}</Button>
           <div className="text-center"><a href="#" className="text-sm text-gray-400 hover:text-red-600 transition-colors">Forgot your password?</a></div>
        </form>
      </div>
      <div className="absolute bottom-6 text-white/40 text-xs">© 2024 Ciena Corporation. Internal Use Only.</div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: QUIZ SECTION
// ==========================================
const QuizSection = () => {
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4">1. Which regulatory framework is driving operational resilience in EU finance?</h4>
        <div className="space-y-2">
          {['HIPAA', 'DORA', 'OSHA'].map((opt) => (
            <button 
              key={opt}
              onClick={() => setQ1(opt)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${q1 === opt ? (opt === 'DORA' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'border-gray-200 hover:bg-gray-50'}`}
            >
              {opt}
              {q1 === opt && (opt === 'DORA' ? <CheckCircle className="w-4 h-4 float-right mt-1"/> : <X className="w-4 h-4 float-right mt-1"/>)}
            </button>
          ))}
        </div>
        {q1 === 'DORA' && <p className="text-green-600 text-sm mt-2">Correct! DORA focuses on digital operational resilience for the financial sector.</p>}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4">2. Why is WaveLogic 6 critical for AI workloads?</h4>
        <div className="space-y-2">
          {['It provides basic 10G connectivity', 'It delivers 1.6T capacity with lower power', 'It is a software-only solution'].map((opt) => (
            <button 
              key={opt}
              onClick={() => setQ2(opt)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${q2 === opt ? (opt.includes('1.6T') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'border-gray-200 hover:bg-gray-50'}`}
            >
              {opt}
              {q2 === opt && (opt.includes('1.6T') ? <CheckCircle className="w-4 h-4 float-right mt-1"/> : <X className="w-4 h-4 float-right mt-1"/>)}
            </button>
          ))}
        </div>
        {q2 && q2.includes('1.6T') && <p className="text-green-600 text-sm mt-2">Correct! High capacity and energy efficiency are key for AI data centers.</p>}
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: MICRO LEARNING
// ==========================================
const FinanceMicroLearningPage = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const content = [
    {
      title: "Introduction",
      duration: "45 sec",
      body: (
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-video relative group">
             <video controls className="w-full h-full object-cover" poster="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80">
               <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 text-white flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-3">Why Finance Matters</h2>
            <p className="text-base text-gray-300 max-w-2xl">The financial sector is the heartbeat of the global economy. For Ciena, it represents a high-value market driven by an uncompromising need for <span className="text-red-500 font-bold">speed</span>, <span className="text-red-500 font-bold">security</span>, and <span className="text-red-500 font-bold">reliability</span>.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-red-50 rounded-lg"><Zap className="w-8 h-8 mx-auto text-red-600 mb-2"/> <h4 className="font-bold">Microseconds Count</h4></div>
            <div className="p-4 bg-blue-50 rounded-lg"><ShieldCheck className="w-8 h-8 mx-auto text-blue-600 mb-2"/> <h4 className="font-bold">Zero Trust Security</h4></div>
            <div className="p-4 bg-green-50 rounded-lg"><TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2"/> <h4 className="font-bold">Massive Data Growth</h4></div>
          </div>
        </div>
      )
    },
    {
      title: "Market Fundamentals",
      duration: "1.5 min",
      body: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">What's Driving the Market?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-red-100 rounded text-red-600"><Cpu className="w-5 h-5"/></div><h4 className="font-bold">AI Decisioning</h4></div>
              <p className="text-gray-600 text-sm">Banks are using AI for everything from fraud detection to algorithmic trading. This requires massive bandwidth and low latency to process data in real-time.</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-blue-100 rounded text-blue-600"><Lock className="w-5 h-5"/></div><h4 className="font-bold">Regulatory Pressure</h4></div>
              <p className="text-gray-600 text-sm">Regulations like DORA (EU) demand operational resilience. Networks must be "always on" and secure against sophisticated cyber threats.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Challenges & Opportunities",
      duration: "1 min",
      body: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
            <h3 className="font-bold text-orange-900 mb-2">The Customer's Problem</h3>
            <p className="text-orange-800">"We are losing trading revenue because our network is 2 milliseconds slower than our competitor, and our compliance team is blocking cloud migration due to data sovereignty fears."</p>
          </div>
          <h3 className="font-bold text-gray-900 mt-6">Where We Win</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/><span><strong>Modernize Legacy Ops:</strong> Replace rigid, manual networks with programmable infrastructure.</span></li>
            <li className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/><span><strong>Secure Data Mobility:</strong> Encrypt data in motion without adding latency.</span></li>
          </ul>
        </div>
      )
    },
    {
      title: "Ciena's Value",
      duration: "1 min",
      body: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 text-center">The "Why Ciena" Pitch</h3>
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 aspect-[21/9] bg-gray-100 mb-4">
             <video controls className="w-full h-full object-cover" poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80">
               <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
          </div>
          <div className="grid gap-4">
            <div className="p-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg"><h4 className="font-bold text-lg mb-1">Adaptive Network™</h4><p className="text-red-100 text-sm">We don't just build pipes. We build intelligent, automated networks that self-optimize for speed and reliability, ensuring your trading floor never goes dark.</p></div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm"><h4 className="font-bold text-gray-900 mb-1">WaveLogic 6</h4><p className="text-gray-600 text-sm">The world's most advanced coherent optic. Delivers 1.6T capacity to handle your AI workloads while cutting power consumption in half.</p></div>
          </div>
        </div>
      )
    },
    {
      title: "Knowledge Check",
      duration: "1.5 min",
      body: <QuizSection />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-900 transition-colors"><X className="w-6 h-6"/></button>
          <div><h1 className="text-lg font-bold text-gray-900">Finance Vertical Fundamentals</h1><div className="flex items-center gap-2 text-xs text-gray-500"><Clock className="w-3 h-3"/> 5 min module</div></div>
        </div>
        <div className="hidden md:flex items-center gap-2"><span className="text-sm font-medium text-gray-600">Step {step + 1} of {totalSteps}</span><div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${((step + 1) / totalSteps) * 100}%` }}></div></div></div>
      </div>
      <div className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{content[step].title}</h2>
          <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded mb-6">~{content[step].duration}</span>
          <div className="animate-fade-in">{content[step].body}</div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 p-6 sticky bottom-0">
        <div className="max-w-3xl mx-auto flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 0} className={`${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}>Previous</Button>
          {step === totalSteps - 1 ? <Button onClick={onBack}>Finish Module</Button> : <Button onClick={nextStep}>Next Step <ArrowRight className="w-4 h-4 ml-2 inline"/></Button>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: HOME PAGE
// ==========================================
const HomePage = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      {/* Home Hero */}
      <section className="bg-gray-900 text-white relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="Data Center" className="w-full h-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Enablement <span className="text-red-600">Portal</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">Your central hub for Ciena enablement resources.</p>
          <div className="flex gap-4">
            <Button onClick={() => onNavigate('verticals')}>Explore Verticals</Button>
            <Button variant="outline" onClick={() => onNavigate('technologies')}>Core Technologies</Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Services Library */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4"><div className="h-8 w-1 bg-red-600 rounded-full"></div><div><h2 className="text-2xl font-bold text-gray-900">Services Library</h2></div></div>
            <button onClick={() => onNavigate('technologies')} className="text-red-600 font-semibold text-sm hover:underline">View All Technologies</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Adaptive Network™" description="An end-to-end automated solution that combines programmable infrastructure, analytics, and software control." icon={Activity} actionText="View Solution" />
            <Card title="Optical Networking" description="Market-leading coherent optics that maximize fiber capacity and reach." icon={Zap} actionText="View Solution" />
            <Card title="Routing & Switching" description="Next-gen metro and edge routing platforms designed to bring IP and Optical layers together." icon={Layers} actionText="View Solution" />
          </div>
        </section>

        {/* Partner Profiles */}
        <section className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4"><div className="h-8 w-1 bg-red-600 rounded-full"></div><div><h2 className="text-2xl font-bold text-gray-900">Partner Profiles</h2></div></div>
              <button onClick={() => onNavigate('partners')} className="text-red-600 font-semibold text-sm hover:underline flex items-center group">View All Profiles <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="Virgin Media O2" description="Converged connectivity champion in the UK. Key opportunities in high-capacity backhaul." icon={Globe} accentColor="red" badges={["Tier 1", "UK"]} actionText="View Profile" />
              <Card title="Colt" description="Global digital infrastructure company. Investing heavily in IQ Network and On Demand services." icon={Server} accentColor="rose" badges={["Global", "On Demand"]} actionText="View Profile" />
              <Card title="Zayo" description="Leading communications infrastructure provider. Strategic partner for dark fiber." icon={Zap} accentColor="orange" badges={["Infrastructure"]} actionText="View Profile" />
            </div>
          </div>
        </section>

        {/* Market / Vertical Knowledge */}
        <section id="verticals">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4"><div className="h-8 w-1 bg-red-600 rounded-full"></div><div><h2 className="text-2xl font-bold text-gray-900">Market & Vertical Knowledge</h2></div></div>
            <button onClick={() => onNavigate('verticals')} className="text-red-600 font-semibold text-sm hover:underline flex items-center group">View All Verticals <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div onClick={() => onNavigate('finance')} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors"><TrendingUp className="w-8 h-8 text-red-600" /></div>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">FEATURED</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Finance</h3>
              <p className="text-gray-600 mb-6 text-sm">High-frequency trading, compliance, and data sovereignty.</p>
              <div className="flex items-center text-red-600 font-bold text-sm">
                 <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wide font-bold flex items-center gap-1 mr-2"><ExternalLink className="w-3 h-3"/> Live</span>
                 Open Toolkit <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
            <Card title="Healthcare" description="Telemedicine and large imaging data transfers." icon={Activity} accentColor="teal" actionText="Coming Soon" />
            <Card title="Utilities" description="Smart grid modernization and OT/IT convergence." icon={Zap} accentColor="orange" actionText="Coming Soon" />
          </div>
        </section>
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: FINANCE VERTICAL PAGE
// ==========================================
const FinanceVerticalPage = ({ onBack, onNavigateToDig, onNavigateToMicroLearning }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div className="animate-fade-in">
       {/* Breadcrumb */}
       <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
           <button onClick={onBack} className="hover:text-red-600 font-medium transition-colors">Home</button>
           <span className="mx-2">/</span>
           <span className="text-gray-900 font-medium">Verticals</span>
           <span className="mx-2">/</span>
           <span className="text-red-600 font-medium">Finance</span>
        </div>
       </div>

      <header className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Finance Skyscraper" className="w-full h-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-red-500 font-bold uppercase tracking-widest mb-4">Enablement Toolkit</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Finance Vertical</h1>
            <p className="text-xl text-gray-300 mb-8 font-light">Decision Intelligence & Strategic Insights designed to accelerate your customer conversations.</p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById('resources').scrollIntoView({ behavior: 'smooth' })}>Explore Resources</Button>
              <Button variant="white" onClick={() => setIsChatOpen(true)}><Cpu className="w-4 h-4 mr-2 inline" />Launch AI Coach ✨</Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <section id="resources">
          <div className="flex items-center gap-4 mb-8"><div className="h-8 w-1 bg-red-600 rounded-full"></div><h2 className="text-2xl font-bold">Quick Access Tools</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Finance DIG" description="Your comprehensive Decision Intelligence Guide." icon={FileText} actionText="View DIG Sheet" onClick={onNavigateToDig} isLiveLink={true} />
            <Card title="Strategic Deck" description="Customer-facing presentation slides." icon={Users} actionText="View Deck" />
            <Card title="Intelligence Pack" description="Deep dive vertical intelligence." icon={TrendingUp} actionText="Access Pack" />
            <Card title="Proof & Outcomes" description="Case studies and proof points." icon={ShieldCheck} actionText="Read Stories" />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl group">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Cpu className="w-48 h-48" /></div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-red-600 rounded-full text-xs font-bold mb-4">NEW</div>
              <h3 className="text-2xl font-bold mb-4">AI Virtual Coach</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">Get instant, conversational guidance tailored to the finance sector. Practice discovery questions and test your positioning.</p>
              <Button variant="white" onClick={() => setIsChatOpen(true)}>Start Session ✨</Button>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg flex flex-col justify-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6"><Users className="w-6 h-6 text-red-600" /></div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Connect with the CMS Team</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">Available to support your work across the finance vertical. Reach out for expert guidance.</p>
            <div><Button variant="outline">Contact Expert</Button></div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8"><div className="h-8 w-1 bg-red-600 rounded-full"></div><h2 className="text-2xl font-bold">Market Trends & Insights</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrendCard subtitle="AI Decisioning" title="Rise of AI-Driven Decisioning in Financial Services" icon={Cpu} />
            <TrendCard subtitle="Compliance" title="Compliance Pressure and the New Era of Secure Data" icon={ShieldCheck} />
            <TrendCard subtitle="Low Latency" title="Modernising Trading Infrastructure for Ultra-Low Latency" icon={Zap} />
            <TrendCard subtitle="Digital Banking" title="The Shift to Digital Banking and Cloud-Native Ops" icon={Smartphone} />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8"><div className="h-8 w-1 bg-red-600 rounded-full"></div><h2 className="text-2xl font-bold">Learning Modules</h2></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
              <div className="shrink-0"><div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"><PlayCircle className="w-8 h-8 text-gray-400" /></div></div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                   Micro Learning Module 
                   <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wide font-bold flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Live</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4">A quick, interactive module to build confidence in finance in just a few minutes.</p>
                <Button variant="text" className="text-sm" onClick={onNavigateToMicroLearning}>Launch Module <ArrowRight className="w-3 h-3 ml-1 inline"/></Button>
              </div>
            </div>
            
            <div className="bg-red-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex gap-6 text-white">
              <div className="shrink-0"><div className="w-16 h-16 bg-red-500/50 rounded-lg flex items-center justify-center"><Mic className="w-8 h-8 text-white" /></div></div>
              <div className="w-full">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  Podcast Series
                  <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/30 uppercase tracking-wide font-bold flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Live</span>
                </h3>
                <p className="text-sm text-red-100 mb-4">Tune into our purpose-built podcast. An easy way to deepen your understanding on the go.</p>
                <audio controls className="w-full h-8 mt-2 rounded opacity-90 hover:opacity-100 transition-opacity">
                   <source src="Finance_podcast.mp3" type="audio/mpeg" />
                   Your browser does not support the audio element.
                </audio>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
              <div className="shrink-0"><div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"><MessageSquare className="w-8 h-8 text-gray-400" /></div></div>
              <div><h3 className="text-lg font-bold mb-2">Meeting Simulation</h3><p className="text-sm text-gray-600 mb-4">Rehearse a live customer conversation with a virtual Finance exec.</p><Button variant="text" className="text-sm">Start Sim <ArrowRight className="w-3 h-3 ml-1 inline"/></Button></div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
              <div className="shrink-0"><div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"><Video className="w-8 h-8 text-gray-400" /></div></div>
              <div><h3 className="text-lg font-bold mb-2">Webinars</h3><p className="text-sm text-gray-600 mb-4">Access curated pre-recorded webinars covering developments in the sector.</p><Button variant="text" className="text-sm">Browse Library <ArrowRight className="w-3 h-3 ml-1 inline"/></Button></div>
            </div>
          </div>
        </section>

      </main>
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: VERTICALS PAGE
// ==========================================
const VerticalsPage = ({ onNavigate }) => {
  const verticals = [
    { id: 'finance', title: 'Finance', icon: TrendingUp, description: 'High-frequency trading, compliance, and data sovereignty.', status: 'Available' },
    { id: 'healthcare', title: 'Healthcare', icon: Activity, description: 'Telemedicine, large imaging data, and secure patient records.', status: 'Coming Soon' },
    { id: 'utilities', title: 'Utilities', icon: Zap, description: 'Smart grid modernization and OT/IT convergence.', status: 'Coming Soon' },
    { id: 'government', title: 'Government', icon: ShieldCheck, description: 'Secure, resilient networks for defense and civilian agencies.', status: 'Coming Soon' },
    { id: 'education', title: 'Education', icon: BookOpen, description: 'Connected campuses and remote learning infrastructure.', status: 'Coming Soon' },
    { id: 'sp', title: 'Service Providers', icon: Globe, description: 'Next-gen 5G, residential broadband, and enterprise services.', status: 'Coming Soon' }
  ];

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-12">
       {/* Breadcrumb */}
       <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
           <button onClick={() => onNavigate('home')} className="hover:text-red-600 font-medium transition-colors">Home</button>
           <span className="mx-2">/</span>
           <span className="text-red-600 font-medium">Verticals</span>
        </div>
       </div>

      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl font-bold mb-4">Industry Verticals</h1>
           <p className="text-xl text-gray-400 max-w-3xl">Specialized insights, trends, and solution guides for our key markets.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verticals.map((v, i) => (
            <div 
              key={i} 
              onClick={() => v.status === 'Available' ? onNavigate(v.id) : null}
              className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full group ${v.status === 'Available' ? 'cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1' : 'opacity-75'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${v.status === 'Available' ? 'group-hover:bg-red-50' : ''}`}>
                  <v.icon className={`w-6 h-6 ${v.status === 'Available' ? 'text-gray-700 group-hover:text-red-600' : 'text-gray-400'}`} />
                </div>
                {v.status === 'Available' ? (
                   <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">AVAILABLE</span>
                ) : (
                   <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded">COMING SOON</span>
                )}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${v.status === 'Available' ? 'text-gray-900 group-hover:text-red-600' : 'text-gray-500'} flex items-center gap-2`}>
                 {v.title}
                 {v.status === 'Available' && <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wide font-bold flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Live</span>}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{v.description}</p>
              {v.status === 'Available' && (
                <div className="flex items-center text-red-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Explore Toolkit <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: TECHNOLOGIES PAGE
// ==========================================
const TechnologiesPage = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
       <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
           <button onClick={() => onNavigate('home')} className="hover:text-red-600 font-medium transition-colors">Home</button>
           <span className="mx-2">/</span>
           <span className="text-red-600 font-medium">Technologies</span>
        </div>
       </div>

      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl font-bold mb-4">Core Technologies</h1>
           <p className="text-xl text-gray-400 max-w-3xl">Explore the foundational technologies powering Ciena's adaptive networks and our partner solutions.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Card 
            title="WaveLogic" 
            description="Our industry-leading coherent optical technology. Delivers massive capacity over any distance with lower power and cost per bit."
            icon={Zap} 
            accentColor="red"
            badges={["Optical", "Coherent"]}
            actionText="Explore WL6"
            onClick={() => onNavigate('wavelogic')}
            isLiveLink={true}
          />
          
          <Card 
            title="Liquid Spectrum" 
            description="Software applications that combine real-time network telemetry with analytics to maximize optical network value."
            icon={BarChart} 
            accentColor="cyan"
            badges={["Analytics", "Automation"]}
            actionText="Learn More"
          />

          <Card 
            title="Navigator NCS" 
            description="A single point of control for visualizing and optimizing multi-layer, multi-vendor network operations."
            icon={Compass} 
            accentColor="blue"
            badges={["Software", "Control"]}
            actionText="Learn More"
          />

           <Card 
            title="Planet" 
            description="Visualize your network to improve planning and operations with accurate, current inventory data."
            icon={Globe} 
            accentColor="green"
            badges={["Inventory", "Planning"]}
            actionText="Learn More"
          />

          <Card 
            title="Blue Planet" 
            description="Intelligent automation software that helps you modernize your OSS and launch new services faster."
            icon={Layers} 
            accentColor="indigo"
            badges={["Automation", "OSS"]}
            actionText="Learn More"
          />

           <Card 
            title="6500 Packet-Optical Platform" 
            description="The flagship platform for converging packet, OTN, and flexible wave logic photonics in a single system."
            icon={Server} 
            accentColor="purple"
            badges={["Hardware", "Converged"]}
            actionText="Learn More"
          />

          <Card 
            title="Waveserver" 
            description="Compact, stackable interconnect platforms optimized for high-capacity DCI (Data Center Interconnect) and content delivery."
            icon={Server} 
            accentColor="blue"
            badges={["DCI", "Hardware"]}
            actionText="Learn More"
          />

          <Card 
            title="Hollow Core Fibre" 
            description="Next-gen fibre technology where light travels through air, significantly reducing latency for high-frequency trading."
            icon={Activity} 
            accentColor="green"
            badges={["Emerging", "Low Latency"]}
            actionText="Learn More"
          />

          <Card 
            title="Quantum Safe Security" 
            description="Advanced encryption solutions designed to protect critical data against future threats from quantum computing."
            icon={ShieldCheck} 
            accentColor="indigo"
            badges={["Security", "Future-Proof"]}
            actionText="Learn More"
          />

          <Card 
            title="Coherent Pluggables" 
            description="Compact pluggable optics (400ZR/ZR+) that bring high-performance coherent transmission to routers and switches."
            icon={Cpu} 
            accentColor="orange"
            badges={["Pluggables", "IP-Optical"]}
            actionText="Learn More"
          />

          <Card 
            title="Dark Fibre" 
            description="Unlit fibre infrastructure that allows operators to deploy their own transmission equipment for maximum control."
            icon={Network} 
            accentColor="slate"
            badges={["Infrastructure"]}
            actionText="Learn More"
          />

           <Card 
            title="Fixed vs. Flex Grid" 
            description="Understanding the shift from rigid spectrum allocation to flexible grids that optimize fibre capacity."
            icon={Layers} 
            accentColor="cyan"
            badges={["Spectrum", "Architecture"]}
            actionText="Learn More"
          />

          <Card 
            title="SD-WAN" 
            description="Software-Defined Wide Area Networking. Decouples control software from hardware for agile, cloud-ready networks."
            icon={Globe} 
            accentColor="teal"
            badges={["Software", "Edge"]}
            actionText="Learn More"
          />

          <Card 
            title="Spectrum Services" 
            description="Managing and optimizing optical spectrum to maximize bandwidth efficiency across subsea and terrestrial networks."
            icon={Wifi} 
            accentColor="violet"
            badges={["Spectrum"]}
            actionText="Learn More"
          />

        </div>
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: PARTNERS PAGE
// ==========================================
const PartnersPage = ({ onBack }) => {
  const partners = [
    { name: "Ziply Fiber", url: "ziplyfiber.com", type: "Carrier Managed Services Provider" },
    { name: "Vocus", url: "www.vocus.com.au", type: "Carrier Managed Services Provider" },
    { name: "Verizon", url: "www.verizon.com", type: "Carrier Managed Services Provider" },
    { name: "Uniti Fiber", url: "www.uniti.com", type: "Carrier Managed Services Provider" },
    { name: "Telxius Cable", url: "www.telxius.com", type: "Carrier Managed Services Provider" },
    { name: "Tampnet AS", url: "www.tampnet.com", type: "Carrier Managed Services Provider" },
    { name: "PLDT Inc.", url: "www.pldt.com.ph", type: "Carrier Managed Services Provider" },
    { name: "FLAG Telecom", url: "www.flagtel.com", type: "Carrier Managed Services Provider" },
    { name: "Etisalat", url: "www.etisalat.ae", type: "Carrier Managed Services Provider" },
    { name: "Space World", url: "www.constl.com", type: "Carrier Managed Services Provider" },
    { name: "Consolidated", url: "www.consolidated.com", type: "Carrier Managed Services Provider" },
    { name: "Claro", url: "www.claro.com.co", type: "Carrier Managed Services Provider" },
    { name: "Cirion", url: "www.ciriontechnologies.com", type: "Carrier Managed Services Provider" },
    { name: "Beyon", url: "www.batelco.com", type: "Carrier Managed Services Provider" },
    { name: "Arelion", url: "www.arelion.com", type: "Carrier Managed Services Provider" },
    { name: "Aqua Comms", url: "www.aquacomms.com", type: "Carrier Managed Services Provider" },
    { name: "Angola Cables", url: "www.angolacables.co.ao", type: "Carrier Managed Services Provider" },
    { name: "WIN Technology", url: "wintechnology.com", type: "Carrier Managed Services Provider" },
    { name: "EXA Infrastructure", url: "www.exainfra.net", type: "Carrier Managed Services Provider" },
    { name: "WOW!", url: "www.wowway.com", type: "Carrier Managed Services Provider" },
    { name: "Vodafone", url: "www.vodafone.co.uk", type: "Carrier Managed Services Provider" }
  ];

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Partner</h1>
           <p className="text-gray-500 max-w-2xl">Locate the right partner to help you design, build, and manage your network with Ciena solutions.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-gray-900 text-sm">Filters</h3><button className="text-xs text-blue-600 hover:underline">Clear All</button></div>
              <div className="flex flex-wrap gap-2 mb-4"><div className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">Carrier Managed... <X className="w-3 h-3 ml-1 cursor-pointer"/></div></div>
            </div>
            <div className="border-b border-gray-200 pb-4"><button className="flex justify-between w-full text-left font-semibold text-sm text-gray-900 mb-2">Ciena Partner Type <ChevronDown className="w-4 h-4"/></button><div className="space-y-2 pl-1"><label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500" defaultChecked/><span>Carrier Managed Services Provider [77]</span></label></div></div>
            <div className="border-b border-gray-200 pb-4"><button className="flex justify-between w-full text-left font-semibold text-sm text-gray-900 mb-2">Geo Regions served <ChevronDown className="w-4 h-4"/></button><div className="space-y-2 pl-1">{["North America [48]", "NorthAm Federal [14]", "Europe Middle East [20]", "Caribbean & Latin [13]", "Asia Pacific [15]"].map((item, i) => (<label key={i} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/><span>{item}</span></label>))}</div></div>
             <div className="border-b border-gray-200 pb-4"><button className="flex justify-between w-full text-left font-semibold text-sm text-gray-900 mb-2">Vertical <ChevronDown className="w-4 h-4"/></button><div className="space-y-2 pl-1">{["Banking/Finance [56]", "Education [44]", "Gov/Civilian [17]", "Healthcare [46]"].map((item, i) => (<label key={i} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500"/><span>{item}</span></label>))}</div></div>
          </div>
          <div className="flex-1">
             <div className="mb-6 relative"><input type="text" placeholder="Search partners..." className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"/><Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5"/></div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {partners.map((p, idx) => (
                 <div key={idx} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start h-full">
                    <div className="h-12 w-auto mb-4 flex items-center">
                       <img src={`https://logo.clearbit.com/${p.url}`} alt={p.name} className="max-h-12 max-w-[120px] object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}/>
                       <span className="text-xl font-bold text-gray-800 hidden">{p.name}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                    <p className="text-xs text-blue-600 mb-2 hover:underline cursor-pointer">{p.url}</p>
                    <p className="text-xs text-gray-500 mt-auto pt-4 border-t w-full border-gray-50">{p.type}</p>
                 </div>
               ))}
             </div>
             <div className="mt-8 flex justify-center items-center gap-4 text-sm font-medium text-gray-600"><span className="text-gray-400 cursor-not-allowed">← Previous</span><span className="text-red-600 border-b-2 border-red-600 px-2 pb-1">1</span><span className="hover:text-red-600 cursor-pointer">2</span><span className="hover:text-red-600 cursor-pointer">3</span><span className="hover:text-red-600 cursor-pointer">Next →</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: FINANCE DIG SHEET
// ==========================================
const AlertCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);

const FinanceDigPage = ({ onBack }) => {
  return (
    <div className="animate-fade-in bg-white min-h-screen">
      <div className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5 rotate-180 mr-2" /> Back
            </button>
            <div className="h-6 w-px bg-gray-700"></div>
            <h1 className="text-xl font-bold">Finance DIG Sheet</h1>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="border-white text-white hover:bg-white/10 py-1 px-4 text-sm h-auto">
               <Download className="w-4 h-4 mr-2 inline" /> Download PDF
             </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg text-red-600"><Globe className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-gray-900">Vertical Snapshot</h2>
          </div>
          <div className="bg-gray-50 border-l-4 border-red-600 p-6 rounded-r-xl">
            <p className="text-gray-700 leading-relaxed text-lg">
              The financial services sector is under immense pressure to modernize. Banks, trading firms, and insurers are battling 
              <span className="font-bold text-gray-900"> strict regulatory compliance (DORA, GDPR)</span>, expanding 
              <span className="font-bold text-gray-900"> AI-driven decisioning</span>, and the need for 
              <span className="font-bold text-gray-900"> ultra-low latency</span> infrastructure. They are moving from legacy, rigid networks to adaptive, cloud-native environments to ensure survival and agility.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><AlertCircleIcon className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-gray-900">Challenges & Opportunities</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 border-b pb-2">Customer Pain Points</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-600 text-sm"><X className="w-4 h-4 text-red-500 mt-1 shrink-0" /><span><strong>Latency Lag:</strong> Microseconds lost in trading execution cost millions in revenue.</span></li>
                <li className="flex items-start gap-2 text-gray-600 text-sm"><X className="w-4 h-4 text-red-500 mt-1 shrink-0" /><span><strong>Data Sovereignty Risk:</strong> Fear of compliance breaches when moving data to the cloud.</span></li>
                <li className="flex items-start gap-2 text-gray-600 text-sm"><X className="w-4 h-4 text-red-500 mt-1 shrink-0" /><span><strong>Rigid Legacy Ops:</strong> Inability to spin up bandwidth quickly for new AI projects.</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 border-b pb-2">Ciena Opportunity</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-600 text-sm"><CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" /><span><strong>Low-Latency Optical:</strong> Position WaveLogic 6 for the fastest possible trading links.</span></li>
                <li className="flex items-start gap-2 text-gray-600 text-sm"><CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" /><span><strong>Encryption Everywhere:</strong> Sell WaveLogic Encryption for compliant, wire-speed security.</span></li>
                <li className="flex items-start gap-2 text-gray-600 text-sm"><CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" /><span><strong>Bandwidth on Demand:</strong> Use MCP to show how they can automate capacity scaling.</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><MessageSquare className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-gray-900">Value Positioning</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl"><h3 className="font-bold text-blue-900 mb-2">Uncompromised Security</h3><p className="text-sm text-blue-800">"Ciena delivers flight-data-recorder quality encryption at wire speed, ensuring you meet DORA compliance without sacrificing performance."</p></div>
            <div className="bg-blue-50 p-5 rounded-xl"><h3 className="font-bold text-blue-900 mb-2">The Speed of Business</h3><p className="text-sm text-blue-800">"Our programmable infrastructure shaves milliseconds off transaction times, giving your trading desks the competitive edge they need."</p></div>
            <div className="bg-blue-50 p-5 rounded-xl"><h3 className="font-bold text-blue-900 mb-2">Future-Proof AI Ready</h3><p className="text-sm text-blue-800">"Scale effortlessly to 800G and 1.6T to handle massive AI data sets without ripping and replacing your current fiber plant."</p></div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600"><Layers className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-gray-900">Proven Use Cases</h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 font-bold text-gray-500">01</div>
              <div><h3 className="font-bold text-gray-900">High-Frequency Trading Interconnect</h3><p className="text-sm text-gray-600 mt-1"><span className="font-semibold text-red-600">Problem:</span> Trading firm losing edge due to network latency. <span className="font-semibold text-red-600">Solution:</span> Ciena Waveserver 5. <span className="font-semibold text-red-600">Outcome:</span> 20% latency reduction, reclaimed market leadership.</p></div>
            </div>
            <div className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 font-bold text-gray-500">02</div>
              <div><h3 className="font-bold text-gray-900">Secure Data Center Mirroring</h3><p className="text-sm text-gray-600 mt-1"><span className="font-semibold text-red-600">Problem:</span> Bank failing recovery time objectives (RTO). <span className="font-semibold text-red-600">Solution:</span> 6500 Family with encrypted wavelengths. <span className="font-semibold text-red-600">Outcome:</span> Real-time synchronous replication with zero compliance risk.</p></div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Zap className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-gray-900">Key Services to Position</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {["Waveserver", "6500 Family", "MCP Controller", "Encrypted Optics"].map((item, i) => (
               <div key={i} className="bg-white border border-gray-200 p-4 rounded-lg text-center font-semibold text-gray-700 hover:border-red-500 transition-colors cursor-default">{item}</div>
             ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><HelpCircle className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-gray-900">Conversation Starters</h2>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl space-y-4">
             <div className="flex gap-3"><div className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 shrink-0"></div><p className="text-gray-800 italic">"How is your current infrastructure handling the new operational resilience frameworks like DORA?"</p></div>
             <div className="flex gap-3"><div className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 shrink-0"></div><p className="text-gray-800 italic">"As you deploy more AI models, are you finding your current data center interconnects are becoming a bottleneck?"</p></div>
             <div className="flex gap-3"><div className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 shrink-0"></div><p className="text-gray-800 italic">"Are you looking at encrypting data in flight at Layer 1 to reduce the processing overhead on your routers?"</p></div>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <div className="bg-gray-900 text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div><h3 className="text-2xl font-bold mb-2">Need Deeper Insights?</h3><p className="text-gray-400">Access the full Finance Vertical toolkit for decks, videos, and more.</p></div>
            <Button variant="primary" onClick={onBack} className="whitespace-nowrap">Open Full Toolkit</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: WAVELOGIC PAGE
// ==========================================
const WaveLogicPage = ({ onBack }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
           <button onClick={() => onBack('home')} className="hover:text-red-600 font-medium transition-colors">Home</button>
           <span className="mx-2">/</span>
           <button onClick={() => onBack('technologies')} className="hover:text-red-600 font-medium transition-colors">Technologies</button>
           <span className="mx-2">/</span>
           <span className="text-red-600 font-medium">WaveLogic</span>
        </div>
      </div>

      <header className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40"><img src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80" alt="Fiber Optics" className="w-full h-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-red-500 font-bold uppercase tracking-widest mb-4">Core Technology</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">WaveLogic 6</h1>
            <p className="text-xl text-gray-300 mb-8 font-light">The industry's first 1.6Tb/s coherent optic. Driving the future of networking with unprecedented capacity and sustainability.</p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById('tech-resources').scrollIntoView({ behavior: 'smooth' })}>View Technical Specs</Button>
              <Button variant="white" onClick={() => setIsChatOpen(true)}><Cpu className="w-4 h-4 mr-2 inline" />Ask Tech Expert ✨</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border-l-4 border-red-600 shadow-sm">
             <div className="mb-4 text-red-600"><Zap className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold mb-2">Massive Capacity</h3>
             <p className="text-gray-600 text-sm">Delivering 1.6Tb/s single-wavelength capacity to meet the demands of AI and cloud workloads.</p>
          </div>
           <div className="bg-white p-6 rounded-xl border-l-4 border-green-600 shadow-sm">
             <div className="mb-4 text-green-600"><TrendingUp className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold mb-2">Sustainability</h3>
             <p className="text-gray-600 text-sm">Industry-leading energy efficiency, reducing power per bit by 50% compared to previous generations.</p>
          </div>
           <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
             <div className="mb-4 text-blue-600"><Cpu className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold mb-2">Programmability</h3>
             <p className="text-gray-600 text-sm">Advanced DSP capabilities allow for tunable capacity and performance optimization across any link.</p>
          </div>
        </section>

        <section id="tech-resources">
          <div className="flex items-center gap-4 mb-8"><div className="h-8 w-1 bg-red-600 rounded-full"></div><h2 className="text-2xl font-bold">Technical Resources</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="WL6 Datasheet" description="Complete technical specifications and performance metrics." icon={FileText} actionText="Download PDF" />
            <Card title="Architecture Guide" description="How to integrate WaveLogic into existing flexible grid networks." icon={Layers} actionText="View Guide" />
            <Card title="Capacity Calculator" description="Estimate reach and capacity improvements for your specific links." icon={BarChart} actionText="Launch Tool" />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8"><div className="h-8 w-1 bg-red-600 rounded-full"></div><h2 className="text-2xl font-bold">Multimedia Learning</h2></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg relative group cursor-pointer">
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
               <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80" alt="Video Thumb" className="w-full h-64 object-cover" />
               <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                     <PlayCircle className="w-8 h-8" />
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-white font-bold text-lg">Inside WaveLogic 6 Extreme</h3>
                  <p className="text-gray-300 text-xs">Video • 4:32</p>
               </div>
            </div>

             <div className="bg-red-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-center text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Tech Talk Podcast</h3>
                    <p className="text-xs text-red-100">Ep 42: The Physics of 1.6T</p>
                  </div>
                </div>
                <audio controls className="w-full h-8 rounded opacity-90 hover:opacity-100 transition-opacity">
                   <source src="Finance_podcast.mp3" type="audio/mpeg" />
                   Your browser does not support the audio element.
                </audio>
            </div>
          </div>
        </section>

      </main>
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} context="WaveLogic" />
    </div>
  );
};

// ==========================================
// THE DIRECTOR (Main App Logic)
// ==========================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-100">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <img src="https://logo.clearbit.com/ciena.com" alt="Ciena" className="h-8 w-auto" 
                   onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-3xl font-black text-red-600">ciena</span>'; }} />
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
              <button onClick={() => navigateTo('home')} className={`hover:text-red-600 transition-colors ${currentView === 'home' ? 'text-red-600 font-bold' : ''}`}>Home</button>
              <button onClick={() => navigateTo('verticals')} className={`hover:text-red-600 transition-colors ${currentView === 'verticals' || currentView === 'finance' ? 'text-red-600 font-bold' : ''}`}>Verticals</button>
              <button onClick={() => navigateTo('partners')} className={`hover:text-red-600 transition-colors ${currentView === 'partners' ? 'text-red-600 font-bold' : ''}`}>Partners</button>
              <button onClick={() => navigateTo('technologies')} className={`hover:text-red-600 transition-colors ${currentView === 'technologies' || currentView === 'wavelogic' ? 'text-red-600 font-bold' : ''}`}>Technologies</button>
            </div>
            <div className="flex items-center"><button onClick={() => setIsAuthenticated(false)} className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wider">Sign Out</button></div>
          </div>
        </div>
      </nav>
      {currentView === 'home' && <HomePage onNavigate={navigateTo} />}
      {currentView === 'finance' && <FinanceVerticalPage onBack={() => navigateTo('verticals')} onNavigateToDig={() => navigateTo('financeDig')} onNavigateToMicroLearning={() => navigateTo('financeMicroLearning')} />}
      {currentView === 'partners' && <PartnersPage onBack={() => navigateTo('home')} />}
      {currentView === 'technologies' && <TechnologiesPage onNavigate={navigateTo} />}
      {currentView === 'wavelogic' && <WaveLogicPage onBack={navigateTo} />}
      {currentView === 'financeDig' && <FinanceDigPage onBack={() => navigateTo('finance')} />}
      {currentView === 'financeMicroLearning' && <FinanceMicroLearningPage onBack={() => navigateTo('finance')} />}
      {currentView === 'verticals' && <VerticalsPage onNavigate={navigateTo} />}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
          <p>© 2024 Ciena Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


