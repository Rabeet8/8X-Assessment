"use client";
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function FeaturesGrid() {
  const router = useRouter();

  const handleCardClick = async (route: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth');
    } else {
      router.push(route);
    }
  };

  return (
    <>
    <div className="hero-grid" id="cinema">
      <motion.div 
        className="grid-card card-large"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=1200" alt="Cinematic" className="card-image-bg" />
        <div className="card-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
          <h1 className="card-title" style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '1px var(--foreground)' }}>
            CINEMA <span style={{ color: 'var(--accent-yellow)', WebkitTextStroke: '0px' }}>STUDIO</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
            Advanced Virtual Camera Controls. Pan, tilt, and zoom with precision.
          </p>
          <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>Focal Length</div>
              <div style={{ height: '4px', background: '#333', borderRadius: '2px', position: 'relative' }}>
                 <motion.div animate={{ width: ['40%', '80%', '40%'] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: 'absolute', left: 0, height: '100%', background: 'var(--accent-yellow)', borderRadius: '2px' }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>Camera Pan (X)</div>
              <div style={{ height: '4px', background: '#333', borderRadius: '2px', position: 'relative' }}>
                 <motion.div animate={{ left: ['30%', '50%', '10%'] }} transition={{ duration: 5, repeat: Infinity }} style={{ position: 'absolute', width: '20%', height: '100%', background: 'var(--accent-pink)', borderRadius: '2px' }} />
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); handleCardClick('/cinema'); }} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '4px', padding: '0 16px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>Render</button>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="grid-card" 
        onClick={() => handleCardClick('/marketing')} 
        style={{ cursor: 'pointer', background: 'radial-gradient(circle at top right, rgba(255,42,122,0.1), var(--card-bg))' }}
        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.4 }}
        whileHover={{ scale: 1.03, y: -5 }}
      >
        <div style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="var(--accent-pink)" /> Instant Ads
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Convert any product URL into a high-converting video ad instantly.</p>
        </div>
        <div className="card-overlay" style={{ background: 'transparent' }}>
          <p style={{ fontSize: '16px', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px var(--accent-pink)' }}>MARKETING STUDIO</p>
        </div>
      </motion.div>

      <motion.div 
        className="grid-card" 
        onClick={() => handleCardClick('/canvas')} 
        style={{ cursor: 'pointer' }}
        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ scale: 1.03, y: -5 }}
      >
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600" className="card-image-bg" />
        <div className="card-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
          <p style={{ fontSize: '16px', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px var(--accent-yellow)' }}>CANVAS WORKSPACE</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Node-based AI pipelines</p>
        </div>
      </motion.div>
    </div>

    {/* Campaign Studio Row */}
    <div className="hero-grid" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '200px' }} id="campaign">
      <motion.div 
        className="grid-card" 
        onClick={() => handleCardClick('/campaign')} 
        style={{ cursor: 'pointer', background: 'radial-gradient(ellipse at center, rgba(204,255,0,0.1), var(--card-bg))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '48px' }}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
      >
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px', color: 'transparent', WebkitTextStroke: '1px var(--accent-yellow)' }}>CAMPAIGN <span style={{color: 'var(--accent-pink)', WebkitTextStroke: '0px'}}>STUDIO</span></h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: '1.6' }}>
            Core workflow: demo product → brief → creative concepts → editable storyboard → hook variants → vertical ad.
          </p>
        </div>
        <button style={{ background: 'var(--foreground)', color: 'var(--background)', padding: '16px 32px', borderRadius: '32px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} fill="var(--background)" /> Start Campaign
        </button>
      </motion.div>
    </div>
    </>
  );
}
