"use client";
import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';

export default function CanvasWorkspace() {
  return (
    <>
      <div id="canvas" className="section-header" style={{ marginTop: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '1px var(--text-muted)' }}>
          CANVAS <span style={{ color: 'var(--accent-yellow)', WebkitTextStroke: '0px' }}>WORKSPACE</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', fontWeight: 500, marginTop: '8px' }}>Visually chain AI models together in a node-based editor</p>
      </div>

      <div className="tools-grid grid-responsive-2">
        <div className="tool-card" style={{ height: 'auto', padding: '32px' }}>
          <Workflow size={32} color="var(--accent-yellow)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Infinite Possibilities</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
            Build complex generation pipelines. Connect text prompts to image models, and pipe the output directly into Seedance 2.5 video generation.
          </p>
          <button onClick={() => window.location.href = '/canvas'} style={{ background: 'var(--accent-yellow)', color: '#000', padding: '10px 24px', borderRadius: '8px', fontWeight: 800, border: 'none', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}>
            Open Canvas
          </button>
        </div>

        <div className="grid-card" style={{ background: '#0a0a0a', backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px', minHeight: '300px', position: 'relative', overflow: 'hidden' }}>
          <motion.div 
            style={{ position: 'absolute', top: '10%', left: '10%', background: '#1c1c1c', border: '1px solid #333', padding: '16px', borderRadius: '8px', width: '200px' }}
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>Input Node</div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Master Prompt</div>
          </motion.div>

          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path d="M 230 70 C 300 70, 300 150, 380 150" stroke="var(--accent-yellow)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
          </svg>

          <motion.div 
            style={{ position: 'absolute', top: '40%', left: '45%', background: 'rgba(204, 255, 0, 0.1)', border: '1px solid var(--accent-yellow)', padding: '16px', borderRadius: '8px', width: '220px' }}
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <div style={{ fontSize: '10px', color: 'var(--accent-yellow)', textTransform: 'uppercase', marginBottom: '8px' }}>Generator Node</div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Seedance Video Gen</div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
