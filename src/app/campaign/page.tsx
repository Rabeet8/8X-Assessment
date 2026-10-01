"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, CheckCircle2, LayoutTemplate, Zap, Pause, Video } from 'lucide-react';

const PRODUCTS = [
  { 
    id: 'halcyon', name: 'Halcyon', type: 'Sparkling Tonic', 
    images: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1527661591450-062e2474f83b?auto=format&fit=crop&w=800'
    ]
  },
  { 
    id: 'serein', name: 'Serein', type: 'Daily Serum', 
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1571781526291-c477ebfd024b?auto=format&fit=crop&w=800'
    ]
  },
  { 
    id: 'arcone', name: 'Arc One', type: 'Studio Headphones', 
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800'
    ]
  }
];

const GOALS = [
  "Drive first purchase",
  "Build product awareness",
  "Launch a new collection"
];

export default function CampaignGeneratorPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // State
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [audience, setAudience] = useState('');
  const [goal, setGoal] = useState(GOALS[0]);
  
  const [concepts, setConcepts] = useState<any[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<any>(null);
  
  const [shots, setShots] = useState<any[]>([]);
  const [hooks, setHooks] = useState<string[]>([]);
  const [activeHook, setActiveHook] = useState(0);

  // Preview State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);

  // Auto-play logic for Preview
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && shots.length > 0) {
      const currentDuration = shots[currentShotIndex].duration * 1000;
      timer = setTimeout(() => {
        if (currentShotIndex < shots.length - 1) {
          setCurrentShotIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentShotIndex(0);
        }
      }, currentDuration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentShotIndex, shots]);

  const generateConcepts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: selectedProduct, audience, goal })
      });
      const data = await res.json();
      setConcepts(data.concepts);
      setStep(3); // Go to Concepts
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const buildStoryboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: selectedProduct, conceptId: selectedConcept.id })
      });
      const data = await res.json();
      setShots(data.shots);
      setHooks(data.hooks);
      setStep(4); // Go to Storyboard
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const downloadJson = () => {
    const data = {
      schemaVersion: '1.0',
      exportTimestamp: new Date().toISOString(),
      product: selectedProduct,
      audience,
      campaignGoal: goal,
      concept: selectedConcept,
      storyboard: shots,
      hooks: hooks,
      activeHook: hooks[activeHook],
      outputFormat: '9:16'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProduct.id}-campaign.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalDuration = shots.reduce((acc, shot) => acc + shot.duration, 0);

  const getCameraAnimation = (camera: string, duration: number) => {
    if (!camera) return 'none';
    const c = camera.toLowerCase();
    let name = 'camSlowZoom';
    if (c.includes('zoom out')) name = 'camZoomOut';
    else if (c.includes('zoom')) name = 'camZoomIn';
    else if (c.includes('pan left')) name = 'camPanLeft';
    else if (c.includes('pan right')) name = 'camPanRight';
    else if (c.includes('tilt up')) name = 'camTiltUp';
    else if (c.includes('tilt down')) name = 'camTiltDown';
    
    return `${name} ${duration}s linear forwards`;
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', background: '#0a0a0a', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      
      {/* Marquee */}
      <div className="marquee-container" style={{ background: 'var(--accent-pink)', color: '#000', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 800, textTransform: 'uppercase', fontSize: '12px' }}>
        <div className="marquee-content">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ paddingRight: '50px' }}>
              Product → Campaign brief → Three creative concepts → Concept selection → Five-shot editable storyboard → Three editable hooks → Interactive vertical preview → Campaign JSON download
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', padding: '32px', justifyContent: 'center', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          
          <AnimatePresence mode="wait">
            
            {/* STEPS 1 & 2: Setup (Product & Brief) */}
            {(step === 1 || step === 2) && (
              <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>Cutroom Setup</h2>
                <p style={{ color: '#888', marginBottom: '32px' }}>Turn a demo product into a structured short-form advertising campaign.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  {/* Products */}
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#ccc' }}>1. Choose Demo Product</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {PRODUCTS.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => setSelectedProduct(p)}
                          style={{ 
                            display: 'flex', gap: '16px', background: '#1c1c1c', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                            border: selectedProduct.id === p.id ? '2px solid var(--accent-pink)' : '1px solid #333'
                          }}
                        >
                          <img src={p.images[0]} alt={p.name} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '18px' }}>{p.name}</div>
                            <div style={{ color: '#888', fontSize: '14px' }}>{p.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brief */}
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#ccc' }}>2. Campaign Brief</h3>
                    <div style={{ background: '#1c1c1c', padding: '24px', borderRadius: '12px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>Target Audience</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Design-conscious professionals, 24–38." 
                          value={audience}
                          onChange={e => setAudience(e.target.value)}
                          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>Campaign Goal</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {GOALS.map(g => (
                            <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                              <input type="radio" checked={goal === g} onChange={() => setGoal(g)} style={{ accentColor: 'var(--accent-pink)' }} />
                              {g}
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        onClick={generateConcepts}
                        disabled={!audience || loading}
                        style={{ background: 'var(--accent-pink)', color: '#fff', padding: '14px', borderRadius: '8px', fontWeight: 800, border: 'none', cursor: 'pointer', marginTop: '16px', opacity: (!audience || loading) ? 0.5 : 1, display: 'flex', justifyContent: 'center' }}
                      >
                        {loading ? 'Generating...' : 'Generate 3 Concepts'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONCEPTS */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Creative Concepts</h2>
                <p style={{ color: '#888', marginBottom: '32px' }}>Choose a deterministic creative direction for {selectedProduct.name}.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {concepts.map((concept) => (
                    <motion.div 
                      key={concept.id}
                      onClick={() => setSelectedConcept(concept)}
                      style={{ 
                        background: '#1c1c1c', padding: '24px', borderRadius: '12px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                        border: selectedConcept?.id === concept.id ? '2px solid var(--accent-pink)' : '1px solid #333'
                      }}
                    >
                      <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: concept.color }} />
                      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{concept.title}</h3>
                      <div style={{ fontSize: '12px', color: concept.color, fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase' }}>{concept.tone}</div>
                      <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.5', marginBottom: '16px' }}>{concept.summary}</p>
                      <div style={{ background: '#0a0a0a', padding: '12px', borderRadius: '8px', border: '1px solid #222', fontSize: '13px', fontStyle: 'italic' }}>
                        "{concept.hook}"
                      </div>
                      <div style={{ marginTop: '16px', fontSize: '12px', color: '#555', textAlign: 'right' }}>Fit Score: {concept.score}/100</div>
                    </motion.div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                  <button 
                    onClick={buildStoryboard}
                    disabled={!selectedConcept || loading}
                    style={{ background: '#fff', color: '#000', padding: '14px 32px', borderRadius: '8px', fontWeight: 800, border: 'none', cursor: 'pointer', opacity: (!selectedConcept || loading) ? 0.5 : 1 }}
                  >
                    {loading ? 'Building Storyboard...' : 'Build Storyboard'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 & 5: STORYBOARD, HOOKS & PREVIEW */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', gap: '32px' }}>
                
                {/* Left: Preview Player */}
                <div style={{ width: '340px', flexShrink: 0 }}>
                  <div style={{ width: '100%', height: '600px', background: '#000', borderRadius: '24px', border: '8px solid #222', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      key={currentShotIndex + (isPlaying ? '-play' : '-pause')}
                      src={selectedProduct?.images ? selectedProduct.images[currentShotIndex % selectedProduct.images.length] : (selectedProduct as any).img || ''} 
                      style={{ 
                        width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6,
                        animation: isPlaying ? getCameraAnimation(shots[currentShotIndex].camera, shots[currentShotIndex].duration) : 'none'
                      }} 
                    />
                    
                    {/* Dark Overlay for text readability */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%, rgba(0,0,0,0.5))' }} />

                    {/* Content Overlay */}
                    <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', textAlign: 'center' }}>
                      <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {hooks[activeHook]}
                      </h3>
                    </div>

                    <div style={{ position: 'absolute', bottom: '32px', left: '16px', right: '16px' }}>
                      <div style={{ color: 'var(--accent-pink)', fontSize: '12px', fontWeight: 800, marginBottom: '4px', textTransform: 'uppercase' }}>
                        {selectedProduct.name} — {goal}
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                        Shot {currentShotIndex + 1}: {shots[currentShotIndex].title}
                      </div>
                      
                      {/* Timeline */}
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', alignItems: 'center' }}>
                        <div onClick={() => setIsPlaying(!isPlaying)} style={{ cursor: 'pointer', marginRight: '8px' }}>
                          {isPlaying ? <Pause fill="#fff" size={16} /> : <Play fill="#fff" size={16} />}
                        </div>
                        {shots.map((shot, i) => (
                          <div key={i} onClick={() => setCurrentShotIndex(i)} style={{ flex: shot.duration, height: '4px', background: i === currentShotIndex ? 'var(--accent-pink)' : '#333', borderRadius: '2px', cursor: 'pointer' }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={downloadJson}
                    style={{ width: '100%', background: '#fff', color: '#000', padding: '16px', borderRadius: '12px', fontWeight: 800, border: 'none', cursor: 'pointer', marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}
                  >
                    <Download size={18} /> Download Campaign JSON
                  </button>
                </div>

                {/* Right: Editable Editor */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', height: '680px', overflowY: 'auto', paddingRight: '16px' }}>
                  
                  {/* Hooks Lab */}
                  <div style={{ background: '#1c1c1c', padding: '24px', borderRadius: '12px', border: '1px solid #333' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#ccc', display: 'flex', justifyContent: 'space-between' }}>
                      <span>The Hook Lab</span>
                      <span style={{ fontSize: '12px', color: 'var(--accent-pink)' }}>Active Variant: {activeHook + 1}</span>
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {hooks.map((hook, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <input type="radio" checked={activeHook === i} onChange={() => setActiveHook(i)} style={{ accentColor: 'var(--accent-pink)', cursor: 'pointer' }} />
                          <input 
                            value={hook}
                            onChange={(e) => {
                              const newHooks = [...hooks];
                              newHooks[i] = e.target.value;
                              setHooks(newHooks);
                            }}
                            style={{ flex: 1, background: activeHook === i ? '#2a2a2a' : '#0a0a0a', border: '1px solid #333', padding: '10px 12px', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Storyboard Editor */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ccc', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Editable Storyboard</span>
                      <span style={{ fontSize: '12px', color: '#888' }}>Total: {totalDuration}s</span>
                    </h3>
                    
                    {shots.map((shot, i) => (
                      <div key={i} style={{ background: '#1c1c1c', borderRadius: '12px', border: currentShotIndex === i ? '2px solid var(--accent-pink)' : '1px solid #333', padding: '16px', display: 'flex', gap: '16px' }}>
                        <div 
                          onClick={() => setCurrentShotIndex(i)}
                          style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#0a0a0a', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: currentShotIndex === i ? 'var(--accent-pink)' : '#666' }}
                        >
                          <Video size={20} />
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <input 
                            value={shot.title}
                            onChange={(e) => {
                              const newShots = [...shots];
                              newShots[i].title = e.target.value;
                              setShots(newShots);
                            }}
                            placeholder="Shot Title"
                            style={{ background: '#0a0a0a', border: '1px solid #333', padding: '8px', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                          />
                          <input 
                            type="number"
                            min={1} max={4}
                            value={shot.duration}
                            onChange={(e) => {
                              const newShots = [...shots];
                              newShots[i].duration = parseInt(e.target.value) || 1;
                              setShots(newShots);
                            }}
                            style={{ background: '#0a0a0a', border: '1px solid #333', padding: '8px', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                          />
                          <input 
                            value={shot.action}
                            onChange={(e) => {
                              const newShots = [...shots];
                              newShots[i].action = e.target.value;
                              setShots(newShots);
                            }}
                            placeholder="Action/Visual Direction"
                            style={{ gridColumn: 'span 2', background: '#0a0a0a', border: '1px solid #333', padding: '8px', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                          />
                          <input 
                            value={shot.camera}
                            onChange={(e) => {
                              const newShots = [...shots];
                              newShots[i].camera = e.target.value;
                              setShots(newShots);
                            }}
                            placeholder="Camera Direction"
                            style={{ gridColumn: 'span 2', background: '#0a0a0a', border: '1px solid #333', padding: '8px', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none;
            white-space: normal;
            text-align: center;
          }
        }
        
        @keyframes camSlowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.05); } }
        @keyframes camZoomIn { 0% { transform: scale(1); } 100% { transform: scale(1.3); } }
        @keyframes camZoomOut { 0% { transform: scale(1.3); } 100% { transform: scale(1); } }
        @keyframes camPanLeft { 0% { transform: scale(1.2) translateX(0); } 100% { transform: scale(1.2) translateX(-5%); } }
        @keyframes camPanRight { 0% { transform: scale(1.2) translateX(-5%); } 100% { transform: scale(1.2) translateX(0); } }
        @keyframes camTiltUp { 0% { transform: scale(1.2) translateY(0); } 100% { transform: scale(1.2) translateY(-5%); } }
        @keyframes camTiltDown { 0% { transform: scale(1.2) translateY(-5%); } 100% { transform: scale(1.2) translateY(0); } }
      `}} />
    </div>
  );
}
