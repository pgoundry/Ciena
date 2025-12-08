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
  ChevronDown
} from 'lucide-react';

// --- Components ---

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

const Card = ({ title, description, icon: Icon, actionText, onClick, accentColor = "red" }) => (
  <div 
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group cursor-pointer"
    onClick={onClick}
  >
    <div className={`w-12 h-12 rounded-lg bg-${accentColor}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 text-${accentColor}-600`} />
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

// --- Main App Component ---

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-100">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
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
              <a href="#" className="hover:text-red-600 transition-colors">Verticals</a>
              <a href="#" className="hover:text-red-600 transition-colors">Products</a>
              <a href="#" className="hover:text-red-600 transition-colors">Insights</a>
              <a href="#" className="hover:text-red-600 transition-colors">Support</a>
              <Button variant="primary" className="px-4 py-1.5 text-sm">Log In</Button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

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
              <Button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
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
        <section>
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

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Meeting Simulation</h3>
                <p className="text-sm text-gray-600 mb-4">Rehearse a live customer conversation with a virtual Finance exec.</p>
                <Button variant="text" className="text-sm">Start Sim <ArrowRight className="w-3 h-3 ml-1 inline"/></Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Webinars</h3>
                <p className="text-sm text-gray-600 mb-4">Access curated pre-recorded webinars covering developments in the sector.</p>
                <Button variant="text" className="text-sm">Browse Library <ArrowRight className="w-3 h-3 ml-1 inline"/></Button>
              </div>
            </div>

          </div>
        </section>

      </main>

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

      {/* Interactive Chat Widget Overlay */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
    </div>
  );
}
