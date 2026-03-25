import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Volume2, RotateCcw } from 'lucide-react';
import DrawingCanvas from '../components/DrawingCanvas';
import CelebrationModal from '../components/CelebrationModal';
import Mascot from '../components/Mascot';
import { SHAPE_PATHS, SHAPE_META, SHAPE_ORDER } from '../utils/shapePaths';
import confetti from 'canvas-confetti';

const DrawingPage = () => {
  const { shape } = useParams();
  const navigate = useNavigate();
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [key, setKey] = useState(0); // force-reset canvas

  const shapeLower = shape?.toLowerCase();
  const strokes = SHAPE_PATHS[shapeLower];
  const meta = SHAPE_META[shapeLower];

  if (!strokes || !meta) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h1>Oops!</h1>
        <p>We haven't added the shape "{shape}" yet.</p>
        <button onClick={() => navigate('/draw')}>Go Back</button>
      </div>
    );
  }

  const handleComplete = () => {
    // Delay so the golden glow is visible first
    setTimeout(() => setIsCelebrationOpen(true), 800);

    confetti({
      particleCount: 160,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6c5ce7', '#a29bfe', '#fdcb6e', '#ff7675', '#fd79a8'],
    });
  };

  const handleRetry = () => {
    setIsCelebrationOpen(false);
    setKey(k => k + 1);
  };

  const handleNext = () => {
    setIsCelebrationOpen(false);
    const currentIdx = SHAPE_ORDER.indexOf(shapeLower);
    const nextIdx = (currentIdx + 1) % SHAPE_ORDER.length;
    navigate(`/draw/${SHAPE_ORDER[nextIdx]}`);
  };

  const speakShape = () => {
    const utterance = new SpeechSynthesisUtterance(meta.name);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="tracing-page"
      style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <header style={{
        width: '100%', maxWidth: '800px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '24px',
      }}>
        <button
          onClick={() => navigate('/draw')}
          style={{
            background: 'white', padding: '10px 20px', borderRadius: '15px',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: 'var(--shadow-md)', fontWeight: 'bold', color: 'var(--text)',
            border: 'none',
          }}
        >
          <ChevronLeft size={20} /> Back
        </button>

        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', margin: 0 }}>
          Trace the Shape
        </h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Reset button */}
          <button
            onClick={handleRetry}
            title="Reset"
            style={{
              background: 'white', width: '50px', height: '50px',
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', boxShadow: 'var(--shadow-md)',
              color: 'var(--text)', border: 'none',
            }}
          >
            <RotateCcw size={22} />
          </button>

          {/* Sound button */}
          <button
            onClick={speakShape}
            style={{
              background: 'var(--secondary)', width: '50px', height: '50px',
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', boxShadow: 'var(--shadow-md)',
              color: 'var(--text)', border: 'none',
            }}
          >
            <Volume2 size={24} />
          </button>
        </div>
      </header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', width: '100%' }}
      >
        {/* Shape name + emoji */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
          <span style={{ fontSize: '4rem' }}>{meta.emoji}</span>
          <h1 style={{ fontSize: '4rem', margin: 0, color: 'var(--text)' }}>{meta.name}</h1>
        </div>

        {/* Canvas area with Mascot */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <div style={{
            position: 'absolute', top: '-55px', right: '10%', zIndex: 10,
            pointerEvents: 'none',
          }}>
            <Mascot
              size={110}
              mood={isCelebrationOpen ? 'clapping' : (isDrawing ? 'focused' : 'happy')}
            />
          </div>

          <DrawingCanvas
            key={key}
            strokes={strokes}
            onComplete={handleComplete}
            onDrawingChange={setIsDrawing}
          />
        </div>

        <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Follow the dots with your finger or mouse! ✏️
        </p>
      </motion.div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={isCelebrationOpen}
        letter={meta.name}
        onNext={handleNext}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default DrawingPage;
