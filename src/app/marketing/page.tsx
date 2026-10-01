"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Zap, Smartphone, Monitor, CheckCircle2, Loader2 } from 'lucide-react';

export default function MarketingStudioPage() {
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [ads, setAds] = useState<{id: number, title: string, time: string, img?: string, videoUrl?: string}[]>([
    { id: 1, title: 'Sneaker Promo Ad', time: '2h ago', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Watch Collection', time: '5h ago', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' }
  ]);

  const steps = [
    "Scraping product page...",
    "Extracting high-res assets...",
    "Writing sales copy...",
    "Rendering final video..."
  ];

  const handleGenerate = () => {
    if (!url) return;
    setIsGenerating(true);
    setStep(0);
    
    // Simulate multi-step generation
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setAds([{
            id: Date.now(),
            title: 'New Auto-Generated Ad',
            time: 'Just now',
            videoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4'
          }, ...ads]);
          setUrl('');
        }, 1000);
      } else {
        setStep(currentStep);
      }
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
      {/* Header */}
      <div style={{ height: '60px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: '#111' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '1px' }}>MARKETING <span style={{color:'var(--accent-pink)'}}>STUDIO</span></h1>
      </div>

      <div style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* Big Input Wizard */}
        <div style={{ background: 'radial-gradient(circle at top right, rgba(255,42,122,0.15), #1c1c1c)', borderRadius: '16px', border: '1px solid #333', padding: '64px 48px', textAlign: 'center', marginBottom: '64px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
          
          <AnimatePresence mode="wait">
            {!isGenerating ? (
              <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px', color: '#fff' }}>Convert any URL to a Video Ad.</h2>
                <p style={{ fontSize: '16px', color: '#aaa', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.6' }}>Our AI reads the product page, extracts images, generates a script, and renders a high-converting video automatically.</p>
                
                <div style={{ display: 'flex', gap: '12px', background: '#000', padding: '12px', borderRadius: '16px', border: '1px solid #333', maxWidth: '700px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', background: '#111', borderRadius: '8px', flex: 1, gap: '12px' }}>
                    <LinkIcon size={20} color="#666" />
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://your-product-store.com/item..." 
                      style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '16px', fontFamily: 'inherit' }} 
                    />
                  </div>
                  <button onClick={handleGenerate} className="sc-btn" style={{ background: 'var(--accent-pink)', color: '#fff', border: 'none', borderRadius: '10px', padding: '0 32px', fontWeight: 800, fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <Zap size={16} fill="#fff" /> Generate
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
                <Loader2 size={48} color="var(--accent-pink)" style={{ animation: 'spin 2s linear infinite', marginBottom: '24px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>{steps[step]}</h2>
                <div style={{ width: '400px', height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    style={{ height: '100%', background: 'var(--accent-pink)' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: '#fff', borderBottom: '1px solid #222', paddingBottom: '16px' }}>Recent Generations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <AnimatePresence>
            {ads.map((ad, index) => (
              <motion.div 
                key={ad.id} 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }} 
                whileHover={{ y: -5, scale: 1.02 }} 
                onClick={() => ad.videoUrl && setSelectedVideo(ad.videoUrl)}
                style={{ background: '#1c1c1c', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', cursor: ad.videoUrl ? 'pointer' : 'default' }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  {ad.videoUrl ? (
                    <video src={ad.videoUrl} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={ad.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  {index === 0 && <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent-pink)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12}/> NEW</div>}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{ad.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '12px', fontWeight: 600 }}>
                    <span>Generated {ad.time}</span>
                    <span style={{ display: 'flex', gap: '8px' }}><Smartphone size={14}/><Monitor size={14}/></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }} onClick={() => setSelectedVideo(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              style={{ width: '80%', maxWidth: '1000px', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--accent-pink)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
              onClick={e => e.stopPropagation()}
            >
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
