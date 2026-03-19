import { samplePath, PRO_GLYPHS } from './pathSampler';

export const LETTER_PATHS = {
  A: [
    [{ x: 50, y: 15 }, { x: 40, y: 40 }, { x: 30, y: 65 }, { x: 22, y: 85 }],
    [{ x: 50, y: 15 }, { x: 60, y: 40 }, { x: 70, y: 65 }, { x: 78, y: 85 }],
    [{ x: 32, y: 62 }, { x: 68, y: 62 }]
  ],
  B: [
    samplePath(PRO_GLYPHS.B_STEM, 20),
    samplePath(PRO_GLYPHS.B_TOP, 30),
    samplePath(PRO_GLYPHS.B_BOTTOM, 30)
  ],
  C: [
    samplePath(PRO_GLYPHS.C, 40)
  ],
  D: [
    [{ x: 30, y: 15 }, { x: 30, y: 85 }],
    [{ x: 30, y: 15 }, { x: 50, y: 15 }, { x: 65, y: 20 }, { x: 78, y: 35 }, { x: 82, y: 50 }, { x: 78, y: 65 }, { x: 65, y: 80 }, { x: 50, y: 85 }, { x: 30, y: 85 }]
  ],
  E: [
    [{ x: 30, y: 15 }, { x: 30, y: 85 }],
    [{ x: 30, y: 15 }, { x: 75, y: 15 }],
    [{ x: 30, y: 50 }, { x: 68, y: 50 }],
    [{ x: 30, y: 85 }, { x: 75, y: 85 }]
  ],
  F: [
    [{ x: 30, y: 15 }, { x: 30, y: 85 }],
    [{ x: 30, y: 15 }, { x: 75, y: 15 }],
    [{ x: 30, y: 50 }, { x: 68, y: 50 }]
  ],
  G: [
    samplePath(PRO_GLYPHS.G, 50)
  ],
  H: [
    [{ x: 25, y: 15 }, { x: 25, y: 85 }],
    [{ x: 75, y: 15 }, { x: 75, y: 85 }],
    [{ x: 25, y: 50 }, { x: 75, y: 50 }]
  ],
  I: [
    [{ x: 30, y: 15 }, { x: 70, y: 15 }],
    [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    [{ x: 30, y: 85 }, { x: 70, y: 85 }]
  ],
  J: [
    [{ x: 45, y: 15 }, { x: 85, y: 15 }],
    [{ x: 65, y: 15 }, { x: 65, y: 70 }, { x: 65, y: 70 }, { x: 65, y: 76.2 }, { x: 62.4, y: 81.5 }, { x: 58, y: 85.3 }, { x: 52.3, y: 87.3 }, { x: 46.2, y: 87.3 }, { x: 40.5, y: 85.3 }, { x: 36, y: 81.5 }, { x: 33.5, y: 76.2 }]
  ],
  K: [
    [{ x: 30, y: 15 }, { x: 30, y: 85 }],
    [{ x: 75, y: 15 }, { x: 30, y: 50 }],
    [{ x: 30, y: 50 }, { x: 75, y: 85 }]
  ],
  L: [
    [{ x: 30, y: 15 }, { x: 30, y: 85 }],
    [{ x: 30, y: 85 }, { x: 75, y: 85 }]
  ],
  M: [
    [{ x: 18, y: 85 }, { x: 18, y: 15 }],
    [{ x: 18, y: 15 }, { x: 50, y: 48 }],
    [{ x: 50, y: 48 }, { x: 82, y: 15 }],
    [{ x: 82, y: 15 }, { x: 82, y: 85 }]
  ],
  N: [
    [{ x: 22, y: 85 }, { x: 22, y: 15 }],
    [{ x: 22, y: 15 }, { x: 78, y: 85 }],
    [{ x: 78, y: 85 }, { x: 78, y: 15 }]
  ],
  O: [
    samplePath(PRO_GLYPHS.O, 60)
  ],
  P: [
    [{ x: 30, y: 15 }, { x: 30, y: 85 }],
    [{ x: 30, y: 15 }, { x: 50, y: 15 }, { x: 65, y: 18 }, { x: 74, y: 26 }, { x: 74, y: 40 }, { x: 65, y: 48 }, { x: 50, y: 50 }, { x: 30, y: 50 }]
  ],
  Q: [
    samplePath(PRO_GLYPHS.O, 60),
    [{ x: 62, y: 62 }, { x: 85, y: 85 }]
  ],
  R: [
    [{ x: 30, y: 15 }, { x: 30, y: 85 }],
    [{ x: 30, y: 15 }, { x: 50, y: 15 }, { x: 65, y: 18 }, { x: 74, y: 26 }, { x: 74, y: 40 }, { x: 65, y: 48 }, { x: 50, y: 50 }, { x: 30, y: 50 }],
    [{ x: 52, y: 50 }, { x: 65, y: 65 }, { x: 82, y: 85 }]
  ],
  S: [
    samplePath(PRO_GLYPHS.S, 50)
  ],



  T: [
    [{ x: 20, y: 15 }, { x: 80, y: 15 }],
    [{ x: 50, y: 15 }, { x: 50, y: 85 }]
  ],
  U: [
    [{ x: 25, y: 15 }, { x: 25, y: 65 }, { x: 25, y: 65 }, { x: 26.2, y: 72.7 }, { x: 29.8, y: 79.7 }, { x: 35.3, y: 85.2 }, { x: 42.3, y: 88.8 }, { x: 50, y: 90 }, { x: 57.7, y: 88.8 }, { x: 64.7, y: 85.2 }, { x: 70.2, y: 79.7 }, { x: 73.8, y: 72.7 }, { x: 75, y: 65 }, { x: 75, y: 65 }, { x: 75, y: 15 }]
  ],

  V: [
    [{ x: 18, y: 15 }, { x: 34, y: 50 }, { x: 50, y: 85 }],
    [{ x: 50, y: 85 }, { x: 66, y: 50 }, { x: 82, y: 15 }]
  ],
  W: [
    [{ x: 12, y: 15 }, { x: 28, y: 85 }],
    [{ x: 28, y: 85 }, { x: 50, y: 50 }],
    [{ x: 50, y: 50 }, { x: 72, y: 85 }],
    [{ x: 72, y: 85 }, { x: 88, y: 15 }]
  ],
  X: [
    [{ x: 25, y: 15 }, { x: 50, y: 50 }, { x: 75, y: 85 }],
    [{ x: 75, y: 15 }, { x: 50, y: 50 }, { x: 25, y: 85 }]
  ],
  Y: [
    [{ x: 20, y: 15 }, { x: 50, y: 50 }],
    [{ x: 80, y: 15 }, { x: 50, y: 50 }],
    [{ x: 50, y: 50 }, { x: 50, y: 85 }]
  ],
  Z: [
    [{ x: 22, y: 15 }, { x: 78, y: 15 }],
    [{ x: 78, y: 15 }, { x: 50, y: 50 }, { x: 22, y: 85 }],
    [{ x: 22, y: 85 }, { x: 78, y: 85 }]
  ]


};

/**
 * Interpolates points between waypoints to create a smooth dotted line
 * Uses Catmull-Rom spline interpolation for strokes with 3+ points
 */
/**
 * Interpolates points between waypoints to create a smooth dotted line
 * USES ARC-LENGTH SAMPLING:
 * 1. Samples the spline at very high resolution to measure cumulative distance.
 * 2. Places dots at EXACT fixed intervals along the actual curve length.
 */
const getCubicBezierPoint = (t, p0, p1, p2, p3) => {
  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;
  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;

  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: (ax * t3) + (bx * t2) + (cx * t) + p0.x,
    y: (ay * t3) + (by * t2) + (cy * t) + p0.y
  };
};

export const getDottedPath = (strokes, spacing = 5) => {

  const allDots = [];

  const getCatmullRomPoint = (t, p0, p1, p2, p3) => {
    const t2 = t * t;
    const t3 = t2 * t;
    return {
      x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
      y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
    };
  };

  strokes.forEach((stroke, strokeIndex) => {
    const hiRes = [];

    if (stroke.type === 'bezier') {
      // Handle professional bezier-defined glyphs
      const pts = stroke.points;
      for (let i = 0; i < pts.length - 1; i++) {
        const pStart = pts[i];
        const pEnd = pts[i + 1];

        if (pEnd.type === 'line') {
          // Linear segment in a bezier path
          for (let s = 0; s <= 100; s++) {
            hiRes.push({ x: pStart.x + (pEnd.x - pStart.x) * (s / 100), y: pStart.y + (pEnd.y - pStart.y) * (s / 100) });
          }
        } else {
          // Cubic Bezier segment
          for (let s = 0; s < 100; s++) {
            hiRes.push(getCubicBezierPoint(s / 100, pStart, pEnd.cp1, pEnd.cp2, pEnd));
          }
        }
      }
    } else {
      // Handle legacy array-based strokes
      if (stroke.length < 2) return;

      const isClosed = stroke[0].x === stroke[stroke.length - 1].x && stroke[0].y === stroke[stroke.length - 1].y;
      const points = isClosed
        ? [stroke[stroke.length - 2], ...stroke, stroke[1]]
        : [stroke[0], ...stroke, stroke[stroke.length - 1]];

      for (let i = 0; i < points.length - 3; i++) {
        for (let s = 0; s < 100; s++) {
          hiRes.push(getCatmullRomPoint(s / 100, points[i], points[i + 1], points[i + 2], points[i + 3]));
        }
      }
      hiRes.push(stroke[stroke.length - 1]);
    }

    // Measure cumulative distance for PERFECT spacing
    let accumulatedDist = 0;
    let nextDotTarget = 0;

    for (let i = 0; i < hiRes.length - 1; i++) {
      const p1 = hiRes[i], p2 = hiRes[i + 1];
      const d = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

      while (nextDotTarget <= accumulatedDist + d) {
        const ratio = d === 0 ? 0 : (nextDotTarget - accumulatedDist) / d;
        allDots.push({
          x: parseFloat((p1.x + (p2.x - p1.x) * ratio).toFixed(2)),
          y: parseFloat((p1.y + (p2.y - p1.y) * ratio).toFixed(2)),
          strokeIndex,
          id: `${strokeIndex}-dot-${allDots.length}`
        });
        nextDotTarget += spacing;
      }
      accumulatedDist += d;
    }
  });


  return allDots;
};


