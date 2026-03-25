import React, { useRef, useEffect, useState } from 'react';
import { getDottedPath } from '../utils/letterPaths';
import * as Tone from 'tone';

/**
 * DrawingCanvas – tracing canvas for shapes.
 * Reuses the same dot-tracing mechanic as TracingCanvas.
 */
const DrawingCanvas = ({ strokes, onComplete, onDrawingChange }) => {
  const canvasRef = useRef(null);
  const humSynthRef = useRef(null);
  const twinkleSynthRef = useRef(null);
  const celebrationSynth = useRef(null);
  const celebrationNoise = useRef(null);
  const celebrationEnv = useRef(null);

  const [dots, setDots] = useState([]);
  const [collectedIds, setCollectedIds] = useState(new Set());
  const [sparkles, setSparkles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isFinished, setIsFinished] = useState(false);

  const requestRef = useRef();
  const hasPlayedCelebration = useRef(false);

  // Sparkle animation loop
  useEffect(() => {
    const animate = () => {
      setSparkles(prev => prev.map(s => ({ ...s, life: s.life - 0.05 })).filter(s => s.life > 0));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Initialize audio
  useEffect(() => {
    humSynthRef.current = new Tone.FMSynth({
      harmonicity: 3, modulationIndex: 10,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.1, decay: 0.1, sustain: 1, release: 0.5 }
    }).toDestination();
    humSynthRef.current.volume.value = -15;

    twinkleSynthRef.current = new Tone.FMSynth({
      harmonicity: 2, modulationIndex: 7,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.5 }
    }).toDestination();
    twinkleSynthRef.current.volume.value = -5;

    celebrationSynth.current = new Tone.PolySynth(Tone.Synth).toDestination();
    celebrationSynth.current.volume.value = -5;

    const clapFilter = new Tone.Filter(1500, 'bandpass').toDestination();
    celebrationEnv.current = new Tone.AmplitudeEnvelope({
      attack: 0.001, decay: 0.1, sustain: 0, release: 0.1
    }).connect(clapFilter);
    celebrationNoise.current = new Tone.Noise('white').connect(celebrationEnv.current).start();

    return () => {
      [humSynthRef, twinkleSynthRef, celebrationSynth, celebrationNoise, celebrationEnv]
        .forEach(r => r.current?.dispose());
      clapFilter.dispose();
    };
  }, []);

  // Generate dots when strokes change
  useEffect(() => {
    const generated = getDottedPath(strokes, 6);
    setDots(generated);
    setCollectedIds(new Set());
    setIsFinished(false);
    hasPlayedCelebration.current = false;
  }, [strokes]);

  const handlePointerDown = (e) => {
    if (isFinished) return;
    setIsDrawing(true);
    if (Tone.getContext().state === 'suspended') Tone.start();
    humSynthRef.current?.triggerAttack('C3');
    onDrawingChange?.(true);
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    humSynthRef.current?.triggerRelease();
    onDrawingChange?.(false);
  };

  const handlePointerMove = (e) => {
    if (!canvasRef.current || isFinished) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    if (isDrawing) {
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
            twinkleSynthRef.current?.triggerAttackRelease(
              ['D5', 'F#5', 'A5', 'D6'][Math.floor(Math.random() * 4)], '16n'
            );
            setSparkles(prev => [...prev, { x: nextDot.x, y: nextDot.y, life: 1 }]);
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
    celebrationSynth.current.triggerAttackRelease('C4', '8n', now);
    celebrationSynth.current.triggerAttackRelease('E4', '8n', now + 0.1);
    celebrationSynth.current.triggerAttackRelease('G4', '8n', now + 0.2);
    celebrationSynth.current.triggerAttackRelease('C5', '4n', now + 0.3);
    for (let i = 0; i < 6; i++) celebrationEnv.current.triggerAttackRelease(0.05, now + i * 0.15);
  };

  // Render loop
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

    // 1. Guide shape (faint background)
    ctx.shadowBlur = 0;
    strokes.forEach(s => drawSmoothStroke(s, 38, '#f1f2f6'));
    strokes.forEach(s => drawSmoothStroke(s, 30, '#ffffff'));

    // 2. Dots
    dots.forEach(dot => {
      const isCollected = collectedIds.has(dot.id);
      const px = (dot.x / 100) * width;
      const py = (dot.y / 100) * height;

      if (isCollected) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(99,102,241,0.4)';
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#e2e8f0';
        ctx.fill();
      }
    });

    // 3. Guidance pulse + arrow on next dot
    const firstUncollectedIdx = dots.findIndex(d => !collectedIds.has(d.id));
    if (firstUncollectedIdx !== -1 && !isFinished) {
      const nextDot = dots[firstUncollectedIdx];
      const prevDot = firstUncollectedIdx > 0 ? dots[firstUncollectedIdx - 1] : null;
      const tx = (nextDot.x / 100) * width;
      const ty = (nextDot.y / 100) * height;

      const pulse = Math.sin(Date.now() / 200) * 5 + 10;
      ctx.beginPath();
      ctx.arc(tx, ty, pulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(129,140,248,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      const fromX = prevDot ? (prevDot.x / 100) * width : tx;
      const fromY = prevDot ? (prevDot.y / 100) * height : ty - 40;
      const angle = Math.atan2(ty - fromY, tx - fromX);

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(angle);
      ctx.translate(Math.sin(Date.now() / 150) * 5 - 25, 0);
      ctx.beginPath();
      ctx.moveTo(-15, -8);
      ctx.lineTo(0, 0);
      ctx.lineTo(-15, 8);
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();
    }

    // 4. Cursor glow + brush tip
    if (isDrawing && !isFinished) {
      const mx = (mousePos.x / 100) * width;
      const my = (mousePos.y / 100) * height;
      const gr = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
      gr.addColorStop(0, 'rgba(99,102,241,0.3)');
      gr.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(mx, my, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mx, my, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();
    }

    // 5. Sparkles
    sparkles.forEach(s => {
      ctx.beginPath();
      ctx.arc((s.x / 100) * width, (s.y / 100) * height, s.life * 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251,191,36,${s.life})`;
      ctx.fill();
    });

    // 6. Golden finish
    if (isFinished) {
      ctx.shadowBlur = 22;
      ctx.shadowColor = 'rgba(251,191,36,0.5)';
      strokes.forEach(s => drawSmoothStroke(s, 38, '#fbbf24'));
      ctx.shadowBlur = 0;
    }
  }, [dots, collectedIds, mousePos, isDrawing, sparkles, strokes, isFinished]);

  return (
    <div
      className="canvas-wrapper glass"
      style={{
        width: '100%', aspectRatio: '1', maxWidth: '480px', margin: '0 auto',
        position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden',
        touchAction: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        width={500} height={500}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
      />
    </div>
  );
};

export default DrawingCanvas;
