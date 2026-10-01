"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Account created! You can now sign in.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Redirect to home or reload to update state
        window.location.href = '/';
      }
    } catch (error: any) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
      
      <Link href="/" style={{ position: 'absolute', top: '80px', left: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: '#888', textDecoration: 'none', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ background: '#1c1c1c', border: '1px solid #333', padding: '48px', borderRadius: '24px', width: '100%', maxWidth: '400px', textAlign: 'center' }}
      >
        <div style={{ width: '48px', height: '48px', background: 'var(--accent-yellow)', borderRadius: '12px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '24px' }}>
          N
        </div>
        
        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', color: '#fff' }}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px' }}>
          {isSignUp ? 'Sign up to access the creative studios.' : 'Sign in to continue.'}
        </p>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#666" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', outline: 'none' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#666" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', outline: 'none' }}
            />
          </div>

          {message && (
            <div style={{ fontSize: '13px', color: message.includes('created') ? 'var(--accent-yellow)' : 'var(--accent-pink)', marginTop: '8px' }}>
              {message}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', padding: '14px', borderRadius: '12px', background: '#fff', color: '#000', 
              fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer', marginTop: '8px'
            }}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        
        <p style={{ marginTop: '24px', fontSize: '14px', color: '#666' }}>
          {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
          <span 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }} 
            style={{ color: 'var(--accent-yellow)', marginLeft: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
