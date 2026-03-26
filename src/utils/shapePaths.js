import { samplePath, sampleScaledPath } from './pathSampler';

// ─────────────────────────────────────────────────────────────────────────────
// LUCIDE ICON PATHS  (viewBox 0 0 24 24)
// Source: https://github.com/lucide-icons/lucide  (ISC licence)
// We scale them from 24×24 → 100×100 via sampleScaledPath().
// ─────────────────────────────────────────────────────────────────────────────

const L = {
  // Apple – main body
  apple_body: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
  apple_stem: "M12 6.528V3a1 1 0 0 1 1-1h0",

  // Banana
  banana1: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5",
  banana2: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",

  // Fish
  fish_body: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
  fish_tail: "M16 17.93a9.77 9.77 0 0 1 0-11.86",
  fish_fin: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",

  // Flower – Tabler Icons "flower" (MIT licence, viewBox 0 0 24 24)
  // 5-petal flower with stem and leaf
  flower_bloom:  "M12 10a4 4 0 0 0 4-4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4 4",
  flower_petal1: "M12 10 A4 4 0 1 1 8 6",
  flower_petal2: "M12 10 A4 4 0 1 1 16 6",
  flower_petal3: "M12 10 A4 4 0 1 1 16 14",
  flower_petal4: "M12 10 A4 4 0 1 1 8 14",
  flower_center: "M12 10 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0-4 0",
  flower_stem:   "M12 14 L12 22",
  flower_leaf:   "M12 19 C9 19 7 17 7 17 C7 17 9 15 12 15",

  // Cat (full body)
  cat_body: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
  cat_eyes: "M8 14v.5",      // left eye blink
  cat_eye2: "M16 14v.5",     // right eye blink
  cat_nose: "M11.25 16.25h1.5L12 17l-.75-.75Z",

  // Cherry (replace strawberry)
  cherry1: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z",
  cherry2: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z",
  cherry_stem: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12",
  cherry_leaf: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z",

  // Bird
  bird1: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20",
  bird2: "M10 18v3",
  bird3: "M14 17.75V21",
  bird4: "M7 18a6 6 0 0 0 3.84-10.61",
};

// ─────────────────────────────────────────────────────────────────────────────
// SHAPE_PATHS
// ─────────────────────────────────────────────────────────────────────────────
export const SHAPE_PATHS = {

  // ── BASIC SHAPES (hand-crafted, already correct) ───────────────────────────
  circle: [
    samplePath('M 50 15 A 35 35 0 1 0 50 85 A 35 35 0 1 0 50 15', 60),
  ],
  square: [
    [{ x:20,y:20 },{ x:80,y:20 },{ x:80,y:80 },{ x:20,y:80 },{ x:20,y:20 }],
  ],
  triangle: [
    [{ x:50,y:12 },{ x:88,y:85 },{ x:12,y:85 },{ x:50,y:12 }],
  ],
  star: [
    [
      { x:50,y:10 },
      { x:61,y:35 },{ x:90,y:35 },
      { x:68,y:55 },{ x:79,y:82 },
      { x:50,y:65 },{ x:21,y:82 },
      { x:32,y:55 },{ x:10,y:35 },
      { x:39,y:35 },{ x:50,y:10 },
    ],
  ],
  heart: [
    samplePath('M 50 80 C 10 55 10 20 30 20 C 38 20 46 27 50 35 C 54 27 62 20 70 20 C 90 20 90 55 50 80 Z', 60),
  ],
  pentagon: [
    [
      { x:50,y:10 },{ x:88,y:38 },{ x:74,y:84 },
      { x:26,y:84 },{ x:12,y:38 },{ x:50,y:10 },
    ],
  ],
  diamond: [
    [{ x:50,y:10 },{ x:88,y:50 },{ x:50,y:90 },{ x:12,y:50 },{ x:50,y:10 }],
  ],
  arrow: [
    [
      { x:50,y:10 },{ x:85,y:50 },{ x:62,y:50 },
      { x:62,y:90 },{ x:38,y:90 },{ x:38,y:50 },
      { x:15,y:50 },{ x:50,y:10 },
    ],
  ],

  // ── FLOWERS & PLANTS ───────────────────────────────────────────────────────

  tulip: [
    // Tulip bloom (hand-crafted, already OK)
    samplePath('M 34 62 C 28 46 30 26 42 20 C 46 18 50 17 50 17 C 50 17 54 18 58 20 C 70 26 72 46 66 62 Z', 60),
    [{ x:50,y:62 },{ x:50,y:88 }],                          // stem
    samplePath('M 50 78 C 44 72 30 70 25 78', 20),           // left leaf
    samplePath('M 50 78 C 56 72 70 70 75 78', 20),           // right leaf
  ],

  leaf: [
    samplePath('M 50 12 C 76 28 84 52 76 70 C 68 88 50 90 50 90 C 50 90 32 88 24 70 C 16 52 24 28 50 12', 60),
    [{ x:50,y:12 },{ x:50,y:90 }],  // midrib
  ],

  // ── FRUITS ─────────────────────────────────────────────────────────────────
  apple: [
    sampleScaledPath(L.apple_body,  24, 70, 5),   // body – accurate Lucide apple
    sampleScaledPath(L.apple_stem,  24, 12, 5),   // stem
  ],

  banana: [
    // Lucide banana outer body (main visible shape)
    sampleScaledPath(L.banana2, 24, 70, 5),
  ],

  cherry: [
    sampleScaledPath(L.cherry1,    24, 35, 5),  // left cherry
    sampleScaledPath(L.cherry2,    24, 35, 5),  // right cherry
    sampleScaledPath(L.cherry_stem,24, 30, 5),  // stem
    sampleScaledPath(L.cherry_leaf,24, 25, 5),  // leaf
  ],

};

// ─────────────────────────────────────────────────────────────────────────────
// DISPLAY METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const SHAPE_META = {
  // Basic Shapes
  circle:    { name:'Circle',    emoji:'⭕', badge:'Round',    gradient:'linear-gradient(135deg,#6366f1,#818cf8)', shadow:'rgba(99,102,241,0.45)' },
  square:    { name:'Square',    emoji:'🟦', badge:'4 Sides',  gradient:'linear-gradient(135deg,#0ea5e9,#38bdf8)', shadow:'rgba(14,165,233,0.45)' },
  triangle:  { name:'Triangle',  emoji:'🔺', badge:'3 Sides',  gradient:'linear-gradient(135deg,#f43f5e,#fb7185)', shadow:'rgba(244,63,94,0.45)'  },
  star:      { name:'Star',      emoji:'⭐', badge:'5 Points', gradient:'linear-gradient(135deg,#f59e0b,#fbbf24)', shadow:'rgba(245,158,11,0.45)' },
  heart:     { name:'Heart',     emoji:'❤️', badge:'Love',     gradient:'linear-gradient(135deg,#ec4899,#f472b6)', shadow:'rgba(236,72,153,0.45)' },
  pentagon:  { name:'Pentagon',  emoji:'⬠', badge:'5 Sides',  gradient:'linear-gradient(135deg,#10b981,#34d399)', shadow:'rgba(16,185,129,0.45)' },
  diamond:   { name:'Diamond',   emoji:'💎', badge:'Gem',      gradient:'linear-gradient(135deg,#8b5cf6,#a78bfa)', shadow:'rgba(139,92,246,0.45)' },
  arrow:     { name:'Arrow',     emoji:'⬆️', badge:'Direction',gradient:'linear-gradient(135deg,#f97316,#fb923c)', shadow:'rgba(249,115,22,0.45)' },
  // Flowers & Plants
  tulip:     { name:'Tulip',     emoji:'🌷', badge:'Flower',   gradient:'linear-gradient(135deg,#ec4899,#f43f5e)', shadow:'rgba(236,72,153,0.45)' },
  leaf:      { name:'Leaf',      emoji:'🍃', badge:'Nature',   gradient:'linear-gradient(135deg,#16a34a,#4ade80)', shadow:'rgba(22,163,74,0.45)'  },
  // Fruits
  apple:     { name:'Apple',     emoji:'🍎', badge:'Fruit',    gradient:'linear-gradient(135deg,#dc2626,#f87171)', shadow:'rgba(220,38,38,0.45)'  },
  banana:    { name:'Banana',    emoji:'🍌', badge:'Fruit',    gradient:'linear-gradient(135deg,#ca8a04,#fde047)', shadow:'rgba(202,138,4,0.45)'  },
  cherry:    { name:'Cherry',    emoji:'🍒', badge:'Berry',    gradient:'linear-gradient(135deg,#be123c,#fb7185)', shadow:'rgba(190,18,60,0.45)'  },

};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES for the menu
// ─────────────────────────────────────────────────────────────────────────────
export const SHAPE_CATEGORIES = [
  { id:'basic',   label:'Basic Shapes',    emoji:'🔷', shapes:['circle','square','triangle','star','heart','pentagon','diamond','arrow'] },
  { id:'flowers', label:'Flowers & Plants',emoji:'🌸', shapes:['tulip','leaf'] },
  { id:'fruits',  label:'Fruits',          emoji:'🍎', shapes:['apple','banana','cherry'] },

];

export const SHAPE_ORDER = SHAPE_CATEGORIES.flatMap(c => c.shapes);
