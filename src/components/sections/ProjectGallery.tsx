"use client";
import { motion } from 'framer-motion';

export default function ProjectGallery() {
  const images = [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500",
    "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=500",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=500",
    "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=500",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500",
    "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=500"
  ];

  return (
    <>
      <div id="gallery" className="section-header" style={{ marginTop: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '1px var(--text-muted)' }}>
          PROJECT <span style={{ color: 'var(--foreground)', WebkitTextStroke: '0px' }}>GALLERY</span>
        </h2>
        <p style={{ color: 'var(--accent-yellow)', fontWeight: 600, marginTop: '8px' }}>Masterpieces generated using Cinema & Marketing Studio</p>
      </div>
      
      <div className="masonry-grid">
        {images.map((src, i) => (
          <motion.div 
            key={i} 
            className="masonry-item"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
          >
            <img src={src} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
