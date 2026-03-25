import { samplePath } from './pathSampler';

/**
 * Shape paths on a 100x100 coordinate grid.
 * Each shape is an array of strokes; each stroke is an array of {x,y} points.
 * We use samplePath() (SVG path element) for smooth curves.
 */
export const SHAPE_PATHS = {
  circle: [
    samplePath('M 50 15 A 35 35 0 1 0 50 85 A 35 35 0 1 0 50 15', 60),
  ],

  square: [
    [
      { x: 20, y: 20 }, { x: 80, y: 20 },
      { x: 80, y: 80 }, { x: 20, y: 80 }, { x: 20, y: 20 },
    ],
  ],

  triangle: [
    [
      { x: 50, y: 12 }, { x: 88, y: 85 }, { x: 12, y: 85 }, { x: 50, y: 12 },
    ],
  ],

  star: [
    [
      { x: 50, y: 10 },
      { x: 61, y: 35 }, { x: 90, y: 35 },
      { x: 68, y: 55 }, { x: 79, y: 82 },
      { x: 50, y: 65 }, { x: 21, y: 82 },
      { x: 32, y: 55 }, { x: 10, y: 35 },
      { x: 39, y: 35 }, { x: 50, y: 10 },
    ],
  ],

  heart: [
    samplePath(
      'M 50 80 C 10 55 10 20 30 20 C 38 20 46 27 50 35 C 54 27 62 20 70 20 C 90 20 90 55 50 80 Z',
      60
    ),
  ],

  pentagon: [
    [
      { x: 50, y: 10 },
      { x: 88, y: 38 }, { x: 74, y: 84 },
      { x: 26, y: 84 }, { x: 12, y: 38 },
      { x: 50, y: 10 },
    ],
  ],

  diamond: [
    [
      { x: 50, y: 10 }, { x: 88, y: 50 },
      { x: 50, y: 90 }, { x: 12, y: 50 }, { x: 50, y: 10 },
    ],
  ],

  arrow: [
    // Arrowhead
    [
      { x: 50, y: 10 }, { x: 85, y: 50 }, { x: 62, y: 50 },
      { x: 62, y: 90 }, { x: 38, y: 90 }, { x: 38, y: 50 },
      { x: 15, y: 50 }, { x: 50, y: 10 },
    ],
  ],
};

/**
 * Display metadata for each shape.
 */
export const SHAPE_META = {
  circle: {
    name: 'Circle',
    emoji: '⭕',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
    shadow: 'rgba(99,102,241,0.45)',
    badge: 'Round',
  },
  square: {
    name: 'Square',
    emoji: '🟦',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    shadow: 'rgba(14,165,233,0.45)',
    badge: '4 Sides',
  },
  triangle: {
    name: 'Triangle',
    emoji: '🔺',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
    shadow: 'rgba(244,63,94,0.45)',
    badge: '3 Sides',
  },
  star: {
    name: 'Star',
    emoji: '⭐',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    shadow: 'rgba(245,158,11,0.45)',
    badge: '5 Points',
  },
  heart: {
    name: 'Heart',
    emoji: '❤️',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    shadow: 'rgba(236,72,153,0.45)',
    badge: 'Love',
  },
  pentagon: {
    name: 'Pentagon',
    emoji: '⬠',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    shadow: 'rgba(16,185,129,0.45)',
    badge: '5 Sides',
  },
  diamond: {
    name: 'Diamond',
    emoji: '💎',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    shadow: 'rgba(139,92,246,0.45)',
    badge: '4 Sides',
  },
  arrow: {
    name: 'Arrow',
    emoji: '⬆️',
    gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    shadow: 'rgba(249,115,22,0.45)',
    badge: 'Direction',
  },
};

export const SHAPE_ORDER = ['circle', 'square', 'triangle', 'star', 'heart', 'pentagon', 'diamond', 'arrow'];
