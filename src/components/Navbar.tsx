"use client";
import Link from 'next/link';
import { User, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
    router.push('/');
  };

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

      <div className="nav-right" style={{ position: 'relative' }}>
        <motion.button 
          onClick={() => setShowDropdown(!showDropdown)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }} 
          className="nav-btn" 
          style={{
            padding: '8px', 
            borderRadius: '50%', 
            background: session ? 'var(--accent-yellow)' : 'transparent',
            color: session ? '#000' : 'inherit'
          }}
        >
          <User size={14} />
        </motion.button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{ 
                position: 'absolute', 
                top: '40px', 
                right: 0, 
                background: '#1c1c1c', 
                border: '1px solid #333', 
                borderRadius: '12px', 
                padding: '8px', 
                minWidth: '180px', 
                zIndex: 50, 
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
              }}
            >
              {session ? (
                <>
                  <div style={{ padding: '8px 12px', fontSize: '12px', color: '#aaa', borderBottom: '1px solid #333', marginBottom: '4px', wordBreak: 'break-all' }}>
                    {session.user.email}
                  </div>
                  <button 
                    onClick={handleSignOut} 
                    onMouseEnter={(e) => e.currentTarget.style.background = '#2a2a2a'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', color: '#ff4444', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderRadius: '6px', fontSize: '13px', fontWeight: 600, transition: 'background 0.2s' }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setShowDropdown(false); router.push('/auth'); }} 
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2a2a2a'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderRadius: '6px', fontSize: '13px', fontWeight: 600, transition: 'background 0.2s' }}
                >
                  <LogIn size={14} /> Sign In
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
