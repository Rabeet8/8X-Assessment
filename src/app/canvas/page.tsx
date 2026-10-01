"use client";
import React, { useCallback, useState } from 'react';
import { ReactFlow, Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges, type Node, type Edge, type Connection, type NodeChange, type EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Settings, Play, Image as ImageIcon, Video, Type, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const nodeStyle = {
  background: '#1c1c1c',
  color: '#fff',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '16px',
  width: 250,
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
};

const initialNodes: Node[] = [
  { id: '1', position: { x: 50, y: 150 }, data: { label: <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}><Type size={16} color="var(--accent-yellow)"/> <span style={{fontWeight: 600}}>Master Prompt</span></div> }, style: nodeStyle },
  { id: '2', position: { x: 400, y: 50 }, data: { label: <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}><ImageIcon size={16} color="var(--accent-pink)"/> <span style={{fontWeight: 600}}>Image Generation</span></div> }, style: nodeStyle },
  { id: '3', position: { x: 400, y: 250 }, data: { label: <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}><Settings size={16} color="#aaa"/> <span style={{fontWeight: 600}}>Camera Motion</span></div> }, style: nodeStyle },
  { id: '4', position: { x: 750, y: 150 }, data: { label: <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}><Video size={16} color="#00ff00"/> <span style={{fontWeight: 600}}>Seedance 2.5 Render</span></div> }, style: { ...nodeStyle, border: '1px solid var(--accent-yellow)', background: 'rgba(204,255,0,0.05)' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: false, style: { stroke: '#555', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: false, style: { stroke: '#555', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: false, style: { stroke: '#555', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: false, style: { stroke: '#555', strokeWidth: 2 } },
];

export default function CanvasPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showOutput, setShowOutput] = useState(false);

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), []);

  const handleRunPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowOutput(false);
    
    // Simulate pipeline execution step by step
    setEdges(eds => eds.map(e => ({ ...e, animated: true, style: { stroke: 'var(--accent-yellow)', strokeWidth: 2 } })));
    
    setTimeout(() => {
      setNodes(nds => nds.map(n => n.id === '1' ? { ...n, style: { ...n.style, border: '2px solid var(--accent-yellow)' } } : n));
    }, 500);

    setTimeout(() => {
      setNodes(nds => nds.map(n => ['2', '3'].includes(n.id) ? { ...n, style: { ...n.style, border: '2px solid var(--accent-pink)' } } : n));
    }, 2000);

    setTimeout(() => {
      setNodes(nds => nds.map(n => n.id === '4' ? { ...n, style: { ...n.style, border: '2px solid #00ff00', background: 'rgba(0,255,0,0.1)' } } : n));
    }, 3500);

    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
      setEdges(eds => eds.map(e => ({ ...e, animated: false, style: { stroke: '#555', strokeWidth: 2 } })));
      setNodes(initialNodes);
    }, 5500);
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  };

  return (
    <div style={{ height: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ height: '60px', flexShrink: 0, borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: '#0a0a0a', zIndex: 10 }}>
        <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-yellow)', letterSpacing: '1px' }}>CANVAS WORKSPACE</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleRunPipeline} style={{ background: isRunning ? '#333' : 'var(--accent-yellow)', color: isRunning ? '#888' : '#000', border: 'none', padding: '8px 24px', borderRadius: '6px', fontWeight: 800, display: 'flex', gap: '8px', alignItems: 'center', cursor: isRunning ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
            {isRunning ? <span className="loader" style={{width: 16, height: 16, border: '2px solid #888', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'}} /> : <Play size={16} />}
            {isRunning ? 'Processing...' : 'Run Pipeline'}
          </button>
        </div>
      </div>

      {/* React Flow Editor */}
      <div style={{ flex: 1, background: '#050505', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          colorMode="dark"
        >
          <Background color="#333" gap={20} size={1} />
          <Controls style={{ background: '#111', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden', fill: '#fff' }} />
        </ReactFlow>

        {/* Generated Output Modal */}
        <AnimatePresence>
          {showOutput && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                style={{ background: '#111', border: '1px solid var(--accent-yellow)', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ color: 'var(--accent-yellow)', fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}><Video size={20} /> Generated Pipeline Output</h3>
                  <X size={20} color="#888" style={{ cursor: 'pointer' }} onClick={() => setShowOutput(false)} />
                </div>
                <div style={{ width: '600px', height: '337px', background: '#000', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  <video 
                    src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" 
                    controls 
                    autoPlay 
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <p style={{ color: '#aaa', fontSize: '14px', marginTop: '16px', textAlign: 'center' }}>Rendered in 5.5s using Seedance 2.5 Architecture</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Node Configuration Sidebar */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} transition={{ type: 'spring', damping: 20 }}
              style={{ position: 'absolute', top: 0, right: 0, width: '350px', height: '100%', background: '#111', borderLeft: '1px solid #333', zIndex: 20, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 800 }}>Node Configuration</h3>
                <X size={20} color="#888" style={{ cursor: 'pointer' }} onClick={() => setSelectedNode(null)} />
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                {selectedNode === '1' && (
                  <>
                    <label style={{ color: '#aaa', fontSize: '12px', fontWeight: 600 }}>Prompt Text</label>
                    <textarea defaultValue="A highly cinematic shot of a neon futuristic city, 4k resolution, hyperrealistic." style={{ background: '#1c1c1c', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', minHeight: '120px', fontFamily: 'inherit', resize: 'none' }} />
                  </>
                )}
                {selectedNode === '2' && (
                  <>
                    <label style={{ color: '#aaa', fontSize: '12px', fontWeight: 600 }}>Image Style</label>
                    <select style={{ background: '#1c1c1c', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontFamily: 'inherit' }}>
                      <option>Photorealistic</option>
                      <option>Cyberpunk</option>
                      <option>Anime</option>
                    </select>
                  </>
                )}
                {selectedNode === '3' && (
                  <>
                    <label style={{ color: '#aaa', fontSize: '12px', fontWeight: 600 }}>Camera Motion</label>
                    <div className="grid-responsive-2" style={{ gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px' }}><input type="checkbox" defaultChecked /> Pan Left</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px' }}><input type="checkbox" /> Pan Right</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px' }}><input type="checkbox" defaultChecked /> Zoom In</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px' }}><input type="checkbox" /> Zoom Out</label>
                    </div>
                    <label style={{ color: '#aaa', fontSize: '12px', fontWeight: 600, marginTop: '8px' }}>Motion Intensity</label>
                    <input type="range" min="0" max="100" defaultValue="50" style={{ width: '100%', accentColor: 'var(--accent-yellow)' }} />
                  </>
                )}
                {selectedNode === '4' && (
                  <>
                    <label style={{ color: '#aaa', fontSize: '12px', fontWeight: 600 }}>Seedance Rendering Settings</label>
                    <select style={{ background: '#1c1c1c', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontFamily: 'inherit' }}>
                      <option>High Quality (1080p, 30fps)</option>
                      <option>Cinematic (4k, 24fps)</option>
                      <option>Fast Draft (720p, 30fps)</option>
                    </select>
                    <label style={{ color: '#aaa', fontSize: '12px', fontWeight: 600, marginTop: '8px' }}>Aspect Ratio</label>
                    <select style={{ background: '#1c1c1c', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontFamily: 'inherit' }}>
                      <option>16:9 (Horizontal)</option>
                      <option>9:16 (Vertical/Shorts)</option>
                      <option>1:1 (Square)</option>
                    </select>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
