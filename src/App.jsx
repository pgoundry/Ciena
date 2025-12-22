import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const BlendingShapes = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
      {/* Primary Organic Shape */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-5%] w-[70vw] h-[70vw] rounded-full bg-[#E0Dcd3] mix-blend-multiply blur-3xl opacity-80"
      />

      {/* Secondary Shape */}
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 30, -50, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#CFC5B8] mix-blend-multiply blur-3xl opacity-70"
      />

      {/* The "Binder" Shape */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-[#B0A89E] mix-blend-multiply blur-3xl opacity-40"
      />
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-12 max-w-[1400px] mx-auto">
      <div className="max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Typographically Bold Header */}
          <h1 className="font-serif font-bold text-[15vw] md:text-[11rem] leading-[0.8] tracking-tighter text-stone-900 mix-blend-darken">
            DESIGN IS <br />
            <span className="ml-[10vw] md:ml-[15vw]">DEEP</span> <br />
            <span className="block text-right">UNDERSTANDING</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
          className="mt-16 h-[2px] w-full bg-stone-900 origin-left"
        />
        
        <div className="flex justify-between items-start mt-6">
            <span className="text-xs font-bold tracking-widest uppercase">Perfectly Blended ©</span>
            <span className="text-xs font-bold tracking-widest uppercase">Est. 2024</span>
        </div>
      </div>
    </section>
  );
};

const Positioning = () => {
  return (
    <section className="relative z-10 py-32 px-4 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-3">
           <span className="block w-12 h-12 border border-stone-900 rounded-full flex items-center justify-center text-xl font-serif italic">
               i
           </span>
        </div>
        <div className="lg:col-span-9">
          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight text-stone-900 font-serif">
              We believe complex business challenges are solved by asking better questions.
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-xl md:text-2xl font-sans font-medium leading-relaxed text-stone-800">
              Perfectly Blended applies the essence of design—empathy, clarity, and intentionality—to reveal the true needs hiding within your organization. 
            </p>
            <p className="text-xl md:text-2xl font-sans font-medium leading-relaxed text-stone-600">
              When you understand the problem at its core, the solution designs itself.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const VisualInterlude = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  return (
    <section className="relative z-10 py-32 overflow-hidden border-y border-stone-900/10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          {/* Giant Typographic Texture */}
          <motion.div style={{ y }} className="opacity-10 pointer-events-none select-none">
              <h2 className="text-[20vw] leading-[0.7] font-black font-sans text-stone-900 text-center tracking-tighter">
                  CLARITY
                  <br/>
                  EMPATHY
                  <br/>
                  STRUCTURE
              </h2>
          </motion.div>
          
          {/* Overlay Graphic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div 
                style={{ scale }}
                className="w-[30vw] h-[30vw] border-[1px] border-stone-900 rounded-full flex items-center justify-center backdrop-blur-sm bg-stone-100/10"
             >
                 <div className="w-[1px] h-full bg-stone-900/30" />
                 <div className="h-[1px] w-full bg-stone-900/30 absolute" />
             </motion.div>
          </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const items = [
    { num: "01", title: "Deliberate", desc: "Nothing is extraneous. Every element serves the core purpose." },
    { num: "02", title: "Purposeful", desc: "Precision instead of noise. Clarity emerging from complexity." },
    { num: "03", title: "Restrained", desc: "Confident enough to be quiet. Designed for the real world." }
  ];

  return (
    <section className="relative z-10 py-32 px-4 md:px-12 max-w-[1400px] mx-auto">
        <div className="space-y-0">
            {items.map((item, index) => (
                <FadeIn key={index}>
                    <div className="group border-t border-stone-900 py-16 transition-colors hover:bg-stone-200/50 -mx-4 px-4 md:-mx-12 md:px-12">
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8">
                            <span className="font-mono text-lg md:text-xl font-bold text-stone-900">{item.num}</span>
                            <h3 className="flex-1 font-serif font-bold text-5xl md:text-8xl text-stone-900 tracking-tighter group-hover:translate-x-4 transition-transform duration-500 uppercase">
                                {item.title}
                            </h3>
                            <span className="md:w-80 font-sans text-lg md:text-xl font-medium text-stone-600">
                                {item.desc}
                            </span>
                        </div>
                    </div>
                </FadeIn>
            ))}
            <div className="border-t border-stone-900" />
        </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative z-10 py-24 px-4 md:px-12 bg-stone-900 text-[#F5F4F0]">
      <div className="max-w-[1400px] mx-auto flex flex-col justify-between min-h-[40vh]">
        <div className="flex justify-between items-start">
            <h4 className="font-serif font-bold text-4xl md:text-6xl tracking-tighter leading-none">
                Perfectly <br/> Blended.
            </h4>
            <div className="text-right">
                <p className="font-mono text-sm uppercase tracking-widest opacity-60">Contact</p>
                <p className="mt-2 text-xl hover:underline cursor-pointer">hello@perfectlyblended.design</p>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="max-w-md text-lg opacity-80">
                An approach to solving complex business problems through the lens of intentional design.
            </p>
            <span className="font-mono text-xs opacity-40">© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#F5F4F0] text-stone-900 selection:bg-stone-900 selection:text-[#F5F4F0] overflow-x-hidden font-sans">
      <BlendingShapes />
      
      <main>
        <Hero />
        <Positioning />
        <VisualInterlude />
        <Philosophy />
      </main>

      <Footer />
      
      {/* Grain Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default App;
