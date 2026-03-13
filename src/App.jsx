import React, { useState, useEffect, useRef } from 'react';
import {
  Code2, Terminal, Cpu, CheckCircle,
  Trophy, Users, Play, RotateCcw,
  ChevronRight, Braces, Briefcase,
  Globe2, Sparkles, BookOpen, Laptop,
  ChevronLeft
} from 'lucide-react';

const GFG_GREEN = '#2f8d46';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const animationRef = useRef(null);
  const duration = 30; // 30 seconds Reel

  useEffect(() => {
    if (isPlaying) {
      let startTime = performance.now() - (time * 1000);

      const animate = (currentTime) => {
        const elapsedTime = (currentTime - startTime) / 1000;
        if (elapsedTime >= duration) {
          setTime(duration);
          setIsPlaying(false);
        } else {
          setTime(elapsedTime);
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const togglePlay = () => {
    if (time >= duration) setTime(0);
    setIsPlaying(!isPlaying);
  };

  // Scene Router - perfectly timed sequence
  const getScene = () => {
    if (time < 3.5) return <Scene1Intro time={time} />;
    if (time >= 3.5 && time < 8) return <Scene2Ecosystem time={time} />;
    if (time >= 8 && time < 13) return <Scene3DSA time={time} />;
    if (time >= 13 && time < 18) return <Scene4Dev time={time} />;
    if (time >= 18 && time < 23.5) return <Scene5Success time={time} />;
    if (time >= 23.5 && time < 27) return <Scene6Community time={time} />;
    if (time >= 27) return <Scene7Outro time={time} />;
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans overflow-hidden selection:bg-[#2f8d46] selection:text-white">
      {/* 9:16 Vertical Phone Container */}
      <div className="relative w-full max-w-[360px] h-[640px] bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(47,141,70,0.15)] border-[8px] border-neutral-900 ring-1 ring-neutral-800">

        {/* Cinematic Grid Background (Persistent) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(#2f8d46 1px, transparent 1px), linear-gradient(90deg, #2f8d46 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            transform: `translateY(${time * 15}px)`
          }}
        />

        {/* Dynamic Scene Renderer */}
        <div className="absolute inset-0 w-full h-full z-10">
          {getScene()}
        </div>

        {/* Reel UI Overlay (Progress Bar) */}
        <div className="absolute bottom-0 w-full p-5 z-50 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#2f8d46] transition-colors focus:outline-none drop-shadow-lg"
            >
              {time >= duration ? <RotateCcw size={24} /> : (isPlaying ? <div className="w-5 h-5 flex gap-1"><div className="w-2 bg-white rounded-sm h-full" /><div className="w-2 bg-white rounded-sm h-full" /></div> : <Play size={24} fill="currentColor" />)}
            </button>
            <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-white/10" />
              <div
                className="h-full bg-gradient-to-r from-[#2f8d46] to-emerald-400 relative z-10"
                style={{ width: `${(time / duration) * 100}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/40 blur-[2px]" />
              </div>
            </div>
            <span className="text-white text-xs font-mono font-bold w-6 text-right opacity-80">{Math.floor(time)}s</span>
          </div>
        </div>

        {/* Tap to Play Initial Screen */}
        {!isPlaying && time === 0 && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-[100] cursor-pointer" onClick={togglePlay}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#2f8d46] rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="w-20 h-20 bg-gradient-to-br from-[#2f8d46] to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_30px_#2f8d46] relative z-10 border border-white/20 hover:scale-105 transition-transform">
                <Play size={36} fill="white" className="text-white ml-2" />
              </div>
            </div>
            <p className="text-white font-bold tracking-[0.2em] uppercase mt-8 text-sm flex items-center gap-2 drop-shadow-lg">
              <Sparkles size={16} className="text-yellow-400" /> Tap to Play Reel
            </p>
          </div>
        )}
      </div>

      {/* Global Styles & Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
        
        .font-brand { font-family: 'Space Grotesk', sans-serif; }
        .font-code { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px rgba(47,141,70,0.5); } 50% { text-shadow: 0 0 25px rgba(47,141,70,0.9), 0 0 5px white; } }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleInCenter { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes codeType { from { width: 0; } to { width: 100%; } }
        @keyframes bracketLeft { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes bracketRight { from { transform: translateX(-50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes gfgPop { 0% { transform: scale(0.8); opacity: 0; } 70% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        
        .glass-panel {
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
        .gfg-gradient-text {
          background: linear-gradient(135deg, #fff 0%, #a7f3d0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-neon {
          color: #fff;
          animation: textGlow 2s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}

// ==========================================
// SCENES
// ==========================================

// 1. Opening Brand Hook (0 - 3.5s) - PERFECTED GfG ANIMATION
const Scene1Intro = ({ time }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#050505]">
      {/* Cinematic Spotlight */}
      <div className="absolute top-0 w-full h-2/3 bg-gradient-to-b from-[#2f8d46]/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-[#2f8d46] rounded-full blur-[100px] opacity-20 animate-pulse" />
      </div>

      {/* GfG Animated Logo Build */}
      <div className="z-10 flex flex-col items-center w-full">
        <div className="relative flex items-center justify-center mb-8 h-24">
          <span className="text-[#2f8d46] font-code font-light text-7xl opacity-0 animate-[bracketLeft_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
            {'{'}
          </span>
          <span className="text-white font-brand font-black text-6xl tracking-tighter mx-3 opacity-0 animate-[gfgPop_0.5s_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] drop-shadow-2xl">
            GfG
          </span>
          <span className="text-[#2f8d46] font-code font-light text-7xl opacity-0 animate-[bracketRight_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
            {'}'}
          </span>
        </div>

        {time > 1.2 && (
          <h1 className="text-center font-brand font-black text-3xl leading-tight px-4 opacity-0 animate-[slideUpFade_0.5s_ease-out_forwards]">
            <span className="text-white drop-shadow-md">Want to become a</span><br />
            <span className="text-[#2f8d46] text-neon block mt-2 tracking-wide">Top 1% Developer?</span>
          </h1>
        )}
      </div>
    </div>
  );
};

// 2. The Ecosystem (3.5 - 8s)
const Scene2Ecosystem = ({ time }) => {
  const localTime = time - 3.5;
  const features = [
    { icon: <BookOpen size={20} />, text: 'Premium Courses', delay: '0.1s' },
    { icon: <Code2 size={20} />, text: 'POTD & Practice', delay: '0.3s' },
    { icon: <Briefcase size={20} />, text: 'Job Portal', delay: '0.5s' },
    { icon: <Users size={20} />, text: '1:1 Mentorship', delay: '0.7s' }
  ];

  return (
    <div className="w-full h-full flex flex-col relative bg-[#0a0a0a] p-6 pt-16">
      <div className="absolute right-[-50px] top-20 w-40 h-40 bg-[#2f8d46]/20 blur-[60px] rounded-full" />

      <h2 className="text-white font-brand font-bold text-3xl mb-8 z-10 opacity-0 animate-[slideUpFade_0.4s_forwards]">
        The Ultimate<br />
        <span className="text-gray-400 text-xl font-medium tracking-wide">Learning Ecosystem.</span>
      </h2>

      <div className="space-y-4 z-10 w-full">
        {features.map((f, i) => (
          <div
            key={i}
            className="glass-panel rounded-xl p-4 flex items-center gap-4 transform translate-y-10 opacity-0 shadow-lg"
            style={{
              animation: `slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${f.delay} forwards`,
              borderLeft: `4px solid ${GFG_GREEN}`
            }}
          >
            <div className="bg-[#2f8d46]/20 p-2 rounded-lg text-emerald-400">
              {f.icon}
            </div>
            <span className="text-white font-semibold text-lg">{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. DSA Mastery (8 - 13s)
const Scene3DSA = ({ time }) => {
  const localTime = time - 8;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#050805]">
      {/* Abstract Binary Tree */}
      <div className="relative w-full h-64 z-10 flex flex-col items-center mt-[-60px]">
        {/* Level 1 */}
        <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-code font-bold text-lg transition-all duration-300 ${localTime > 0.5 ? 'bg-[#2f8d46] border-emerald-300 text-white shadow-[0_0_20px_#2f8d46]' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>10</div>

        {/* Lines L1->L2 */}
        <div className="absolute top-12 w-32 h-10 border-t-2 border-l-2 border-r-2 rounded-t-xl transition-all duration-300" style={{ borderColor: localTime > 1 ? '#2f8d46' : '#333' }} />

        {/* Level 2 */}
        <div className="flex gap-20 mt-8">
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-code font-bold transition-all duration-300 ${localTime > 1.5 ? 'bg-[#2f8d46] border-emerald-300 text-white shadow-[0_0_20px_#2f8d46]' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>5</div>
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-code font-bold transition-all duration-300 ${localTime > 2.5 ? 'bg-[#2f8d46] border-emerald-300 text-white shadow-[0_0_20px_#2f8d46]' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>20</div>
        </div>

        {/* Lines L2->L3 */}
        <div className="absolute top-32 left-1/2 -ml-[4.5rem] w-16 h-8 border-t-2 border-l-2 border-r-2 rounded-t-xl transition-all duration-300" style={{ borderColor: localTime > 2 ? '#2f8d46' : '#333' }} />

        {/* Level 3 (Partial) */}
        <div className="flex gap-4 mt-8 absolute top-[130px] left-1/2 -ml-[6rem]">
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-code text-sm font-bold transition-all duration-300 ${localTime > 2.2 ? 'bg-[#2f8d46] border-emerald-300 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>1</div>
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-code text-sm font-bold transition-all duration-300 ${localTime > 2.4 ? 'bg-[#2f8d46] border-emerald-300 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>8</div>
        </div>
      </div>

      <div className="absolute bottom-28 text-center px-4 w-full">
        <h2 className="text-white font-brand font-black text-4xl uppercase tracking-widest drop-shadow-xl opacity-0 animate-[slideUpFade_0.5s_forwards]">
          Master<br />
          <span className="text-[#2f8d46]">DSA</span>
        </h2>
        <p className="text-gray-400 font-code text-sm mt-3 opacity-0 animate-[slideUpFade_0.5s_0.2s_forwards] border border-gray-700 bg-gray-900/50 inline-block px-4 py-1.5 rounded-full">
          O(1) to get hired.
        </p>
      </div>
    </div>
  );
};

// 4. Dev & Languages (13 - 18s) - SYNTAX FIXED
const Scene4Dev = ({ time }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#0a0f14] p-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#2f8d46]/10 to-transparent" />

      {/* Mock IDE Window */}
      <div className="w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-[#333] z-10" style={{ animation: 'float 6s ease-in-out infinite' }}>
        {/* IDE Header */}
        <div className="h-8 bg-[#2d2d2d] flex items-center px-3 gap-2 border-b border-[#1e1e1e]">
          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" /></div>
          <span className="text-[#858585] text-[10px] font-code ml-2 flex-1 text-center">app.js - GeeksforGeeks</span>
        </div>

        {/* IDE Body */}
        <div className="p-4 font-code text-[11px] leading-relaxed text-gray-300 tracking-tight">
          <div className="flex"><span className="text-blue-400 w-6 text-right mr-3 select-none">1</span><span className="text-purple-400">import</span> {'{'} <span className="text-yellow-300">Build</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-300">'@gfg'</span>;</div>
          <div className="flex"><span className="text-blue-400 w-6 text-right mr-3 select-none">2</span></div>
          <div className="flex"><span className="text-blue-400 w-6 text-right mr-3 select-none">3</span><span className="text-blue-400">const</span> <span className="text-blue-300">career</span> = <span className="text-purple-400">new</span> <span className="text-yellow-300">Build</span>();</div>

          {/* Animated typing line with FIXED JSX syntax */}
          <div className="flex mt-1 relative">
            <span className="text-blue-400 w-6 text-right mr-3 select-none">4</span>
            <div className="overflow-hidden whitespace-nowrap inline-flex items-center" style={{ animation: 'codeType 1.5s steps(30, end) forwards' }}>
              <span className="text-blue-300">career</span>.<span className="text-yellow-200">levelUp</span>({'{\u00A0'}<span className="text-orange-300">skills</span>: [<span className="text-green-300">'MERN'</span>, <span className="text-green-300">'AI'</span>]{'\u00A0}'});
            </div>
            <span className="w-1.5 h-3.5 bg-gray-400 ml-1 mt-1 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-28 w-full px-6 text-center z-20">
        <h2 className="text-white font-brand font-black text-2xl drop-shadow-lg opacity-0 animate-[slideUpFade_0.5s_0.5s_forwards] leading-tight">
          Build Real World <br /><span className="text-emerald-400">Projects</span>
        </h2>
        <div className="flex justify-center gap-3 mt-5 opacity-0 animate-[slideUpFade_0.5s_0.8s_forwards]">
          <div className="bg-[#1a1a1a] p-2 rounded-lg border border-gray-700 text-yellow-500 text-xs font-bold font-code shadow-lg">JS</div>
          <div className="bg-[#1a1a1a] p-2 rounded-lg border border-gray-700 text-blue-500 text-xs font-bold font-code shadow-lg">PY</div>
          <div className="bg-[#1a1a1a] p-2 rounded-lg border border-gray-700 text-red-500 text-xs font-bold font-code shadow-lg">JAVA</div>
          <div className="bg-[#1a1a1a] p-2 rounded-lg border border-gray-700 text-cyan-500 text-xs font-bold font-code shadow-lg">C++</div>
        </div>
      </div>
    </div>
  );
};

// 5. Success/Placement (18 - 23.5s)
const Scene5Success = ({ time }) => {
  const localTime = time - 18;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#000] p-6">

      {/* Mock Terminal Execution */}
      <div className="w-full max-w-[300px] bg-black border-2 border-neutral-800 rounded-lg p-5 font-code text-sm z-10 shadow-2xl relative overflow-hidden">
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-white/5 opacity-0 animate-[slideDown_2s_linear_infinite]" style={{ height: '20%' }} />

        <div className="text-gray-400 mb-3 flex items-center gap-2"><ChevronRight size={16} className="text-[#2f8d46]" /> gfg submit sol.cpp</div>

        {localTime > 0.5 && <div className="text-yellow-400 mb-2 pl-6">Compiling...</div>}
        {localTime > 1.2 && <div className="text-cyan-400 mb-3 pl-6">Running Test Cases [100/100]</div>}

        {localTime > 1.5 && (
          <div className="w-full h-2.5 bg-neutral-900 rounded-full mt-2 overflow-hidden border border-neutral-700">
            <div className="h-full bg-[#2f8d46] animate-[codeType_0.8s_ease-out_forwards]" />
          </div>
        )}

        {localTime > 2.5 && (
          <div className="mt-5 text-[#2f8d46] font-bold flex items-center gap-2 animate-[scaleInCenter_0.3s_forwards] bg-[#2f8d46]/10 p-2 rounded border border-[#2f8d46]/30">
            <CheckCircle size={20} /> All Test Cases Passed!
          </div>
        )}
      </div>

      {localTime > 3.2 && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_forwards]">
          <div className="flex flex-col items-center animate-[scaleInCenter_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
            <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(250,204,21,0.5)] mb-6 border-4 border-yellow-200">
              <Trophy size={56} className="text-white" />
            </div>
            <h1 className="text-white font-brand font-black text-5xl uppercase tracking-widest text-center leading-tight text-neon">
              Get<br />Placed
            </h1>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `@keyframes slideDown { from { transform: translateY(-100%); opacity: 1; } to { transform: translateY(500%); opacity: 0; } } @keyframes fadeIn { to { opacity: 1 } }` }} />
    </div>
  );
};

// 6. Community & Stats (23.5 - 27s)
const Scene6Community = ({ time }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#050a05] p-6 text-center">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Globe2 size={400} className="animate-[spin_40s_linear_infinite]" />
      </div>

      <div className="z-10 space-y-8 w-full">
        <div className="glass-panel p-8 rounded-3xl transform hover:scale-105 transition-transform duration-500 opacity-0 animate-[slideUpFade_0.6s_forwards] border-t border-white/20">
          <h3 className="text-6xl font-brand font-black text-white mb-2 gfg-gradient-text drop-shadow-lg">
            10M+
          </h3>
          <p className="text-[#2f8d46] font-bold uppercase tracking-widest text-sm">Global Geeks</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl transform hover:scale-105 transition-transform duration-500 opacity-0 animate-[slideUpFade_0.6s_0.3s_forwards] border-t border-white/20">
          <h3 className="text-4xl font-brand font-black text-white mb-2 gfg-gradient-text drop-shadow-lg">
            Top MNCs
          </h3>
          <p className="text-[#2f8d46] font-bold uppercase tracking-widest text-sm">Hiring Alumni</p>
        </div>
      </div>
    </div>
  );
};

// 7. Final Brand Outro (27 - 30s)
const Scene7Outro = ({ time }) => {
  const localTime = time - 27;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-black p-6">

      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-[#2f8d46] rounded-full blur-[120px] opacity-40 animate-pulse" />
      </div>

      <div className={`z-10 flex flex-col items-center transition-all duration-700 ${localTime > 0.2 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>

        {/* Outro Logo */}
        <div className="flex items-center justify-center mb-6 relative">
          <span className="text-[#2f8d46] font-code font-light text-5xl mr-2">{"{"}</span>
          <span className="text-white font-brand font-black text-5xl tracking-tighter z-10 drop-shadow-xl">GfG</span>
          <span className="text-[#2f8d46] font-code font-light text-5xl ml-2">{"}"}</span>
        </div>

        <h1 className="text-white font-brand font-bold text-4xl text-center leading-tight mb-10 drop-shadow-md">
          Code Your<br />
          <span className="text-[#2f8d46] text-neon">Future.</span>
        </h1>

        {/* CTA Button */}
        <button className="bg-white text-black font-brand font-bold text-lg py-3.5 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-bounce flex items-center gap-2 hover:bg-gray-200 transition-colors">
          Start Learning <ChevronRight size={20} strokeWidth={3} />
        </button>

        <p className="text-gray-500 font-code mt-10 tracking-widest text-xs uppercase bg-black/50 px-4 py-1 rounded-full border border-gray-800">
          geeksforgeeks.org
        </p>
      </div>
    </div>
  );
};
