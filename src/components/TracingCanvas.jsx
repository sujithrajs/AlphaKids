import React, { useRef, useEffect, useState, useMemo } from 'react';
import { getDottedPath } from '../utils/letterPaths';
import * as Tone from 'tone';

const TracingCanvas = ({ strokes, onComplete, onTracingChange }) => {
  const canvasRef = useRef(null);
  const synthRef = useRef(null);
  const humSynthRef = useRef(null);
  const twinkleSynthRef = useRef(null);
  const [dots, setDots] = useState([]);
  const [collectedIds, setCollectedIds] = useState(new Set());
  const [sparkles, setSparkles] = useState([]);
  const [isTracing, setIsTracing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const requestRef = useRef();
  const celebrationSynth = useRef(null);
  const celebrationNoise = useRef(null);
  const celebrationEnv = useRef(null);
  const hasPlayedCelebration = useRef(false);

  // Animation loop for sparkles
  useEffect(() => {
    const animate = (time) => {
      setSparkles(prev => prev
        .map(s => ({ ...s, life: s.life - 0.05 }))
        .filter(s => s.life > 0)
      );
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Initialize sounds on interaction
  useEffect(() => {
    // Magical Continuous Hum (FMSynth)
    humSynthRef.current = new Tone.FMSynth({
      harmonicity: 3,
      modulationIndex: 10,
      oscillator: { type: "sine" },
      envelope: { attack: 0.1, decay: 0.1, sustain: 1, release: 0.5 },
      modulation: { type: "square" },
      modulationEnvelope: { attack: 0.1, decay: 0 }
    }).toDestination();
    humSynthRef.current.volume.value = -15;

    // Twinkle Ding (FMSynth)
    twinkleSynthRef.current = new Tone.FMSynth({
      harmonicity: 2,
      modulationIndex: 7,
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.5 }
    }).toDestination();
    twinkleSynthRef.current.volume.value = -5;

    // Victory Chime Synth
    celebrationSynth.current = new Tone.PolySynth(Tone.Synth).toDestination();
    celebrationSynth.current.volume.value = -5;

    // Clapping Noise
    const clapFilter = new Tone.Filter(1500, "bandpass").toDestination();
    celebrationEnv.current = new Tone.AmplitudeEnvelope({
      attack: 0.001,
      decay: 0.1,
      sustain: 0,
      release: 0.1
    }).connect(clapFilter);
    celebrationNoise.current = new Tone.Noise("white").connect(celebrationEnv.current).start();

    return () => {
      humSynthRef.current?.dispose();
      twinkleSynthRef.current?.dispose();
      celebrationSynth.current?.dispose();
      celebrationNoise.current?.dispose();
      celebrationEnv.current?.dispose();
      clapFilter.dispose();
    };
  }, []);

  // Generate dots when strokes change
  useEffect(() => {
    const generatedDots = getDottedPath(strokes, 4);
    setDots(generatedDots);
    setCollectedIds(new Set());
    hasPlayedCelebration.current = false;
  }, [strokes]);

  const handlePointerDown = (e) => {
    setIsTracing(true);
    if (Tone.getContext().state === 'suspended') {
      Tone.start();
    }
    humSynthRef.current?.triggerAttack("C3");
    onTracingChange?.(true);
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsTracing(false);
    humSynthRef.current?.triggerRelease();
    onTracingChange?.(false);
  };

  const handlePointerMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePos({ x, y });

    if (isTracing) {
      const newCollected = new Set(collectedIds);
      let changed = false;

      // Enforce strict order: only the next uncollected dot can be picked
      // Loop to allow picking multiple dots if the mouse moved far enough
      let search = true;
      while (search) {
        const nextDot = dots.find(dot => !newCollected.has(dot.id));
        if (nextDot) {
          const dist = Math.sqrt(Math.pow(nextDot.x - x, 2) + Math.pow(nextDot.y - y, 2));
          if (dist < 8) { // Slightly increased tolerance for better feel
            newCollected.add(nextDot.id);
            changed = true;
            // Play magical twinkle!
            const tones = ["C5", "E5", "G5", "C6"];
            const randomTone = tones[Math.floor(Math.random() * tones.length)];
            twinkleSynthRef.current?.triggerAttackRelease(randomTone, "16n");
            
            // Add sparkle at this location
            setSparkles(prev => [...prev, { x: nextDot.x, y: nextDot.y, life: 1, color: '#fdcb6e' }]);
          } else {
            search = false;
          }
        } else {
          search = false;
        }
      }

      if (changed) {
        setCollectedIds(newCollected);
        if (newCollected.size === dots.length && !hasPlayedCelebration.current) {
          hasPlayedCelebration.current = true;
          playCelebrationSounds();
          onComplete?.();
        }
      }
    }
  };

  const playCelebrationSounds = () => {
    if (!celebrationSynth.current || !celebrationEnv.current) return;
    
    const now = Tone.now();
    
    // Victory Chime (C-major arpeggio)
    celebrationSynth.current.triggerAttackRelease("C4", "8n", now);
    celebrationSynth.current.triggerAttackRelease("E4", "8n", now + 0.1);
    celebrationSynth.current.triggerAttackRelease("G4", "8n", now + 0.2);
    celebrationSynth.current.triggerAttackRelease("C5", "4n", now + 0.3);

    // Clapping Sounds
    for (let i = 0; i < 6; i++) {
      celebrationEnv.current.triggerAttackRelease(0.05, now + i * 0.15);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw smooth letter backdrop
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#f1f2f6';
    ctx.lineWidth = 30;
    strokes.forEach(stroke => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo((stroke[0].x / 100) * width, (stroke[0].y / 100) * height);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo((stroke[i].x / 100) * width, (stroke[i].y / 100) * height);
      }
      ctx.stroke();
    });

    // Draw dotted path (background)
    dots.forEach(dot => {
      const isCollected = collectedIds.has(dot.id);
      ctx.beginPath();
      ctx.arc((dot.x / 100) * width, (dot.y / 100) * height, isCollected ? 5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = isCollected ? '#6c5ce7' : '#dfe6e9';
      ctx.fill();
      
      if (isCollected) {
        // Add a little glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(108, 92, 231, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw user cursor glow
    if (isTracing) {
      ctx.beginPath();
      ctx.arc((mousePos.x / 100) * width, (mousePos.y / 100) * height, 15, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        (mousePos.x / 100) * width, (mousePos.y / 100) * height, 0,
        (mousePos.x / 100) * width, (mousePos.y / 100) * height, 15
      );
      gradient.addColorStop(0, 'rgba(108, 92, 231, 0.6)');
      gradient.addColorStop(1, 'rgba(108, 92, 231, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw guidance arrow
    const firstUncollectedIdx = dots.findIndex(d => !collectedIds.has(d.id));
    if (firstUncollectedIdx !== -1) {
      const nextDot = dots[firstUncollectedIdx];
      const prevDot = firstUncollectedIdx > 0 ? dots[firstUncollectedIdx - 1] : null;
      
      const targetX = (nextDot.x / 100) * width;
      const targetY = (nextDot.y / 100) * height;
      
      // Draw a pulsating circle around the target dot
      const pulse = Math.sin(Date.now() / 200) * 5 + 10;
      ctx.beginPath();
      ctx.arc(targetX, targetY, pulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(253, 203, 110, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw arrow 
      const fromX = prevDot ? (prevDot.x / 100) * width : targetX;
      const fromY = prevDot ? (prevDot.y / 100) * height : targetY - 40; // Default from above if no prev
      
      const dx = targetX - fromX;
      const dy = targetY - fromY;
      const angle = Math.atan2(dy, dx);
      
      ctx.save();
      ctx.translate(targetX, targetY);
      ctx.rotate(angle);
      
      // Floating animation for arrow
      const arrowOffset = Math.sin(Date.now() / 150) * 5 - 25;
      ctx.translate(arrowOffset, 0);
      
      ctx.beginPath();
      ctx.moveTo(-15, -8);
      ctx.lineTo(0, 0);
      ctx.lineTo(-15, 8);
      ctx.strokeStyle = '#fdcb6e';
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.restore();
    }

    // Draw sparkles
    sparkles.forEach(s => {
      ctx.beginPath();
      ctx.arc((s.x / 100) * width, (s.y / 100) * height, s.life * 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253, 203, 110, ${s.life})`;
      ctx.fill();
      
      // Random little particles
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + (s.life * 2);
        const dist = (1 - s.life) * 20;
        ctx.beginPath();
        ctx.arc(
          (s.x / 100) * width + Math.cos(angle) * dist,
          (s.y / 100) * height + Math.sin(angle) * dist,
          2, 0, Math.PI * 2
        );
        ctx.fill();
      }
    });

    // Draw "Golden Letter" on completion
    const isFinished = dots.length > 0 && collectedIds.size === dots.length;
    if (isFinished) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#fdcb6e';
      ctx.lineWidth = 35;
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(253, 203, 110, 0.5)';
      
      // Pulse animation for the golden letter
      const scale = 1 + Math.sin(Date.now() / 200) * 0.02;
      ctx.translate(width / 2, height / 2);
      ctx.scale(scale, scale);
      ctx.translate(-width / 2, -height / 2);

      strokes.forEach(stroke => {
        if (stroke.length < 2) return;
        ctx.beginPath();
        ctx.moveTo((stroke[0].x / 100) * width, (stroke[0].y / 100) * height);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo((stroke[i].x / 100) * width, (stroke[i].y / 100) * height);
        }
        ctx.stroke();
      });
      ctx.restore();
    }
  }, [dots, collectedIds, mousePos, isTracing, sparkles, strokes]);

  return (
    <div className="canvas-wrapper" style={{ 
      width: '100%', 
      aspectRatio: '1', 
      maxWidth: '500px', 
      margin: '0 auto',
      position: 'relative',
      background: 'white',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      touchAction: 'none'
    }}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
      />
    </div>
  );
};

export default TracingCanvas;
