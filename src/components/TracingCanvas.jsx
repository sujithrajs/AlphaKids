import React, { useRef, useEffect, useState, useMemo } from 'react';
import { getDottedPath } from '../utils/letterPaths';
import * as Tone from 'tone';

const TracingCanvas = ({ strokes, onComplete, onTracingChange, letter }) => {
  const canvasRef = useRef(null);
  const humSynthRef = useRef(null);
  const twinkleSynthRef = useRef(null);
  const celebrationSynth = useRef(null);
  const celebrationNoise = useRef(null);
  const celebrationEnv = useRef(null);
  
  const [dots, setDots] = useState([]);
  const [collectedIds, setCollectedIds] = useState(new Set());
  const [sparkles, setSparkles] = useState([]);
  const [isTracing, setIsTracing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isFinished, setIsFinished] = useState(false);
  
  const requestRef = useRef();
  const hasPlayedCelebration = useRef(false);

  // Animation loop for sparkles and pulsing
  useEffect(() => {
    const animate = () => {
      setSparkles(prev => prev
        .map(s => ({ ...s, life: s.life - 0.05 }))
        .filter(s => s.life > 0)
      );
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Initialize sounds
  useEffect(() => {
    humSynthRef.current = new Tone.FMSynth({
      harmonicity: 3, modulationIndex: 10,
      oscillator: { type: "sine" },
      envelope: { attack: 0.1, decay: 0.1, sustain: 1, release: 0.5 }
    }).toDestination();
    humSynthRef.current.volume.value = -15;

    twinkleSynthRef.current = new Tone.FMSynth({
      harmonicity: 2, modulationIndex: 7,
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.5 }
    }).toDestination();
    twinkleSynthRef.current.volume.value = -5;

    celebrationSynth.current = new Tone.PolySynth(Tone.Synth).toDestination();
    celebrationSynth.current.volume.value = -5;

    const clapFilter = new Tone.Filter(1500, "bandpass").toDestination();
    celebrationEnv.current = new Tone.AmplitudeEnvelope({
      attack: 0.001, decay: 0.1, sustain: 0, release: 0.1
    }).connect(clapFilter);
    celebrationNoise.current = new Tone.Noise("white").connect(celebrationEnv.current).start();

    return () => {
      [humSynthRef, twinkleSynthRef, celebrationSynth, celebrationNoise, celebrationEnv].forEach(ref => ref.current?.dispose());
      clapFilter.dispose();
    };
  }, []);

  // Generate dots when strokes change
  useEffect(() => {
    const generatedDots = getDottedPath(strokes, 8);
    setDots(generatedDots);
    setCollectedIds(new Set());
    setIsFinished(false);
    hasPlayedCelebration.current = false;
  }, [strokes]);



  const handlePointerDown = (e) => {
    if (isFinished) return;
    setIsTracing(true);
    if (Tone.getContext().state === 'suspended') Tone.start();
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
    if (!canvasRef.current || isFinished) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    if (isTracing) {
      const newCollected = new Set(collectedIds);
      let changed = false;
      let search = true;

      while (search) {
        const nextDot = dots.find(dot => !newCollected.has(dot.id));
        if (nextDot) {
          const dist = Math.sqrt(Math.pow(nextDot.x - x, 2) + Math.pow(nextDot.y - y, 2));
          if (dist < 10) {
            newCollected.add(nextDot.id);
            changed = true;
            twinkleSynthRef.current?.triggerAttackRelease(["C5", "E5", "G5", "C6"][Math.floor(Math.random() * 4)], "16n");
            setSparkles(prev => [...prev, { x: nextDot.x, y: nextDot.y, life: 1, color: '#fbbf24' }]);
          } else search = false;
        } else search = false;
      }

      if (changed) {
        setCollectedIds(newCollected);
        if (newCollected.size === dots.length) {
          setIsFinished(true);
          playCelebration();
          onComplete?.();
        }
      }
    }
  };

  const playCelebration = () => {
    if (hasPlayedCelebration.current) return;
    hasPlayedCelebration.current = true;
    const now = Tone.now();
    celebrationSynth.current.triggerAttackRelease("C4", "8n", now);
    celebrationSynth.current.triggerAttackRelease("E4", "8n", now + 0.1);
    celebrationSynth.current.triggerAttackRelease("G4", "8n", now + 0.2);
    celebrationSynth.current.triggerAttackRelease("C5", "4n", now + 0.3);
    for (let i = 0; i < 6; i++) celebrationEnv.current.triggerAttackRelease(0.05, now + i * 0.15);
  };

  // Rendering logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    const drawSmoothStroke = (stroke, lineWidth, strokeStyle) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.moveTo((stroke[0].x / 100) * width, (stroke[0].y / 100) * height);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo((stroke[i].x / 100) * width, (stroke[i].y / 100) * height);
      }
      ctx.stroke();
    };



    ctx.clearRect(0, 0, width, height);

    // 1. Draw smooth background letter backdrop (the "shadow" path)
    ctx.shadowBlur = 0;
    strokes.forEach(s => drawSmoothStroke(s, 38, '#f1f2f6'));
    // Add an even lighter inner path for depth
    strokes.forEach(s => drawSmoothStroke(s, 32, '#ffffff'));


    // 2. Draw dots
    dots.forEach(dot => {
      const isCollected = collectedIds.has(dot.id);
      ctx.beginPath();
      ctx.arc((dot.x / 100) * width, (dot.y / 100) * height, isCollected ? 7 : 4, 0, Math.PI * 2);
      if (isCollected) {
        // Collected dot glow - Indigo 500
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(99, 102, 241, 0.4)'; 
        ctx.beginPath();
        ctx.arc((dot.x / 100) * width, (dot.y / 100) * height, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#6366F1'; // INDIGO 500
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // Uncollected dot
        ctx.beginPath();
        ctx.arc((dot.x / 100) * width, (dot.y / 100) * height, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#e2e8f0';
        ctx.fill();
      }
    });

    // 3. Draw guidance arrow
    const firstUncollectedIdx = dots.findIndex(d => !collectedIds.has(d.id));
    if (firstUncollectedIdx !== -1 && !isFinished) {
      const nextDot = dots[firstUncollectedIdx];
      const prevDot = firstUncollectedIdx > 0 ? dots[firstUncollectedIdx - 1] : null;
      
      const targetX = (nextDot.x / 100) * width;
      const targetY = (nextDot.y / 100) * height;
      
      // Floating pulsing circle around the target dot
      const pulse = Math.sin(Date.now() / 200) * 5 + 10;
      ctx.beginPath();
      ctx.arc(targetX, targetY, pulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)'; // Indigo 400
      ctx.lineWidth = 2;
      ctx.stroke();

      // Directional Arrow pointing to the next dot
      const fromX = prevDot ? (prevDot.x / 100) * width : targetX;
      const fromY = prevDot ? (prevDot.y / 100) * height : targetY - 40;
      const dx = targetX - fromX;
      const dy = targetY - fromY;
      const angle = Math.atan2(dy, dx);
      
      ctx.save();
      ctx.translate(targetX, targetY);
      ctx.rotate(angle);
      const arrowOffset = Math.sin(Date.now() / 150) * 5 - 25;
      ctx.translate(arrowOffset, 0);
      
      ctx.beginPath();
      ctx.moveTo(-15, -8);
      ctx.lineTo(0, 0);
      ctx.lineTo(-15, 8);
      ctx.strokeStyle = '#818CF8'; // INDIGO 400
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();
    }

    // 4. Draw user brush / Trail (only while tracing)
    if (isTracing && !isFinished) {
      // Cursor Glow
      const gr = ctx.createRadialGradient((mousePos.x / 100) * width, (mousePos.y / 100) * height, 0, (mousePos.x / 100) * width, (mousePos.y / 100) * height, 30);
      gr.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      gr.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc((mousePos.x / 100) * width, (mousePos.y / 100) * height, 30, 0, Math.PI * 2);
      ctx.fill();

      // Brush Tip
      ctx.beginPath();
      ctx.arc((mousePos.x / 100) * width, (mousePos.y / 100) * height, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#6366F1';
      ctx.fill();
    }






    // 4. Draw sparkles
    sparkles.forEach(s => {
      ctx.beginPath();
      ctx.arc((s.x / 100) * width, (s.y / 100) * height, s.life * 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 191, 36, ${s.life})`;
      ctx.fill();
    });

    // 5. Final Golden Letter
    if (isFinished) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(251, 191, 36, 0.5)';
      strokes.forEach(s => drawSmoothStroke(s, 40, '#fbbf24'));
      ctx.shadowBlur = 0;
    }

  }, [dots, collectedIds, mousePos, isTracing, sparkles, strokes, isFinished]);

  return (
    <div className="canvas-wrapper glass" style={{ 
      width: '100%', aspectRatio: '1', maxWidth: '500px', margin: '0 auto',
      position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', touchAction: 'none'
    }}>
      <canvas
        ref={canvasRef} width={500} height={500}
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}
        style={{ width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
      />
    </div>
  );
};

export default TracingCanvas;
