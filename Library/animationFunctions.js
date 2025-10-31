export class Animation {
  
  constructor(duration, callBack, fillMode) {
    this.duration = duration;
    this.callBack = callBack;
    this.fillMode = fillMode;
    this.start = null;
    this.elapsed = 0;
    this.id = null;
    this.paused = false;
    this.pauseTime = null;

    // Bind the animate method to maintain 'this' context
    this.animate = this.animate.bind(this);
    
    //this.play();
  }

  animate(timestamp) {
    if (!this.start) this.start = timestamp || performance.now();
    if (this.paused) return;

    const currentTime = timestamp || performance.now();
    this.elapsed = (currentTime - this.start) / 1000;
    
    const t = Math.min(this.elapsed / this.duration, 1);
    this.callBack(t);
    
    if (t < 1) {
      this.id = requestAnimationFrame(this.animate);
    } else if (this.fillMode === 'loop') {
      this.start = performance.now(); // Reset for loop
      this.id = requestAnimationFrame(this.animate);
    }
  }

  pause() {
    if (this.id && !this.paused) {
      this.paused = true;
      this.pauseTime = performance.now();
      cancelAnimationFrame(this.id);
    }
  }

  play() {
    if (this.paused) {
      // Adjust start time to account for pause duration
      const pauseDuration = performance.now() - this.pauseTime;
      this.start += pauseDuration;
      this.paused = false;
      this.pauseTime = null;
    }
    this.id = requestAnimationFrame(this.animate);
  }

  stop() {
    this.pause();
    this.start = null;
    this.elapsed = 0;
  }

  reset() {
    this.stop();
    this.callBack(0); // Reset to initial state
  }
}

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

export function easeInOutExpo(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
};