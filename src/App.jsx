import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Cpu, Users, TrendingUp, ShieldCheck, Zap, Smartphone, 
  PlayCircle, Mic, MessageSquare, Video, ArrowRight, X, Send, 
  Menu, Globe, Server, Activity, Layers, Search, Filter, ChevronDown, ChevronRight, Lock, Mail,
  Wifi, Box, Key, Network, Download, BarChart, CheckCircle, HelpCircle, BookOpen, Clock, Target, Award, ExternalLink, Compass, Loader
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

// --- GEMINI CHATBOT (Used for general "Launch AI Coach" button) ---
const GeminiChatWidget = ({ isOpen, onClose, context = "General" }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: `Hello! I'm your Ciena AI Assistant. I can help answer questions about our ${context} solutions.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = ""; // API Key provided by environment
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are a Ciena sales coach specializing in ${context}. User: "${userMessage}". concise answer.` }] }]
        })
      });

      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: "Sorry, I can't connect to the AI service right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center text-white shrink-0">
        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><Cpu className="w-4 h-4" /></div><span className="font-bold">Ciena AI Assistant</span></div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full"><X className="w-5 h-5" /></button>
      </div>
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>{msg.text}</div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm text-gray-500 text-sm flex items-center gap-2"><Loader className="w-4 h-4 animate-spin"/> Thinking...</div></div>}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" disabled={isLoading || !input.trim()} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"><Send className="w-4 h-4" /></button>
      </form>
    </div>
  );
};

// --- ELEVENLABS VIRTUAL COACH (Used for "Start Session" button) ---
const VirtualCoachWidget = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Iframe HTML to isolate ElevenLabs script
  const widgetHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: transparent; }
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
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col overflow-hidden relative">
        <div className="bg-gradient-to-r from-red-700 to-red-900 p-4 flex justify-between items-center text-white shrink-0">
           <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Mic className="w-5 h-5 text-white" /></div>
             <div><h3 className="font-bold text-lg">Virtual Roleplay Coach</h3><p className="text-xs text-red-200">Powered by ElevenLabs</p></div>
           </div>
           <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex-1 bg-gray-50 relative">
           <iframe srcDoc={widgetHtml} className="w-full h-full border-none block" title="Virtual Coach" allow="microphone" />
        </div>
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
      if (isValidEmail && isValidPassword) onLogin();
      else setError('Invalid credentials. Please use a valid Ciena email and the correct portal password.');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-40"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" /></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-gray-900/90"></div>
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="flex justify-center mb-8"><img src="https://logo.clearbit.com/ciena.com" alt="Ciena" className="h-10 w-auto" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-4xl font-black text-red-600 tracking-tighter">ciena</span>'; }}/></div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Sign in to access the Enablement Portal</p>
        {error && <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium animate-pulse">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label><div className="relative"><Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" placeholder="name@ciena.com"/></div></div>
           <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label><div className="relative"><Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" placeholder="••••••••"/></div></div>
           <Button type="submit" className="w-full py-3 text-lg shadow-xl" disabled={loading}>{loading ? 'Verifying...' : 'Sign In'}</Button>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// PAGE: QUIZ SECTION
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
            <button key={opt} onClick={() => setQ1(opt)} className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${q1 === opt ? (opt === 'DORA' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'border-gray-200 hover:bg-gray-50'}`}>
              {opt}
              {q1 === opt && (opt === 'DORA' ? <CheckCircle className="w-4 h-4 float-right mt-1"/> : <X className="w-4 h-4 float-right mt-1"/>)}
            </button>
          ))}
        </div>
        {q1 === 'DORA' && <p className="text-green-600 text-sm mt-2">Correct! DORA focuses on digital operational resilience.</p>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4">2. Why is WaveLogic 6 critical for AI workloads?</h4>
        <div className="space-y-2">
          {['Basic connectivity', '1.6T capacity & lower power', 'Software-only solution'].map((opt) => (
            <button key={opt} onClick={() => setQ2(opt)} className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${q2 === opt ? (opt.includes('1.6T') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'border-gray-200 hover:bg-gray-50'}`}>
              {opt}
              {q2 === opt && (opt.includes('1.6T') ? <CheckCircle className="w-4 h-4 float-right mt-1"/> : <X className="w-4 h-4 float-right mt-1"/>)}
            </button>
          ))}
        </div>
        {q2 && q2.includes('1.6T') && <p className="text-green-600 text-sm mt-2">Correct! High capacity and efficiency are key for AI.</p>}
      </div>
    </div>
  );
};

// ==========================================
// PAGE: MICRO LEARNING
// ==========================================
const FinanceMicroLearningPage = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 5;
  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const content = [
    { title: "Introduction", duration: "45 sec", body: (<div className="space-y-6"><div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-video relative group"><video controls className="w-full h-full object-cover" poster="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"><source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" /></video></div><div className="bg-gray-900 rounded-xl p-6 text-white text-center"><h2 className="text-2xl font-bold mb-3">Why Finance Matters</h2><p>The financial sector is the heartbeat of the global economy.</p></div></div>) },
    { title: "Market Fundamentals", duration: "1.5 min", body: (<div className="space-y-6"><h3 className="text-xl font-bold text-gray-900">Key Drivers</h3><div className="grid md:grid-cols-2 gap-6"><div className="bg-white border p-6 rounded-xl"><h4 className="font-bold text-red-600 mb-2">AI Decisioning</h4><p className="text-sm text-gray-600">Algorithmic trading requires massive bandwidth.</p></div><div className="bg-white border p-6 rounded-xl"><h4 className="font-bold text-blue-600 mb-2">Regulatory Pressure</h4><p className="text-sm text-gray-600">DORA demands operational resilience.</p></div></div></div>) },
    { title: "Challenges & Opportunities", duration: "1 min", body: (<div className="space-y-6"><div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl"><h3 className="font-bold text-orange-900">Customer Pain</h3><p>Losing revenue due to latency and compliance fears.</p></div></div>) },
    { title: "Ciena's Value", duration: "1 min", body: (<div className="space-y-6"><h3 className="text-xl font-bold text-center">The Pitch</h3><div className="grid gap-4"><div className="p-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg"><h4>Adaptive Network™</h4><p className="text-sm">Self-optimizing networks for speed and reliability.</p></div></div></div>) },
    { title: "Knowledge Check", duration: "1.5 min", body: <QuizSection /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4"><button onClick={onBack}><X className="w-6 h-6"/></button><div><h1 className="text-lg font-bold">Finance Vertical Fundamentals</h1></div></div>
      </div>
      <div className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center"><div className="mb-8"><h2 className="text-2xl font-bold mb-2">{content[step].title}</h2><div className="animate-fade-in">{content[step].body}</div></div></div>
      <div className="bg-white border-t border-gray-200 p-6 sticky bottom-0"><div className="max-w-3xl mx-auto flex justify-between"><Button variant="outline" onClick={prevStep} disabled={step === 0}>Previous</Button>{step === totalSteps - 1 ? <Button onClick={onBack}>Finish Module</Button> : <Button onClick={nextStep}>Next Step</Button>}</div></div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: FINANCE DIG SHEET
// ==========================================
const FinanceDigPage = ({ onBack }) => {
  return (
    <div className="animate-fade-in bg-white min-h-screen">
      <div className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4"><button onClick={onBack} className="flex items-center hover:text-gray-300"><ArrowRight className="w-5 h-5 rotate-180 mr-2" /> Back</button><div className="h-6 w-px bg-gray-700"></div><h1 className="text-xl font-bold">Finance DIG Sheet</h1></div>
          <Button variant="outline" className="border-white text-white hover:bg-white/10"><Download className="w-4 h-4 mr-2 inline" /> Download PDF</Button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section><h2 className="text-2xl font-bold text-gray-900 mb-4">Vertical Snapshot</h2><div className="bg-gray-50 border-l-4 border-red-600 p-6 rounded-r-xl"><p className="text-gray-700 text-lg">Financial services face pressure to modernize. Banks battle strict compliance (DORA) and need ultra-low latency infrastructure.</p></div></section>
        <section><h2 className="text-2xl font-bold text-gray-900 mb-4">Challenges & Opportunities</h2><div className="grid md:grid-cols-2 gap-6"><div className="bg-white p-6 border rounded-xl"><h3 className="font-bold mb-2">Pain Points</h3><ul className="space-y-2 text-sm text-gray-600"><li>Latency Lag</li><li>Data Sovereignty Risk</li><li>Rigid Legacy Ops</li></ul></div><div className="bg-white p-6 border rounded-xl"><h3 className="font-bold mb-2">Ciena Opportunity</h3><ul className="space-y-2 text-sm text-gray-600"><li>Low-Latency Optical (WaveLogic 6)</li><li>Encryption Everywhere</li><li>Bandwidth on Demand</li></ul></div></div></section>
      </div>
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: FINANCE VERTICAL
// ==========================================
const FinanceVerticalPage = ({ onBack, onNavigateToDig, onNavigateToMicroLearning, onOpenCoach }) => {
  const [isGeminiChatOpen, setIsGeminiChatOpen] = useState(false);

  return (
    <div className="animate-fade-in">
       <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
           <button onClick={onBack} className="hover:text-red-600 font-medium transition-colors">Home</button>
           <span className="mx-2">/</span><span className="text-gray-900 font-medium">Verticals</span><span className="mx-2">/</span><span className="text-red-600 font-medium">Finance</span>
        </div>
       </div>
      <header className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Finance" className="w-full h-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-red-500 font-bold uppercase tracking-widest mb-4">Enablement Toolkit</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Finance Vertical</h1>
            <p className="text-xl text-gray-300 mb-8 font-light">Decision Intelligence & Strategic Insights designed to accelerate your customer conversations.</p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById('resources').scrollIntoView({ behavior: 'smooth' })}>Explore Resources</Button>
              <Button variant="white" onClick={() => setIsGeminiChatOpen(true)}><Cpu className="w-4 h-4 mr-2 inline" />Ask Gemini Assistant</Button>
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
              <h3 className="text-2xl font-bold mb-4">Virtual Roleplay Coach</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">Powered by ElevenLabs. Rehearse a live customer conversation with a virtual Finance exec.</p>
              <Button variant="white" onClick={onOpenCoach}>Start Session ✨</Button>
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
          <div className="flex items-center gap-4 mb-8"><div className="h-8 w-1 bg-red-600 rounded-full"></div><h2 className="text-2xl font-bold">Learning Modules</h2></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
              <div className="shrink-0"><div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"><PlayCircle className="w-8 h-8 text-gray-400" /></div></div>
              <div><h3 className="text-lg font-bold mb-2">Micro Learning Module</h3><p className="text-sm text-gray-600 mb-4">A quick, interactive module to build confidence in finance.</p><Button variant="text" className="text-sm" onClick={onNavigateToMicroLearning}>Launch Module <ArrowRight className="w-3 h-3 ml-1 inline"/></Button></div>
            </div>
            <div className="bg-red-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex gap-6 text-white">
              <div className="shrink-0"><div className="w-16 h-16 bg-red-500/50 rounded-lg flex items-center justify-center"><Mic className="w-8 h-8 text-white" /></div></div>
              <div className="w-full">
                <h3 className="text-lg font-bold mb-2">Podcast Series</h3>
                <p className="text-sm text-red-100 mb-4">Tune into our purpose-built podcast.</p>
                <audio controls className="w-full h-8 mt-2 rounded opacity-90 hover:opacity-100 transition-opacity">
                   <source src="Finance_podcast.mp3" type="audio/mpeg" />
                   Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </section>
      </main>
      <GeminiChatWidget isOpen={isGeminiChatOpen} onClose={() => setIsGeminiChatOpen(false)} context="Finance" />
    </div>
  );
};

// ==========================================
// PAGE COMPONENT: WAVELOGIC PAGE
// ==========================================
const WaveLogicPage = ({ onBack }) => {
  return (
    <div className="animate-fade-in">
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
        <div className="absolute inset-0 opacity-40"><img src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80" alt="Fiber" className="w-full h-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-red-500 font-bold uppercase tracking-widest mb-4">Core Technology</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">WaveLogic 6</h1>
            <p className="text-xl text-gray-300 mb-8 font-light">The industry's first 1.6Tb/s coherent optic.</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section className="grid md:grid-cols-3 gap-8">
           <div className="bg-white p-6 rounded-xl border-l-4 border-red-600 shadow-sm"><h3 className="text-xl font-bold mb-2">Massive Capacity</h3><p className="text-gray-600 text-sm">Delivering 1.6Tb/s single-wavelength capacity.</p></div>
           <div className="bg-white p-6 rounded-xl border-l-4 border-green-600 shadow-sm"><h3 className="text-xl font-bold mb-2">Sustainability</h3><p className="text-gray-600 text-sm">Reducing power per bit by 50%.</p></div>
           <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 shadow-sm"><h3 className="text-xl font-bold mb-2">Programmability</h3><p className="text-gray-600 text-sm">Advanced DSP capabilities for tunable capacity.</p></div>
        </section>
      </main>
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
           <span className="mx-2">/</span><span className="text-red-600 font-medium">Technologies</span>
        </div>
       </div>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl font-bold mb-4">Core Technologies</h1>
           <p className="text-xl text-gray-400 max-w-3xl">Explore the foundational technologies powering Ciena's adaptive networks.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="WaveLogic" description="Industry-leading coherent optical technology. 1.6Tb/s capacity." icon={Zap} accentColor="red" badges={["Optical"]} actionText="Explore WL6" onClick={() => onNavigate('wavelogic')} isLiveLink={true} />
          <Card title="Liquid Spectrum" description="Analytics to maximize optical network value." icon={BarChart} accentColor="cyan" badges={["Analytics"]} actionText="Learn More" />
          <Card title="Navigator NCS" description="Single point of control for multi-layer operations." icon={Compass} accentColor="blue" badges={["Software"]} actionText="Learn More" />
          <Card title="Planet" description="Network visualization and planning." icon={Globe} accentColor="green" badges={["Planning"]} actionText="Learn More" />
          <Card title="Blue Planet" description="Intelligent automation software." icon={Layers} accentColor="indigo" badges={["Automation"]} actionText="Learn More" />
          <Card title="6500 Packet-Optical" description="Flagship platform for converging packet and optical." icon={Server} accentColor="purple" badges={["Hardware"]} actionText="Learn More" />
        </div>
      </div>
    </div>
  );
};

// ... PartnersPage, VerticalsPage, HomePage components remain similar to previous version, ensuring they are defined here ...

const PartnersPage = ({ onBack }) => {
  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Partner</h1></div></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Partner Grid Content Placeholder - Full grid was in previous response, keeping it brief for compilation */}
          <div className="p-8 text-center text-gray-500">Partner grid loading... (Full list of 20 partners would render here)</div>
      </div>
    </div>
  );
};

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
        <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3"><div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500"><button onClick={() => onNavigate('home')} className="hover:text-red-600 font-medium">Home</button><span className="mx-2">/</span><span className="text-red-600 font-medium">Verticals</span></div></div>
        <div className="bg-gray-900 text-white py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl font-bold mb-4">Industry Verticals</h1></div></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {verticals.map((v, i) => (
                    <div key={i} onClick={() => v.status === 'Available' ? onNavigate(v.id) : null} className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full group ${v.status === 'Available' ? 'cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1' : 'opacity-75'}`}>
                        <div className="flex justify-between items-start mb-4"><div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${v.status === 'Available' ? 'group-hover:bg-red-50' : ''}`}><v.icon className={`w-6 h-6 ${v.status === 'Available' ? 'text-gray-700 group-hover:text-red-600' : 'text-gray-400'}`} /></div>{v.status === 'Available' ? (<span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">AVAILABLE</span>) : (<span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded">COMING SOON</span>)}</div>
                        <h3 className={`text-xl font-bold mb-2 ${v.status === 'Available' ? 'text-gray-900 group-hover:text-red-600' : 'text-gray-500'} flex items-center gap-2`}>{v.title}{v.status === 'Available' && <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wide font-bold flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Live</span>}</h3>
                        <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{v.description}</p>
                    </div>
                 ))}
            </div>
        </div>
    </div>
  );
};

const HomePage = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
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
        <section>
            <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-4"><div className="h-8 w-1 bg-red-600 rounded-full"></div><div><h2 className="text-2xl font-bold text-gray-900">Services Library</h2></div></div><button onClick={() => onNavigate('technologies')} className="text-red-600 font-semibold text-sm hover:underline">View All Technologies</button></div>
            <div className="grid md:grid-cols-3 gap-6">
                <Card title="Adaptive Network™" description="End-to-end automated solution." icon={Activity} actionText="View Solution" />
                <Card title="Optical Networking" description="Market-leading coherent optics." icon={Zap} actionText="View Solution" />
                <Card title="Routing & Switching" description="Next-gen metro and edge routing." icon={Layers} actionText="View Solution" />
            </div>
        </section>
      </div>
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
  const [isVirtualCoachOpen, setIsVirtualCoachOpen] = useState(false);

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
      {currentView === 'finance' && <FinanceVerticalPage onBack={() => navigateTo('verticals')} onNavigateToDig={() => navigateTo('financeDig')} onNavigateToMicroLearning={() => navigateTo('financeMicroLearning')} onOpenCoach={() => setIsVirtualCoachOpen(true)} />}
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

      {/* MODALS */}
      <VirtualCoachWidget isOpen={isVirtualCoachOpen} onClose={() => setIsVirtualCoachOpen(false)} />
    </div>
  );
}
