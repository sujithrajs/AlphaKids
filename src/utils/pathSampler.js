/**
 * samplers.js - High-Precision SVG Path Sampling
 * This uses a hidden SVG path element to sample points at exactly equal distances.
 */

export const samplePath = (svgPathData, numPoints = 100) => {
  // Create a temporary SVG path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", svgPathData);
  
  const totalLength = path.getTotalLength();
  const points = [];
  
  for (let i = 0; i < numPoints; i++) {
    const length = (i / (numPoints - 1)) * totalLength;
    const { x, y } = path.getPointAtLength(length);
    points.push({ 
      x: parseFloat(x.toFixed(2)), 
      y: parseFloat(y.toFixed(2)) 
    });
  }
  
  return points;
};

// Common SVG Paths for Fredoka One Style (on a 100x100 grid)
export const PRO_GLYPHS = {
  S: "M 75 30 C 75 12 25 12 25 35 C 25 50 75 50 75 65 C 75 88 25 88 25 70",
  G: "M 80 35 C 80 15 20 15 20 50 C 20 85 80 85 80 65 L 80 50 L 55 50",
  B_STEM: "M 28 15 L 28 85",
  B_TOP: "M 28 15 C 65 15 65 50 28 50",
  B_BOTTOM: "M 28 50 C 75 50 75 85 28 85",
  O: "M 50 15 A 35 35 0 1 0 50 85 A 35 35 0 1 0 50 15",
  C: "M 80 30 A 35 35 0 1 0 80 70"
};
