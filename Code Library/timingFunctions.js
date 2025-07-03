export function easeInQuad(t) {
  return t * t;
};

export function easeOutQuad(t) {
  return t * (2 - t);
};

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export function easeInCubic(t) {
  return t * t * t;
};

export function easeOutCubic(t) {
  return (--t) * t * t + 1;
};

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export function easeInSine(t) {
  return 1 - Math.cos(t * Math.PI / 2);
};

export function easeOutSine(t) {
  return Math.sin(t * Math.PI / 2);
};

export function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};

export function easeInExpo(t) {
  return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
};

export function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

function easeInOutExpo(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
};