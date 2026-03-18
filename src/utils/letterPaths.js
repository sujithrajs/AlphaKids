/**
 * Each letter is defined as an array of strokes.
 * Each stroke is an array of points {x, y} on a 100x100 grid.
 */
export const LETTER_PATHS = {
  A: [
    [ { x: 50, y: 15 }, { x: 20, y: 85 } ], // Left leg
    [ { x: 50, y: 15 }, { x: 80, y: 85 } ], // Right leg
    [ { x: 35, y: 55 }, { x: 65, y: 55 } ], // Cross bar
  ],
  B: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ], // Vertical
    [ { x: 30, y: 15 }, { x: 60, y: 15 }, { x: 75, y: 30 }, { x: 75, y: 40 }, { x: 60, y: 50 }, { x: 30, y: 50 } ], // Top loop
    [ { x: 30, y: 50 }, { x: 65, y: 50 }, { x: 80, y: 65 }, { x: 80, y: 75 }, { x: 65, y: 85 }, { x: 30, y: 85 } ], // Bottom loop
  ],
  C: [
    [ 
      { x: 75, y: 30 }, { x: 60, y: 15 }, { x: 40, y: 15 }, 
      { x: 25, y: 30 }, { x: 25, y: 70 }, { x: 40, y: 85 }, 
      { x: 60, y: 85 }, { x: 75, y: 70 } 
    ]
  ],
  D: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 30, y: 15 }, { x: 60, y: 15 }, { x: 80, y: 35 }, { x: 80, y: 65 }, { x: 60, y: 85 }, { x: 30, y: 85 } ]
  ],
  E: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 30, y: 15 }, { x: 75, y: 15 } ],
    [ { x: 30, y: 50 }, { x: 65, y: 50 } ],
    [ { x: 30, y: 85 }, { x: 75, y: 85 } ]
  ],
  F: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 30, y: 15 }, { x: 75, y: 15 } ],
    [ { x: 30, y: 50 }, { x: 65, y: 50 } ]
  ],
  G: [
    [ 
      { x: 75, y: 30 }, { x: 60, y: 15 }, { x: 40, y: 15 }, 
      { x: 25, y: 30 }, { x: 25, y: 70 }, { x: 40, y: 85 }, 
      { x: 75, y: 85 }, { x: 75, y: 55 }, { x: 55, y: 55 }
    ]
  ],
  H: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 70, y: 15 }, { x: 70, y: 85 } ],
    [ { x: 30, y: 50 }, { x: 70, y: 50 } ]
  ],
  I: [
    [ { x: 50, y: 15 }, { x: 50, y: 85 } ],
    [ { x: 35, y: 15 }, { x: 65, y: 15 } ],
    [ { x: 35, y: 85 }, { x: 65, y: 85 } ]
  ],
  J: [
    [ { x: 60, y: 15 }, { x: 60, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 85 }, { x: 25, y: 75 } ],
    [ { x: 40, y: 15 }, { x: 80, y: 15 } ]
  ],
  K: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 70, y: 15 }, { x: 30, y: 50 } ],
    [ { x: 30, y: 50 }, { x: 70, y: 85 } ]
  ],
  L: [
    [ { x: 35, y: 15 }, { x: 35, y: 85 } ],
    [ { x: 35, y: 85 }, { x: 75, y: 85 } ]
  ],
  M: [
    [ { x: 20, y: 15 }, { x: 20, y: 85 } ],
    [ { x: 20, y: 15 }, { x: 50, y: 50 } ],
    [ { x: 50, y: 50 }, { x: 80, y: 15 } ],
    [ { x: 80, y: 15 }, { x: 80, y: 85 } ]
  ],
  N: [
    [ { x: 25, y: 15 }, { x: 25, y: 85 } ],
    [ { x: 25, y: 15 }, { x: 75, y: 85 } ],
    [ { x: 75, y: 15 }, { x: 75, y: 85 } ]
  ],
  O: [
    [ 
      { x: 50, y: 15 }, { x: 75, y: 25 }, { x: 85, y: 50 }, { x: 75, y: 75 }, 
      { x: 50, y: 85 }, { x: 25, y: 75 }, { x: 15, y: 50 }, { x: 25, y: 25 }, 
      { x: 50, y: 15 } 
    ]
  ],
  P: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 30, y: 15 }, { x: 65, y: 15 }, { x: 80, y: 25 }, { x: 80, y: 40 }, { x: 65, y: 50 }, { x: 30, y: 50 } ]
  ],
  Q: [
    [ 
      { x: 50, y: 15 }, { x: 75, y: 25 }, { x: 85, y: 50 }, { x: 75, y: 75 }, 
      { x: 50, y: 85 }, { x: 25, y: 75 }, { x: 15, y: 50 }, { x: 25, y: 25 }, 
      { x: 50, y: 15 } 
    ],
    [ { x: 60, y: 65 }, { x: 85, y: 90 } ]
  ],
  R: [
    [ { x: 30, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 30, y: 15 }, { x: 65, y: 15 }, { x: 80, y: 25 }, { x: 80, y: 40 }, { x: 65, y: 50 }, { x: 30, y: 50 } ],
    [ { x: 55, y: 50 }, { x: 80, y: 85 } ]
  ],
  S: [
    [ 
      { x: 75, y: 25 }, { x: 60, y: 15 }, { x: 40, y: 15 }, { x: 25, y: 30 }, 
      { x: 25, y: 40 }, { x: 50, y: 50 }, { x: 75, y: 60 }, { x: 75, y: 75 }, 
      { x: 60, y: 85 }, { x: 40, y: 85 }, { x: 25, y: 75 } 
    ]
  ],
  T: [
    [ { x: 25, y: 15 }, { x: 75, y: 15 } ],
    [ { x: 50, y: 15 }, { x: 50, y: 85 } ]
  ],
  U: [
    [ { x: 25, y: 15 }, { x: 25, y: 70 }, { x: 40, y: 85 }, { x: 60, y: 85 }, { x: 75, y: 70 }, { x: 75, y: 15 } ]
  ],
  V: [
    [ { x: 20, y: 15 }, { x: 50, y: 85 } ],
    [ { x: 50, y: 85 }, { x: 80, y: 15 } ]
  ],
  W: [
    [ { x: 15, y: 15 }, { x: 30, y: 85 } ],
    [ { x: 30, y: 85 }, { x: 50, y: 35 } ],
    [ { x: 50, y: 35 }, { x: 70, y: 85 } ],
    [ { x: 70, y: 85 }, { x: 85, y: 15 } ]
  ],
  X: [
    [ { x: 25, y: 15 }, { x: 75, y: 85 } ],
    [ { x: 75, y: 15 }, { x: 25, y: 85 } ]
  ],
  Y: [
    [ { x: 25, y: 15 }, { x: 50, y: 50 } ],
    [ { x: 75, y: 15 }, { x: 50, y: 50 } ],
    [ { x: 50, y: 50 }, { x: 50, y: 85 } ]
  ],
  Z: [
    [ { x: 25, y: 15 }, { x: 75, y: 15 } ],
    [ { x: 75, y: 15 }, { x: 25, y: 85 } ],
    [ { x: 25, y: 85 }, { x: 75, y: 85 } ]
  ]
};

/**
 * Interpolates points between waypoints to create a denser dotted line
 */
export const getDottedPath = (strokes, spacing = 5) => {
  const allDots = [];
  
  strokes.forEach((stroke, strokeIndex) => {
    for (let i = 0; i < stroke.length - 1; i++) {
      const p1 = stroke[i];
      const p2 = stroke[i+1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / spacing));
      
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        allDots.push({
          x: p1.x + dx * t,
          y: p1.y + dy * t,
          strokeIndex,
          id: `${strokeIndex}-${i}-${s}`
        });
      }
    }
  });
  
  // Remove duplicate dots at segment ends
  return allDots.filter((dot, index, self) => 
    index === self.findIndex((d) => d.x === dot.x && d.y === dot.y)
  );
};
