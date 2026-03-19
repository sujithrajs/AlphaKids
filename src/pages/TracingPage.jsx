import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Volume2 } from 'lucide-react';
import TracingCanvas from '../components/TracingCanvas';
import CelebrationModal from '../components/CelebrationModal';
import Mascot from '../components/Mascot';
import { LETTER_PATHS } from '../utils/letterPaths';
import { useProgress } from '../hooks/useProgress';
import * as Tone from 'tone';
import confetti from 'canvas-confetti';

const TracingPage = () => {
  const { letter } = useParams();
  const navigate = useNavigate();
  const { markComplete } = useProgress();
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isTracing, setIsTracing] = useState(false);

  const strokes = LETTER_PATHS[letter.toUpperCase()];

  if (!strokes) {
    return (
      <div className="error-page" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Oops!</h1>
        <p>We haven't added the letter "{letter}" yet.</p>
        <button onClick={() => navigate('/alphabet')}>Go Back</button>
      </div>
    );
  }

  const handleComplete = () => {
    markComplete(letter.toUpperCase());
    
    // Delay opening the modal so they can see the golden letter and animation
    setTimeout(() => {
      setIsCelebrationOpen(true);
    }, 800);
    
    // Confetti celebration!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6c5ce7', '#a29bfe', '#fdcb6e', '#ff7675']
    });

    console.log("Mastering celebration for letter:", letter);
  };

  const playLetterSound = () => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="tracing-page" style={{ 
      minHeight: '100vh', 
      padding: '20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ 
        width: '100%', 
        maxWidth: '800px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <button 
          onClick={() => navigate('/alphabet')}
          style={{
            background: 'white',
            padding: '10px 20px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow)',
            fontWeight: 'bold',
            color: 'var(--text)'
          }}
        >
          <ChevronLeft size={20} /> Back
        </button>
        
        <h2 style={{ fontSize: '2rem', color: 'var(--primary)' }}>Trace the Letter</h2>

        <button 
          onClick={playLetterSound}
          style={{
            background: 'var(--secondary)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow)',
            color: 'var(--text)'
          }}
        >
          <Volume2 size={24} />
        </button>
      </header>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', width: '100%' }}
      >
        <h1 style={{ fontSize: '6rem', margin: '0 0 10px 0', color: 'var(--text)' }}>
          {letter.toUpperCase()}
        </h1>

        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div style={{ 
            position: 'absolute', 
            top: '-60px', 
            right: '10%', 
            zIndex: isCelebrationOpen ? 1100 : 10,
            pointerEvents: 'none'
          }}>
            <Mascot 
              size={120} 
              mood={isCelebrationOpen ? 'clapping' : (isTracing ? 'focused' : 'happy')} 
            />
          </div>
          <div style={{ position: 'relative' }}>
          <TracingCanvas 
            strokes={strokes} 
            onComplete={handleComplete} 
            onTracingChange={setIsTracing}
            letter={letter}
          />
        </div>


        </div>

        <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Follow the dots with your finger or mouse!
        </p>
      </motion.div>

      <CelebrationModal 
        isOpen={isCelebrationOpen}
        letter={letter.toUpperCase()}
        onNext={() => {
          setIsCelebrationOpen(false);
          const nextCharCode = letter.toUpperCase().charCodeAt(0) + 1;
          if (nextCharCode <= 90) {
            navigate(`/trace/${String.fromCharCode(nextCharCode)}`);
          } else {
            navigate('/alphabet');
          }
        }}
        onRetry={() => {
          setIsCelebrationOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
};

export default TracingPage;
