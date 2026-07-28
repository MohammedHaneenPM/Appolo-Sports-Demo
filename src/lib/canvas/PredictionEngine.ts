/**
 * PredictionEngine.ts
 * Calculates scroll velocity, direction, and dynamically predicts the next frames
 * to download based on a sliding window.
 */

export class PredictionEngine {
  private lastIndex: number = 1;
  private lastTime: number = performance.now();
  private velocity: number = 0; // frames per ms
  private acceleration: number = 0; // rate of change of velocity

  // Dynamic window sizing
  private currentAhead: number = 15;
  private readonly totalFrames: number;

  constructor(totalFrames: number) {
    this.totalFrames = totalFrames;
  }

  public updatePosition(currentIndex: number): void {
    const now = performance.now();
    const dt = now - this.lastTime;
    
    if (dt > 0) {
      const dx = currentIndex - this.lastIndex;
      const instantaneousVelocity = dx / dt;
      
      const newVelocity = (this.velocity * 0.7) + (instantaneousVelocity * 0.3);
      this.acceleration = (newVelocity - this.velocity) / dt;
      this.velocity = newVelocity;
    }
    
    this.lastTime = now;
    this.lastIndex = currentIndex;

    // Adapt window size: base 15, max 60 based on velocity and acceleration
    const speed = Math.abs(this.velocity);
    const accelSpeed = Math.max(0, Math.abs(this.acceleration) * 100);
    
    // Smoothly scale CACHE_AHEAD based on movement metrics
    const targetAhead = 15 + (speed * 400) + (accelSpeed * 100);
    this.currentAhead = Math.min(60, Math.max(15, Math.floor(targetAhead)));
  }

  public predictQueue(currentIndex: number, loadedCheck: (idx: number) => boolean): number[] {
    const queue: number[] = [];
    const isScrollingDown = this.velocity >= 0; // Default down
    
    // Priority 1: Current frame
    if (!loadedCheck(currentIndex)) {
      queue.push(currentIndex);
    }

    // Priority 2: Immediate lookahead (next 3 frames)
    const step = isScrollingDown ? 1 : -1;
    for (let i = 1; i <= 3; i++) {
      const idx = currentIndex + (i * step);
      if (idx >= 1 && idx <= this.totalFrames && !loadedCheck(idx)) {
        queue.push(idx);
      }
    }

    // Priority 3: Extended lookahead
    const end = isScrollingDown ? currentIndex + this.currentAhead : currentIndex - this.currentAhead;
    const extendedStart = isScrollingDown ? currentIndex + 4 : currentIndex - 4;
    
    for (let i = extendedStart; isScrollingDown ? i <= end : i >= end; i += step) {
      if (i >= 1 && i <= this.totalFrames && !loadedCheck(i) && !queue.includes(i)) {
        queue.push(i);
      }
    }

    // Priority 4: Small reverse buffer
    const reverseBuffer = 10;
    const revStart = isScrollingDown ? currentIndex - 1 : currentIndex + 1;
    const revStep = isScrollingDown ? -1 : 1;
    const revEnd = isScrollingDown ? currentIndex - reverseBuffer : currentIndex + reverseBuffer;

    for (let i = revStart; isScrollingDown ? i >= revEnd : i <= revEnd; i += revStep) {
      if (i >= 1 && i <= this.totalFrames && !loadedCheck(i) && !queue.includes(i)) {
        queue.push(i);
      }
    }

    return queue;
  }

  public getWindowBounds(currentIndex: number): { min: number; max: number } {
    const buffer = Math.max(this.currentAhead, 20); 
    return {
      min: currentIndex - buffer,
      max: currentIndex + buffer
    };
  }

  public getCurrentAhead(): number {
    return this.currentAhead;
  }
}
