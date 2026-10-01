"use client";
import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';

export default function MarketingStudio() {
  return (
    <div id="marketing" className="supercomputer-banner" style={{ background: 'radial-gradient(ellipse at center, rgba(255, 42, 122, 0.2) 0%, var(--card-bg) 70%)', borderColor: 'var(--accent-pink)', boxShadow: '0 0 40px rgba(255, 42, 122, 0.1)' }}>
      <motion.div 
        className="floating-card" 
        style={{ top: '20%', left: '15%' }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p style={{ fontSize: '12px', fontWeight: 600 }}>1. Extracting Images...</p>
      </motion.div>
      
      <motion.div 
        className="floating-card" 
        style={{ bottom: '20%', right: '15%' }}
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
         <p style={{ fontSize: '12px', fontWeight: 600 }}>2. Generating Script...</p>
      </motion.div>

      <div className="sc-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="sc-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '2px var(--accent-pink)' }}>
          MARKETING <span style={{ color: '#fff', WebkitTextStroke: '0px' }}>STUDIO</span>
        </h2>
        <p className="sc-subtitle" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-muted)' }}>Paste a link. Get a video ad.</p>
        
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', background: '#111', borderRadius: '8px', flex: 1, gap: '8px' }}>
            <LinkIcon size={16} color="#666" />
            <input type="text" placeholder="https://your-product.com/..." style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '14px', fontFamily: 'inherit' }} />
          </div>
          <button onClick={() => window.location.href = '/marketing'} className="sc-btn" style={{ background: 'var(--accent-pink)', color: '#fff', fontFamily: 'inherit' }}>Generate Ad</button>
        </div>
      </div>
    </div>
  );
}
