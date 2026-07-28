import { FrameCache } from './FrameCache';
import { FrameLoader } from './FrameLoader';
import { PredictionEngine } from './PredictionEngine';

export class FrameManager {
  private cache: FrameCache;
  private loader: FrameLoader;
  private predictor: PredictionEngine;
  private readonly totalFrames: number;
  private onRenderRequired: (index: number) => void;
  private lastKnownIndex: number = 1;

  // Diagnostics
  private diagnostics = {
    evictionCount: 0,
    decodeTimes: [] as number[],
    cacheHits: 0,
    cacheMisses: 0
  };

  constructor(totalFrames: number, onRenderRequired: (index: number) => void) {
    this.totalFrames = totalFrames;
    this.onRenderRequired = onRenderRequired;
    
    this.cache = new FrameCache();
    this.predictor = new PredictionEngine(totalFrames);
    
    this.loader = new FrameLoader((index, img, decodeTime) => {
      this.cache.set(index, img);
      this.diagnostics.decodeTimes.push(decodeTime);
      if (this.diagnostics.decodeTimes.length > 50) this.diagnostics.decodeTimes.shift();
      this.onRenderRequired(index);
    });

    this.initVisibilityHandler();
    this.initDiagnostics();
  }

  private initVisibilityHandler() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.loader.isPaused = true;
        } else {
          this.loader.isPaused = false;
          this.loader.processQueue();
        }
      });
    }
  }

  private initDiagnostics() {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // @ts-expect-error global dev var
      window.__FRAME_DEBUG__ = () => {
        const avgDecode = this.diagnostics.decodeTimes.length ? 
          (this.diagnostics.decodeTimes.reduce((a,b)=>a+b,0) / this.diagnostics.decodeTimes.length).toFixed(1) : 0;
        console.table({
          'Frames In Memory': this.cache.getLoadedCount(),
          'Current Ahead Window': this.predictor.getCurrentAhead(),
          'Active Downloads': this.loader.getActiveCount(),
          'Queue Size': this.loader.getQueueSize(),
          'Eviction Count': this.diagnostics.evictionCount,
          'Avg Decode Time (ms)': avgDecode,
          'Cache Hits': this.diagnostics.cacheHits,
          'Cache Misses': this.diagnostics.cacheMisses,
        });
      };
    }
  }

  public async loadPriorityStartup(): Promise<void> {
    const startupPromises: Promise<void>[] = [];
    
    for (let i = 1; i <= 4; i++) {
      const url = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.webp`;
      const img = new Image();
      img.src = url;
      const start = performance.now();
      startupPromises.push(
        img.decode().then(() => {
          this.cache.set(i, img);
          this.diagnostics.decodeTimes.push(performance.now() - start);
          if (i === 1) this.onRenderRequired(1); 
        }).catch(e => console.error("Startup frame error:", e))
      );
    }
    await Promise.allSettled(startupPromises);
  }

  public onScrollUpdate(currentIndex: number): void {
    this.lastKnownIndex = currentIndex;
    
    this.predictor.updatePosition(currentIndex);
    const newQueue = this.predictor.predictQueue(currentIndex, (idx) => this.cache.has(idx));
    this.loader.setQueue(newQueue);

    // Defers memory eviction to idle time so it doesn't block GSAP's synchronous scroll thread
    if (typeof window.requestIdleCallback !== 'undefined') {
      window.requestIdleCallback(() => this.idleCleanup(currentIndex));
    } else {
      setTimeout(() => this.idleCleanup(currentIndex), 50);
    }
  }

  private idleCleanup(currentIndex: number) {
    if (this.loader.isPaused) return;
    const bounds = this.predictor.getWindowBounds(currentIndex);
    const preCount = this.cache.getLoadedCount();
    this.cache.evictOutsideWindow(bounds.min, bounds.max);
    this.diagnostics.evictionCount += (preCount - this.cache.getLoadedCount());
  }

  public getFrame(index: number): HTMLImageElement | null {
    if (this.cache.has(index)) {
      this.diagnostics.cacheHits++;
    } else {
      this.diagnostics.cacheMisses++;
    }
    return this.cache.getNearestFrame(index);
  }

  public getCacheSize(): number {
    return this.cache.getLoadedCount();
  }
}
