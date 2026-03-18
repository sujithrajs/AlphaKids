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
/**
 * Interpolates points between waypoints to create a smooth dotted line
 * Uses Catmull-Rom spline interpolation for strokes with 3+ points
 */
export const getDottedPath = (strokes, spacing = 5) => {
  const allDots = [];
  
  const getCatmullRomPoint = (t, p0, p1, p2, p3) => {
    const t2 = t * t;
    const t3 = t2 * t;
    return {
      x: 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      ),
      y: 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      )
    };
  };

  strokes.forEach((stroke, strokeIndex) => {
    if (stroke.length < 2) return;

    if (stroke.length === 2) {
      // Linear interpolation for simple lines
      const p1 = stroke[0];
      const p2 = stroke[1];
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
          id: `${strokeIndex}-linear-${s}`
        });
      }
    } else {
      // Catmull-Rom spline for curves
      // We repeat the first and last points to handle endpoints
      const points = [stroke[0], ...stroke, stroke[stroke.length - 1]];
      
      for (let i = 0; i < points.length - 3; i++) {
        const p0 = points[i];
        const p1 = points[i+1];
        const p2 = points[i+2];
        const p3 = points[i+3];
        
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.floor(dist / (spacing / 1.5))); // More steps for curves
        
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          const pos = getCatmullRomPoint(t, p0, p1, p2, p3);
          allDots.push({
            x: pos.x,
            y: pos.y,
            strokeIndex,
            id: `${strokeIndex}-spline-${i}-${s}`
          });
        }
      }
      // Add the final point of the stroke
      const lastPoint = stroke[stroke.length - 1];
      allDots.push({
        x: lastPoint.x,
        y: lastPoint.y,
        strokeIndex,
        id: `${strokeIndex}-spline-end`
      });
    }
  });
  
  // Remove duplicate dots at segment ends
  return allDots.filter((dot, index, self) => 
    index === self.findIndex((d) => Math.abs(d.x - dot.x) < 0.1 && Math.abs(d.y - dot.y) < 0.1)
  );
};
