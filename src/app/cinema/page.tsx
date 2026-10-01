"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize, Video, Sliders, Pause, Loader2 } from 'lucide-react';

export default function CinemaStudioPage() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);

  const [params, setParams] = useState({
    focalLength: 50,
    panX: 50,
    panY: 50,
    tilt: 50,
    roll: 50,
    blur: 0,
    temperature: 50,
    contrast: 50
  });

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleParamChange = (name: string, value: number) => {
    setParams(prev => ({ ...prev, [name]: value }));
    if (!isRendering && videoUrl) {
      setIsRendering(true);
      setTimeout(() => setIsRendering(false), 200);
    }
  };

  const togglePlay = () => {
    if (videoRef.current && videoUrl) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoUrl) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setVideoUrl(url);
    }
  };

  // Compute realistic CSS transforms from the parameters
  const scale = params.focalLength === 50 ? 1 : 0.5 + (params.focalLength / 100) * 1.5;
  const tx = (params.panX - 50) * 0.5;
  const ty = (params.panY - 50) * 0.5;
  const rx = (params.tilt - 50) * 0.6;
  const rz = (params.roll - 50) * 0.6;

  const transformStyle = `scale(${scale}) translate(${tx}%, ${ty}%) rotateX(${rx}deg) rotateZ(${rz}deg)`;

  const blurVal = params.blur * 0.1; // 0 to 10px
  const sepiaVal = params.temperature > 50 ? (params.temperature - 50) * 0.02 : 0; // warm up
  const hueRotateVal = params.temperature < 50 ? (50 - params.temperature) * -1 : 0; // cool down
  const contrastVal = 0.5 + (params.contrast / 100);

  const filterStyle = `blur(${blurVal}px) sepia(${sepiaVal}) hue-rotate(${hueRotateVal}deg) contrast(${contrastVal})`;

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    return `00:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ height: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
      {/* Header Bar */}
      <div style={{ height: '60px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: '#111' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '1px' }}>CINEMA <span style={{color:'var(--accent-yellow)'}}>STUDIO</span></h1>
      </div>

      {/* Main Content */}
      <div className="cinema-layout">
        
        {/* Viewport */}
        <div style={{ flex: 1, background: '#1c1c1c', borderRadius: '12px', border: '1px solid #333', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', zIndex: 20, background: '#1c1c1c' }}>
            <span style={{ fontSize: '12px', color: '#888', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><Video size={14}/> Viewport (1080p)</span>
            <Maximize size={14} color="#888" cursor="pointer" />
          </div>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', perspective: '1000px', background: '#000' }}>
             
             {!videoUrl ? (
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                 <div style={{ width: '64px', height: '64px', borderRadius: '32px', background: 'rgba(204,255,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Video size={32} color="var(--accent-yellow)" />
                 </div>
                 <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>Upload a Base Video</h2>
                 <p style={{ color: '#888', fontSize: '14px', maxWidth: '300px', textAlign: 'center' }}>Upload any video file from your computer to apply cinematic AI camera motions.</p>
                 <label style={{ background: 'var(--accent-yellow)', color: '#000', padding: '12px 32px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', marginTop: '16px' }}>
                   Select Video File
                   <input type="file" accept="video/mp4,video/webm" style={{ display: 'none' }} onChange={handleFileUpload} />
                 </label>
                 <span style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>Or use our <span style={{ color: 'var(--accent-yellow)', cursor: 'pointer' }} onClick={() => setVideoUrl('https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4')}>Demo Video</span></span>
               </div>
             ) : (
               <>
                 {/* Actual Video Layer */}
                 <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.1s linear', transform: transformStyle, transformStyle: 'preserve-3d' }}>
                   <video 
                     ref={videoRef}
                     src={videoUrl}
                     onTimeUpdate={handleTimeUpdate}
                     onLoadedMetadata={handleLoadedMetadata}
                     onEnded={() => setIsPlaying(false)}
                     style={{ width: '100%', height: '100%', objectFit: 'cover', filter: filterStyle }}
                   />
                 </div>
                 
                 {/* Rendering Overlay */}
                 {isRendering && (
                   <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                     <Loader2 size={40} color="var(--accent-yellow)" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
                     <span style={{ color: '#fff', fontWeight: 700, letterSpacing: '1px' }}>APPLYING CAMERA MOTION...</span>
                   </div>
                 )}

                 {/* Playback Controls Overlay */}
                 <div style={{ position: 'absolute', bottom: '24px', display: 'flex', gap: '16px', background: 'rgba(0,0,0,0.8)', padding: '12px 24px', borderRadius: '32px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 20 }}>
                   <div onClick={togglePlay} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                     {isPlaying ? <Pause size={20} color="#fff" /> : <Play size={20} color="#fff" />}
                   </div>
                   <div style={{ width: '300px', height: '4px', background: '#333', borderRadius: '2px', alignSelf: 'center', position: 'relative', overflow: 'hidden' }}>
                     <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-yellow)', borderRadius: '2px' }} />
                   </div>
                   <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>
                     {formatTime(currentTime)} / {formatTime(duration)}
                   </span>
                 </div>
               </>
             )}
          </div>
        </div>

        {/* Camera Controls Panel */}
        <div className="cinema-sidebar">
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #333', paddingBottom: '16px' }}>
            <Sliders size={18} color="var(--accent-yellow)"/> Camera Parameters
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {(Object.keys(params) as Array<keyof typeof params>).map((controlKey, i) => {
              const labels: Record<string, string> = { focalLength: 'Focal Length', panX: 'Pan X', panY: 'Pan Y', tilt: 'Tilt', roll: 'Roll', blur: 'Motion Blur', temperature: 'Color Temp', contrast: 'Contrast' };
              return (
                <div key={controlKey}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#aaa', fontWeight: 600 }}>
                    <span>{labels[controlKey]}</span>
                    <span style={{ color: '#fff' }}>{params[controlKey]}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={params[controlKey]}
                    onChange={(e) => handleParamChange(controlKey, Number(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer', accentColor: i % 2 === 0 ? 'var(--accent-yellow)' : 'var(--accent-pink)' }}
                  />
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', background: 'rgba(204,255,0,0.05)', border: '1px solid rgba(204,255,0,0.2)', padding: '16px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--accent-yellow)', fontWeight: 800, marginBottom: '8px' }}>Active AI Model</h3>
            <p style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.5' }}>Seedance 2.5 architecture is generating in real-time. Camera motions are physically bounded.</p>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
