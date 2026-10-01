"use client";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ marginTop: '120px', borderTop: '1px solid var(--border)', padding: '80px 24px 40px', background: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Animated Square Grid Background (Pink Variant) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, perspective: '1000px', opacity: 0.8 }}>
        <motion.div 
          animate={{ rotateX: [30, 40, 30], scale: [1.2, 1.3, 1.2] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          style={{
            width: '150%', height: '150%',
            backgroundImage: 'linear-gradient(rgba(255, 42, 122, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 42, 122, 0.2) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            backgroundPosition: 'center center',
            transformOrigin: 'center center'
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top, transparent 0%, var(--background) 80%)' }} />
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          
          <div style={{ paddingRight: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 900, letterSpacing: '1px', marginBottom: '24px' }}>
              <div style={{width: '32px', height: '32px', background: 'var(--accent-yellow)', borderRadius: '8px', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900}}>N</div>
              <span style={{ fontSize: '20px', color: '#fff' }}>NATIVE <span style={{ color: '#aaa', fontWeight: 400 }}>SUITE</span></span>
            </div>
            <p style={{ color: '#ddd', fontSize: '15px', lineHeight: '1.6' }}>The premier AI-native creative platform. Building the future of visual storytelling through autonomous model generation.</p>
          </div>
          
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '20px', fontSize: '16px' }}>Products</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Cinema Studio', 'Marketing Studio', 'Canvas Workspace', 'API Access'].map((item) => (
                <motion.a key={item} href="#" style={{ color: '#bbb', fontSize: '15px', fontWeight: 500 }} whileHover={{ color: 'var(--accent-yellow)', x: 5 }}>{item}</motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '20px', fontSize: '16px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                <motion.a key={item} href="#" style={{ color: '#bbb', fontSize: '15px', fontWeight: 500 }} whileHover={{ color: 'var(--accent-pink)', x: 5 }}>{item}</motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '20px', fontSize: '16px' }}>Stay Updated</h4>
            <p style={{ color: '#bbb', fontSize: '14px', marginBottom: '16px' }}>Get early access to new AI models and tools.</p>
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <input type="email" placeholder="Enter your email" style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', paddingLeft: '8px', fontSize: '14px' }} />
              <button style={{ background: 'var(--accent-pink)', color: '#fff', border: 'none', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
        
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
           <div style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, margin: 0, lineHeight: 0.8, cursor: 'default', display: 'flex', justifyContent: 'center' }}>
             {"CREATE BEYOND".split('').map((char, i) => (
               <motion.span
                 key={i}
                 whileHover={{ color: 'var(--accent-yellow)', WebkitTextStroke: '0px', textShadow: '0 0 40px rgba(204,255,0,0.8)' } as any}
                 style={{
                   display: 'inline-block',
                   whiteSpace: 'pre',
                   color: char === ' ' ? 'transparent' : (i > 6 ? 'rgba(255,255,255,0.05)' : 'transparent'),
                   WebkitTextStroke: char === ' ' || i > 6 ? '0px' : '2px rgba(255,255,255,0.15)',
                 }}
               >
                 {char}
               </motion.span>
             ))}
           </div>
        </div>
      </div>
    </footer>
  );
}
