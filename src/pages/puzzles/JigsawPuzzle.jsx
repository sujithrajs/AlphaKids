import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

// ── SVG Picture Components (300×300 coordinate space) ────────────────────────

const SunnyDay = () => {
  const rays = Array.from({ length: 8 }).map((_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return {
      x1: 150 + Math.cos(a) * 72, y1: 118 + Math.sin(a) * 72,
      x2: 150 + Math.cos(a) * 96, y2: 118 + Math.sin(a) * 96,
    };
  });
  return (
    <>
      <rect width="300" height="300" fill="#87CEEB" />
      <ellipse cx="52" cy="68" rx="46" ry="22" fill="white" opacity="0.95" />
      <ellipse cx="78" cy="56" rx="32" ry="20" fill="white" opacity="0.95" />
      <ellipse cx="248" cy="62" rx="42" ry="20" fill="white" opacity="0.95" />
      <ellipse cx="272" cy="52" rx="28" ry="17" fill="white" opacity="0.95" />
      <circle cx="150" cy="118" r="70" fill="#FFF176" opacity="0.35" />
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke="#FFD700" strokeWidth="9" strokeLinecap="round" />
      ))}
      <circle cx="150" cy="118" r="56" fill="#FFD700" />
      <circle cx="150" cy="118" r="44" fill="#FFEE58" />
      <rect y="232" width="300" height="68" fill="#4CAF50" />
      <rect y="248" width="300" height="52" fill="#388E3C" />
      <circle cx="48" cy="237" r="9" fill="#FF69B4" />
      <rect x="46" y="244" width="4" height="12" fill="#2E7D32" />
      <circle cx="252" cy="237" r="9" fill="#FFEB3B" />
      <rect x="250" y="244" width="4" height="12" fill="#2E7D32" />
      <circle cx="148" cy="236" r="7" fill="#FF8A65" />
      <rect x="146" y="242" width="4" height="10" fill="#2E7D32" />
    </>
  );
};

const Rainbow = () => (
  <>
    <rect width="300" height="300" fill="#87CEEB" />
    <ellipse cx="150" cy="235" rx="252" ry="188" fill="#EF5350" />
    <ellipse cx="150" cy="235" rx="226" ry="162" fill="#FF9800" />
    <ellipse cx="150" cy="235" rx="200" ry="136" fill="#FFEB3B" />
    <ellipse cx="150" cy="235" rx="174" ry="110" fill="#66BB6A" />
    <ellipse cx="150" cy="235" rx="148" ry="84"  fill="#42A5F5" />
    <ellipse cx="150" cy="235" rx="122" ry="58"  fill="#9C27B0" />
    <ellipse cx="150" cy="235" rx="96"  ry="34"  fill="#87CEEB" />
    <rect y="235" width="300" height="65" fill="#4CAF50" />
    <rect y="252" width="300" height="48" fill="#388E3C" />
    <ellipse cx="32" cy="128" rx="36" ry="18" fill="white" opacity="0.95" />
    <ellipse cx="54" cy="116" rx="28" ry="16" fill="white" opacity="0.95" />
    <ellipse cx="268" cy="122" rx="36" ry="18" fill="white" opacity="0.95" />
    <ellipse cx="246" cy="112" rx="28" ry="16" fill="white" opacity="0.95" />
  </>
);

const Flower = () => {
  const petalAngles = Array.from({ length: 6 }).map((_, i) => (i * 60 - 90) * Math.PI / 180);
  const petals = petalAngles.map(a => ({
    cx: 150 + Math.cos(a) * 68,
    cy: 150 + Math.sin(a) * 68,
    rot: (a * 180) / Math.PI,
  }));
  return (
    <>
      <rect width="300" height="300" fill="#E8F5E9" />
      {[[40,40],[260,40],[40,260],[260,260],[150,30],[30,150],[270,150],[150,270]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#C8E6C9" />
      ))}
      <rect x="146" y="210" width="8" height="78" rx="4" fill="#4CAF50" />
      <ellipse cx="118" cy="258" rx="26" ry="11" fill="#66BB6A" transform="rotate(-35 118 258)" />
      <ellipse cx="182" cy="240" rx="26" ry="11" fill="#66BB6A" transform="rotate(35 182 240)" />
      {petals.map((p, i) => (
        <ellipse key={i} cx={p.cx} cy={p.cy} rx="27" ry="50"
          fill={i % 2 === 0 ? '#F48FB1' : '#EC407A'}
          transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
          opacity="0.92"
        />
      ))}
      <circle cx="150" cy="150" r="44" fill="#FFD700" />
      <circle cx="150" cy="150" r="32" fill="#FFC107" />
      {Array.from({ length: 7 }).map((_, i) => {
        const a = i * (360 / 7) * Math.PI / 180;
        return <circle key={i} cx={150 + Math.cos(a) * 16} cy={150 + Math.sin(a) * 16} r="4" fill="#E65100" opacity="0.75" />;
      })}
      <circle cx="150" cy="150" r="6" fill="#BF360C" opacity="0.8" />
    </>
  );
};

const Space = () => {
  const stars = [
    [20,18],[52,38],[82,12],[28,77],[105,48],[198,28],[242,18],
    [272,58],[292,28],[162,18],[118,44],[282,98],[62,108],
    [252,148],[192,78],[12,148],[118,5],[200,120],[90,160],
    [40,200],[160,250],[80,280],[220,270],
  ];
  return (
    <>
      <rect width="300" height="300" fill="#0D1B2A" />
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.5 : 1.5}
          fill="white" opacity={0.55 + (i % 5) * 0.09} />
      ))}
      <circle cx="212" cy="215" r="62" fill="#8D6E63" />
      <circle cx="212" cy="215" r="62" fill="#A1887F" opacity="0.4" />
      <ellipse cx="195" cy="200" rx="22" ry="12" fill="#795548" opacity="0.5" />
      <ellipse cx="225" cy="225" rx="18" ry="8" fill="#6D4C41" opacity="0.4" />
      <ellipse cx="212" cy="215" rx="94" ry="20" fill="none" stroke="#BCAAA4" strokeWidth="11" opacity="0.55" />
      <circle cx="58" cy="78" r="36" fill="#ECEFF1" />
      <circle cx="46" cy="66" r="8" fill="#B0BEC5" />
      <circle cx="70" cy="86" r="5" fill="#CFD8DC" />
      <circle cx="54" cy="92" r="6" fill="#B0BEC5" />
      <rect x="139" y="105" width="22" height="52" rx="5" fill="#E53935" />
      <polygon points="150,78 139,110 161,110" fill="#FFCDD2" />
      <circle cx="150" cy="130" r="8" fill="#81D4FA" />
      <circle cx="150" cy="130" r="5" fill="#E1F5FE" opacity="0.7" />
      <polygon points="139,148 122,168 139,158" fill="#FF8A65" />
      <polygon points="161,148 178,168 161,158" fill="#FF8A65" />
      <ellipse cx="150" cy="163" rx="9" ry="14" fill="#FF9800" opacity="0.9" />
      <ellipse cx="150" cy="166" rx="5" ry="9" fill="#FFEB3B" opacity="0.85" />
    </>
  );
};

const PICTURES = [
  { id: 'sun',     name: '☀️ Sunny Day', Component: SunnyDay },
  { id: 'rainbow', name: '🌈 Rainbow',   Component: Rainbow  },
  { id: 'flower',  name: '🌸 Flower',    Component: Flower   },
  { id: 'space',   name: '🚀 Space',     Component: Space    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const createShuffled = (g) => {
  const count = g * g;
  const arr = Array.from({ length: count }, (_, i) => i);
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (arr.every((v, i) => v === i));
  return arr;
};

const isSolved = (arr) => arr.every((v, i) => v === i);

// ── Main Component ────────────────────────────────────────────────────────────

const JigsawPuzzle = () => {
  const [gridSize, setGridSize] = useState(3);
  const [picIndex, setPicIndex] = useState(0);
  const [pieces, setPieces] = useState(() => createShuffled(3));
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [swaps, setSwaps] = useState(0);
  const [dragOver, setDragOver] = useState(null);
  const dragSrc = useRef(null);

  const { Component, name } = PICTURES[picIndex];
  const PIECE_PX = gridSize === 2 ? 148 : 100;
  const CELL_COORDS = 300 / gridSize; // SVG coordinate size per piece

  const fireSolvedEffect = () => {
    setSolved(true);
    setTimeout(() => {
      confetti({ particleCount: 180, spread: 80, origin: { y: 0.5 } });
    }, 200);
  };

  const doSwap = useCallback((fromPos, toPos) => {
    if (fromPos === toPos) return;
    setPieces(prev => {
      const next = [...prev];
      [next[fromPos], next[toPos]] = [next[toPos], next[fromPos]];
      if (isSolved(next)) fireSolvedEffect();
      return next;
    });
    setSwaps(s => s + 1);
  }, []);

  const startPuzzle = useCallback((newPicIndex, newGrid) => {
    const g = newGrid ?? gridSize;
    setPicIndex(newPicIndex);
    setGridSize(g);
    setPieces(createShuffled(g));
    setSelected(null);
    setSolved(false);
    setSwaps(0);
    setShowPreview(false);
    setDragOver(null);
    dragSrc.current = null;
  }, [gridSize]);

  // ── Click-to-swap ──────────────────────────────────────────────────────────
  const handleClick = (posIndex) => {
    if (solved) return;
    if (dragSrc.current !== null) return; // ignore clicks during drag
    if (selected === null) {
      setSelected(posIndex);
    } else if (selected === posIndex) {
      setSelected(null);
    } else {
      doSwap(selected, posIndex);
      setSelected(null);
    }
  };

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleDragStart = (e, posIndex) => {
    dragSrc.current = posIndex;
    setSelected(null);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent drag ghost (use a small invisible element so the piece stays)
    const ghost = document.createElement('div');
    ghost.style.cssText = 'position:fixed;top:-200px;width:1px;height:1px';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  const handleDragOver = (e, posIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragSrc.current !== posIndex) setDragOver(posIndex);
  };

  const handleDrop = (e, posIndex) => {
    e.preventDefault();
    if (dragSrc.current !== null && dragSrc.current !== posIndex) {
      doSwap(dragSrc.current, posIndex);
    }
    dragSrc.current = null;
    setDragOver(null);
  };

  const handleDragEnd = () => {
    dragSrc.current = null;
    setDragOver(null);
  };

  return (
    <div style={{ width: '100%', maxWidth: '700px' }}>

      {/* Picture selector */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
        {PICTURES.map((p, i) => (
          <motion.button
            key={p.id}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => startPuzzle(i)}
            style={{
              padding: '9px 20px', borderRadius: '22px', border: 'none',
              background: i === picIndex
                ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)'
                : 'rgba(255,255,255,0.85)',
              color: i === picIndex ? 'white' : 'var(--text)',
              fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer',
              boxShadow: i === picIndex
                ? '0 6px 18px rgba(99,102,241,0.35)'
                : '0 3px 10px rgba(0,0,0,0.08)',
              fontFamily: 'var(--font-main)',
            }}
          >
            {p.name}
          </motion.button>
        ))}
      </div>

      {/* Grid size + controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>

        {/* Grid size toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Grid:</span>
          {[2, 3].map(g => (
            <motion.button
              key={g}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => startPuzzle(picIndex, g)}
              style={{
                padding: '7px 18px', borderRadius: '14px', border: 'none',
                background: gridSize === g
                  ? 'var(--primary)'
                  : 'rgba(255,255,255,0.85)',
                color: gridSize === g ? 'white' : 'var(--text)',
                fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer',
                boxShadow: gridSize === g
                  ? '0 4px 14px rgba(99,102,241,0.35)'
                  : '0 2px 8px rgba(0,0,0,0.08)',
                fontFamily: 'var(--font-main)',
              }}
            >
              {g}×{g}
            </motion.button>
          ))}
        </div>

        {/* Swap count + action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            🔄 {swaps} swap{swaps !== 1 ? 's' : ''}
          </span>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(v => !v)}
            style={{
              padding: '8px 16px', borderRadius: '14px', cursor: 'pointer',
              fontWeight: '800', fontSize: '0.88rem',
              display: 'flex', alignItems: 'center', gap: '5px',
              border: '2px solid var(--primary)', fontFamily: 'var(--font-main)',
              background: showPreview ? 'var(--primary)' : 'transparent',
              color: showPreview ? 'white' : 'var(--primary)',
            }}>
            👁 {showPreview ? 'Hide' : 'Peek'}
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => startPuzzle(picIndex)}
            style={{
              padding: '8px 16px', borderRadius: '14px', cursor: 'pointer',
              fontWeight: '800', fontSize: '0.88rem',
              display: 'flex', alignItems: 'center', gap: '5px',
              border: '2px solid #f43f5e', color: '#f43f5e', background: 'transparent',
              fontFamily: 'var(--font-main)',
            }}>
            <RefreshCw size={15} /> Shuffle
          </motion.button>
        </div>
      </div>

      {/* Peek preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: '14px' }}
          >
            <div className="glass" style={{
              borderRadius: '20px', padding: '16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
            }}>
              <p style={{ fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                👀 Target image:
              </p>
              <svg width="130" height="130" viewBox="0 0 300 300"
                style={{ borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.14)', display: 'block' }}>
                <Component />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Puzzle board */}
      <div className="glass" style={{
        borderRadius: '28px', padding: '22px',
        boxShadow: '0 20px 60px rgba(99,102,241,0.13)',
        display: 'flex', justifyContent: 'center',
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, ${PIECE_PX}px)`,
            gap: '4px',
            userSelect: 'none',
          }}
        >
          {pieces.map((originalIndex, posIndex) => {
            const origRow = Math.floor(originalIndex / gridSize);
            const origCol = originalIndex % gridSize;
            const isSelected = selected === posIndex;
            const isDragSrc = dragSrc.current === posIndex;
            const isDragTarget = dragOver === posIndex;

            let outline = 'none';
            if (isSelected) outline = '4px solid var(--primary)';
            else if (isDragTarget) outline = '4px dashed #10b981';
            else if (solved) outline = '3px solid #10b981';

            return (
              <div
                key={posIndex}
                draggable={!solved}
                onDragStart={(e) => handleDragStart(e, posIndex)}
                onDragOver={(e) => handleDragOver(e, posIndex)}
                onDrop={(e) => handleDrop(e, posIndex)}
                onDragEnd={handleDragEnd}
                onClick={() => handleClick(posIndex)}
                style={{
                  width: PIECE_PX,
                  height: PIECE_PX,
                  overflow: 'hidden',
                  borderRadius: gridSize === 2 ? '12px' : '9px',
                  cursor: solved ? 'default' : 'grab',
                  outline,
                  outlineOffset: '-2px',
                  opacity: isDragSrc ? 0.4 : 1,
                  transform: isSelected ? 'scale(1.06)' : isDragTarget ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.15s ease, opacity 0.15s ease, outline 0.15s ease',
                  boxShadow: isSelected
                    ? '0 8px 28px rgba(99,102,241,0.45)'
                    : isDragTarget
                      ? '0 8px 24px rgba(16,185,129,0.35)'
                      : '0 2px 8px rgba(0,0,0,0.1)',
                  willChange: 'transform',
                }}
              >
                <svg
                  width={PIECE_PX}
                  height={PIECE_PX}
                  viewBox={`${origCol * CELL_COORDS} ${origRow * CELL_COORDS} ${CELL_COORDS} ${CELL_COORDS}`}
                  style={{ display: 'block', pointerEvents: 'none' }}
                >
                  <Component />
                </svg>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint text */}
      {!solved && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.9rem', marginTop: '14px' }}>
          Drag pieces to swap them — or tap two pieces to swap! 🧩
        </p>
      )}

      {/* Solved panel */}
      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass"
            style={{
              textAlign: 'center', marginTop: '24px',
              padding: '32px 28px', borderRadius: '28px',
              boxShadow: '0 20px 60px rgba(99,102,241,0.2)',
              background: 'rgba(255,255,255,0.97)',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🎉</div>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--primary)', margin: '0 0 6px' }}>
              Puzzle Complete!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', margin: '0 0 22px' }}>
              Finished in <strong>{swaps} swaps</strong> on {gridSize}×{gridSize} — amazing!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => startPuzzle((picIndex + 1) % PICTURES.length)}
              style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                color: 'white', padding: '16px 36px', borderRadius: '20px',
                fontSize: '1.2rem', fontWeight: '900', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 10px 28px rgba(99,102,241,0.32)',
                fontFamily: 'var(--font-main)',
              }}
            >
              Next Puzzle →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JigsawPuzzle;
