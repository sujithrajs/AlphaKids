import { samplePath, PRO_GLYPHS } from './pathSampler';

/**
 * Each letter is defined as an array of strokes.
 * Each stroke is an array of points {x, y} on a 100x100 grid.
 */
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
    samplePath(PRO_GLYPHS.D_STEM, 20),
    samplePath(PRO_GLYPHS.D_BELLY, 40)
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
    samplePath(PRO_GLYPHS.P_STEM, 20),
    samplePath(PRO_GLYPHS.P_BOWL, 35)
  ],
  Q: [
    samplePath(PRO_GLYPHS.O, 60),
    [{ x: 62, y: 62 }, { x: 85, y: 85 }]
  ],
  R: [
    samplePath(PRO_GLYPHS.R_STEM, 20),
    samplePath(PRO_GLYPHS.R_BOWL, 35),
    samplePath(PRO_GLYPHS.R_LEG, 20)
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

export const getDottedPath = (strokes, spacing = 8) => {
  const allDots = [];

  strokes.forEach((stroke, strokeIndex) => {
    // If stroke is an object (legacy support or wrapper), try to get points array
    const points = Array.isArray(stroke) ? stroke : (stroke.points || []);
    if (points.length < 2) return;

    // Build hi-res skeleton for even sampling
    const hiRes = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i], p2 = points[i + 1];
      const d = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      const steps = Math.max(1, Math.floor(d * 5));
      for (let s = 0; s < steps; s++) {
        hiRes.push({ x: p1.x + (p2.x - p1.x) * (s / steps), y: p1.y + (p2.y - p1.y) * (s / steps) });
      }
    }
    hiRes.push(points[points.length - 1]);

    // Walk along the skeleton at EXACT fixed distance intervals
    let curDist = 0;
    let nextTarget = 0;

    for (let i = 0; i < hiRes.length - 1; i++) {
      const p1 = hiRes[i], p2 = hiRes[i + 1];
      const d = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

      while (nextTarget <= curDist + d) {
        const t = d === 0 ? 0 : (nextTarget - curDist) / d;
        allDots.push({
          x: parseFloat((p1.x + (p2.x - p1.x) * t).toFixed(2)),
          y: parseFloat((p1.y + (p2.y - p1.y) * t).toFixed(2)),
          strokeIndex,
          id: `${strokeIndex}-n-${allDots.length}`
        });
        nextTarget += spacing;
      }
      curDist += d;
    }
  });

  return allDots;
};
