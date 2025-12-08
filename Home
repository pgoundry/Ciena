import React, { useState } from 'react';
import { 
  FileText, 
  Cpu, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  PlayCircle, 
  Mic, 
  MessageSquare, 
  Video,
  ArrowRight,
  X,
  Send,
  Menu,
  ChevronDown,
  Globe,
  Server,
  Activity,
  Briefcase,
  Layers
} from 'lucide-react';

// --- Shared UI Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-red-200",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
    white: "bg-white text-gray-900 hover:bg-gray-100 shadow-md",
    text: "text-red-600 hover:text-red-800 px-0 hover:translate-y-0"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ title, description, icon: Icon, actionText, onClick, accentColor = "red", badges = [] }) => (
  <div 
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-lg bg-${accentColor}-50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 text-${accentColor}-600`} />
      </div>
      {badges.length > 0 && (
        <div className="flex gap-2">
          {badges.map((badge, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase tracking-wider">{badge}</span>
          ))}
        </div>
      )}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{description}</p>
    {actionText && (
      <div className="flex items-center text-red-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
        {actionText} <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    )}
  </div>
);

const TrendCard = ({ title, subtitle, icon: Icon }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
    </div>
    <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">{subtitle}</h4>
    <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
  </div>
);

const ChatWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm your Finance AI Coach. I can help you practice discovery questions or explore customer challenges in the finance sector. What would you like to focus on today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "That's a great topic. In the finance vertical, latency and compliance are key. Try asking the customer: 'How is your current infrastructure handling the new operational resilience frameworks?'" 
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-fade-in-up h-[500px]">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-bold">Finance AI Coach</span>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full"><X className="w-5 h-5" /></button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button type="submit" className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

// --- Page Components ---

const HomePage = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      {/* Home Hero */}
      <section className="bg-gray-900 text-white relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
            alt="Data Center" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Enablement <span className="text-red-600">Portal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Your central hub for Ciena enablement resources. Explore service libraries, partner profiles, and deep-dive vertical intelligence to accelerate your sales conversations.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => document.getElementById('verticals').scrollIntoView({behavior: 'smooth'})}>Explore Verticals</Button>
            <Button variant="outline">New Solutions</Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Services Library */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="h-8 w-1 bg-red-600 rounded-full"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Services Library</h2>
                <p className="text-gray-500 text-sm mt-1">Clear summaries of key offerings and their value.</p>
              </div>
            </div>
            <a href="#" className="text-red-600 font-semibold text-sm hover:underline">View All Services</a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              title="Adaptive Network™" 
              description="An end-to-end automated solution that combines programmable infrastructure, analytics, and software control to adapt to changing demands."
              icon={Activity}
              actionText="View Solution"
            />
            <Card 
              title="Optical Networking" 
              description="Market-leading coherent optics that maximize fiber capacity and reach, reducing cost per bit for high-growth bandwidth applications."
              icon={Zap}
              actionText="View Solution"
            />
            <Card 
              title="Routing & Switching" 
              description="Next-gen metro and edge routing platforms designed to bring IP and Optical layers together for simplified, efficient operations."
              icon={Layers}
              actionText="View Solution"
            />
          </div>
        </section>

        {/* Partner Profiles */}
        <section className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1 bg-red-600 rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Partner Profiles</h2>
                  <p className="text-gray-500 text-sm mt-1">Snapshots of key partners and growth opportunities.</p>
                </div>
              </div>
              <a href="#" className="text-red-600 font-semibold text-sm hover:underline flex items-center group">
                View All Profiles <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                title="Virgin Media O2" 
                description="Converged connectivity champion in the UK. Focused on network expansion and 5G rollout. Key opportunities in high-capacity backhaul and XGS-PON."
                icon={Globe}
                accentColor="red"
                badges={["Tier 1", "UK"]}
                actionText="View Profile"
              />
              <Card 
                title="Colt" 
                description="Global digital infrastructure company. Investing heavily in IQ Network. High demand for On Demand services and high-bandwidth optical solutions."
                icon={Server}
                accentColor="rose"
                badges={["Global", "On Demand"]}
                actionText="View Profile"
              />
              <Card 
                title="Zayo" 
                description="Leading communications infrastructure provider. Extensive fiber footprint. Strategic partner for dark fiber and wavelength services."
                icon={Zap}
                accentColor="orange"
                badges={["Infrastructure", "Dark Fiber"]}
                actionText="View Profile"
              />
            </div>
          </div>
        </section>

        {/* Market / Vertical Knowledge */}
        <section id="verticals">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="h-8 w-1 bg-red-600 rounded-full"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Market & Vertical Knowledge</h2>
                <p className="text-gray-500 text-sm mt-1">Focused guides on industry trends and buying behaviors.</p>
              </div>
            </div>
            <a href="#" className="text-red-600 font-semibold text-sm hover:underline flex items-center group">
               View All Verticals <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* The Finance Card links to the detailed page */}
            <div 
              onClick={() => onNavigate('finance')}
              className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">FEATURED</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Finance</h3>
              <p className="text-gray-600 mb-6 text-sm">
                High-frequency trading, compliance, and data sovereignty. Learn how to position low-latency solutions.
              </p>
              <div className="flex items-center text-red-600 font-bold text-sm">
                Open Toolkit <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Placeholder Verticals */}
            <Card 
              title="Healthcare" 
              description="Telemedicine and large imaging data transfers. Focus on high-bandwidth, secure connectivity for hospital networks."
              icon={Activity}
              accentColor="teal"
              actionText="Coming Soon"
            />
            <Card 
              title="Utilities" 
              description="Smart grid modernization and OT/IT convergence. Ruggedized solutions for harsh environments."
              icon={Zap}
              accentColor="orange"
              actionText="Coming Soon"
            />
          </div>
        </section>

      </div>
    </div>
  );
};

const FinanceVerticalPage = ({ onBack }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="animate-fade-in">
       {/* Breadcrumb / Back Navigation */}
       <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
           <button onClick={onBack} className="hover:text-red-600 font-medium transition-colors">Home</button>
           <span className="mx-2">/</span>
           <span className="text-gray-900 font-medium">Verticals</span>
           <span className="mx-2">/</span>
           <span className="text-red-600 font-medium">Finance</span>
        </div>
       </div>

      {/* Hero Section */}
      <header className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
            alt="Finance Skyscraper" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-red-500 font-bold uppercase tracking-widest mb-4">Enablement Toolkit</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Finance Vertical
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-light">
              Decision Intelligence & Strategic Insights designed to accelerate your customer conversations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById('resources').scrollIntoView({ behavior: 'smooth' })}>
                Explore Resources
              </Button>
              <Button variant="white" onClick={() => setIsChatOpen(true)}>
                <Cpu className="w-4 h-4 mr-2 inline" />
                Launch AI Coach
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* Quick Access Tools */}
        <section id="resources">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-bold">Quick Access Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              title="Finance DIG" 
              description="Your comprehensive Decision Intelligence Guide for navigating complex financial accounts."
              icon={FileText}
              actionText="Download PDF"
            />
            <Card 
              title="Strategic Deck" 
              description="Customer-facing presentation slides tailored for the Finance conversation."
              icon={Users}
              actionText="View Deck"
            />
            <Card 
              title="Intelligence Pack" 
              description="Deep dive vertical intelligence, market analysis, and competitor insights."
              icon={TrendingUp}
              actionText="Access Pack"
            />
            <Card 
              title="Proof & Outcomes" 
              description="Case studies and proof points showing Ciena's impact in Finance."
              icon={ShieldCheck}
              actionText="Read Stories"
            />
          </div>
        </section>

        {/* Support Section */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* AI Coach Block */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-red-600 rounded-full text-xs font-bold mb-4">NEW</div>
              <h3 className="text-2xl font-bold mb-4">AI Virtual Coach</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Get instant, conversational guidance tailored to the finance sector. Practice discovery questions, explore customer challenges, and test your positioning—all in a realistic dialogue.
              </p>
              <Button variant="white" onClick={() => setIsChatOpen(true)}>
                Start Session
              </Button>
            </div>
          </div>

          {/* Connect Team Block */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg flex flex-col justify-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Connect with the CMS Team</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Available to support your work across the finance vertical. Whether preparing for a meeting or shaping a value-led narrative, reach out for expert guidance.
            </p>
            <div>
              <Button variant="outline">Contact Expert</Button>
            </div>
          </div>
        </section>

        {/* Market Trends */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-bold">Market Trends & Insights</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrendCard 
              subtitle="AI Decisioning"
              title="Rise of AI-Driven Decisioning in Financial Services"
              icon={Cpu}
            />
            <TrendCard 
              subtitle="Compliance"
              title="Compliance Pressure and the New Era of Secure Data"
              icon={ShieldCheck}
            />
            <TrendCard 
              subtitle="Low Latency"
              title="Modernising Trading Infrastructure for Ultra-Low Latency"
              icon={Zap}
            />
            <TrendCard 
              subtitle="Digital Banking"
              title="The Shift to Digital Banking and Cloud-Native Ops"
              icon={Smartphone}
            />
          </div>
        </section>

        {/* Learning Resources */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-bold">Learning Modules</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Micro Learning Module</h3>
                <p className="text-sm text-gray-600 mb-4">A quick, interactive module to build confidence in finance in just a few minutes.</p>
                <Button variant="text" className="text-sm">Launch Module <ArrowRight className="w-3 h-3 ml-1 inline"/></Button>
              </div>
            </div>

            <div className="bg-red-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex gap-6 text-white">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-red-500/50 rounded-lg flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Podcast Series</h3>
                <p className="text-sm text-red-100 mb-4">Tune into our purpose-built podcast. An easy way to deepen your understanding on the go.</p>
                <button className="text-sm font-bold hover:text-red-200 flex items-center">Play Now <ArrowRight className="w-3 h-3 ml-1"/></button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'finance'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-100">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => navigateTo('home')}
            >
              <img 
                src="https://logo.clearbit.com/ciena.com" 
                alt="Ciena" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span class="text-3xl font-black tracking-tighter text-red-600 lowercase" style="font-family: system-ui, sans-serif">ciena</span>';
                }}
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
              <button onClick={() => navigateTo('home')} className={`hover:text-red-600 transition-colors ${currentView === 'home' ? 'text-red-600 font-bold' : ''}`}>Home</button>
              <button onClick={() => document.getElementById('verticals')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-red-600 transition-colors">Verticals</button>
              <button className="hover:text-red-600 transition-colors">Products</button>
              <button className="hover:text-red-600 transition-colors">Partners</button>
              <Button variant="primary" className="px-4 py-1.5 text-sm">Log In</Button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
           <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
              <button onClick={() => navigateTo('home')} className="block w-full text-left font-medium">Home</button>
              <button onClick={() => navigateTo('finance')} className="block w-full text-left font-medium">Finance Vertical</button>
           </div>
        )}
      </nav>

      {/* View Switcher */}
      {currentView === 'home' ? (
        <HomePage onNavigate={navigateTo} />
      ) : (
        <FinanceVerticalPage onBack={() => navigateTo('home')} />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Insights</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500">Featured Insights</a></li>
              <li><a href="#" className="hover:text-red-500">Blog</a></li>
              <li><a href="#" className="hover:text-red-500">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500">About Us</a></li>
              <li><a href="#" className="hover:text-red-500">Careers</a></li>
              <li><a href="#" className="hover:text-red-500">Partners</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500">Contact Sales</a></li>
              <li><a href="#" className="hover:text-red-500">Contact Support</a></li>
              <li><a href="#" className="hover:text-red-500">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quicklinks</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500">Podcasts</a></li>
              <li><a href="#" className="hover:text-red-500">Newsroom</a></li>
              <li><a href="#" className="hover:text-red-500">MyCiena Portal</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex justify-between items-center text-xs">
          <p>© 2024 Ciena Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
