"use client";
import Link from 'next/link';
import { Search, Settings, LayoutGrid, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const linkVariants = {
    hover: { scale: 1.05, color: '#ffffff', textShadow: '0px 0px 8px rgba(255,255,255,0.8)' }
  };

  return (
    <nav className="navbar">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 900, letterSpacing: '1px' }}>
        <motion.div 
          whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}
          style={{width: '28px', height: '28px', background: 'var(--accent-yellow)', borderRadius: '6px', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 900}}
        >
          N
        </motion.div>
        <span style={{ fontSize: '16px' }}>NATIVE <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>SUITE</span></span>
      </Link>
      
      <div className="nav-links">
        <Link href="/canvas" style={{textDecoration: 'none'}}>
          <motion.span className="nav-link" whileHover="hover" variants={linkVariants} style={{display:'block'}}>Canvas Workspace</motion.span>
        </Link>
        <Link href="/marketing" style={{textDecoration: 'none'}}>
          <motion.span className="nav-link" whileHover="hover" variants={linkVariants} style={{display:'block'}}>Marketing Studio</motion.span>
        </Link>
        <Link href="/campaign" style={{textDecoration: 'none'}}>
          <motion.span className="nav-link" whileHover="hover" variants={linkVariants} style={{display:'block'}}>Campaign Studio</motion.span>
        </Link>
        <Link href="/cinema" style={{textDecoration: 'none'}}>
          <motion.span className="nav-link" whileHover="hover" variants={linkVariants} style={{display:'block'}}>Cinema Studio</motion.span>
        </Link>
        <Link href="/#gallery" style={{textDecoration: 'none'}}>
          <motion.span className="nav-link" whileHover="hover" variants={linkVariants} style={{display:'block'}}>Gallery</motion.span>
        </Link>
      </div>

      <div className="nav-right">
        <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }} className="nav-btn" style={{padding: '8px', borderRadius: '50%'}}><User size={14} /></motion.button>
      </div>
    </nav>
  );
}
