"use client";
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '40px' }}>

      {/* 3D Animated Square Grid Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '15%', zIndex: 0, perspective: '1000px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotateX: [30, 40, 30], scale: [1.2, 1.3, 1.2] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          style={{
            width: '150%', height: '150%',
            backgroundImage: 'linear-gradient(rgba(204, 255, 0, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 255, 0, 0.25) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center',
            transformOrigin: 'center center'
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--background) 70%)' }} />
      </div>

      {/* Left Element */}
      <motion.div
        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
        style={{ position: 'absolute', left: '5%', top: '40%', zIndex: 2, maxWidth: '200px' }}
      >
        <div style={{ fontSize: '10px', color: 'var(--accent-yellow)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', fontWeight: 800 }}>System v2.0</div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Empowering the next generation of visual storytellers with AI-native tools.</p>
      </motion.div>

      {/* Right Element */}
      <motion.div
        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
        style={{ position: 'absolute', right: '5%', top: '40%', zIndex: 2, maxWidth: '200px', textAlign: 'right' }}
      >
        <div style={{ fontSize: '10px', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', fontWeight: 800 }}>Global Scale</div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Over 1 million cinematic frames rendered autonomously daily.</p>
      </motion.div>

      {/* Center Main Content */}
      <div style={{ textAlign: 'center', zIndex: 2, padding: '20px', pointerEvents: 'none', marginBottom: '10%' }}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
        >
          NATIVE <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--accent-yellow)' }}>SUITE</span>
        </motion.h1>
      </div>

      {/* Neon Sliding Bar */}
      <div style={{ position: 'absolute', bottom: '12%', width: '100%', background: 'var(--accent-yellow)', padding: '12px 0', overflow: 'hidden', zIndex: 2, display: 'flex' }}>
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ whiteSpace: 'nowrap', display: 'flex', gap: '32px', color: '#000', fontWeight: 900, fontSize: '14px', letterSpacing: '1px' }}
        >
          {Array.from({ length: 4 }).flatMap((_, i) => [
            "AI-NATIVE PLATFORM",
            "CINEMATIC CAMERA CONTROLS",
            "URL TO VIDEO ADS",
            "NODE-BASED WORKFLOWS",
            "1M+ FRAMES RENDERED DAILY"
          ].map((text, j) => (
            <span key={`${i}-${j}`}>{text} • </span>
          )))}
        </motion.div>
      </div>

      {/* Bottom Center Indicator */}
      <motion.a
        href="#cinema"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        style={{ position: 'absolute', bottom: '2%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2, cursor: 'pointer', textDecoration: 'none' }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888', fontWeight: 700 }}>Scroll to Explore</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown size={24} color="var(--accent-yellow)" />
        </motion.div>
      </motion.a>
    </div>
  );
}
