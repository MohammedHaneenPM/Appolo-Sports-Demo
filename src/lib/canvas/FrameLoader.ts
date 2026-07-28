/**
 * FrameLoader.ts
 * Manages concurrent network requests and off-main-thread image decoding.
 */

export class FrameLoader {
  private activeDownloads: Set<number> = new Set();
  private readonly maxConcurrent: number;
  private queue: number[] = [];
  public isPaused: boolean = false;
  
  // Callback to execute when a frame finishes loading
  private onFrameLoaded: (index: number, img: HTMLImageElement, decodeTime: number) => void;

  constructor(onFrameLoaded: (index: number, img: HTMLImageElement, decodeTime: number) => void) {
    this.maxConcurrent = this.calculateOptimalConcurrency();
    this.onFrameLoaded = onFrameLoaded;
  }

  /**
   * Adapts automatically based on network speed, device memory, and hardware threads.
   */
  private calculateOptimalConcurrency(): number {
    if (typeof navigator === 'undefined') return 4;
    
    let concurrency = 4;
    const cores = navigator.hardwareConcurrency || 4;
    // @ts-expect-error deviceMemory is non-standard
    const memory = navigator.deviceMemory || 4;
    // @ts-expect-error connection is non-standard
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const type = connection?.effectiveType || '4g';
    
    if (type === '4g' && cores >= 8 && memory >= 8) {
      concurrency = 6; // High-end desktop
    } else if (type === '3g' || cores <= 4 || memory <= 4) {
      concurrency = 2; // Low-end phone or slow network
    } else if (type === '2g' || type === 'slow-2g') {
      concurrency = 1;
    }
    
    return Math.max(1, Math.min(concurrency, 8));
  }

  /**
   * Replaces the entire queue with a new prioritized list of frames.
   */
  public setQueue(prioritizedIndices: number[]): void {
    if (this.isPaused) return;
    // Filter out indices that are already downloading to prevent duplicates
    this.queue = prioritizedIndices.filter(idx => !this.activeDownloads.has(idx));
    this.processQueue();
  }

  private async decodeImage(url: string): Promise<{img: HTMLImageElement, time: number}> {
    const start = performance.now();
    const img = new Image();
    img.src = url;
    // img.decode() forces the browser to decode the image off the main thread.
    await img.decode(); 
    return { img, time: performance.now() - start };
  }

  public processQueue(): void {
    if (this.isPaused || this.queue.length === 0 || this.activeDownloads.size >= this.maxConcurrent) {
      return;
    }

    const index = this.queue.shift()!;
    this.activeDownloads.add(index);

    const url = `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;

    this.decodeImage(url)
      .then(({img, time}) => {
        if (!this.isPaused) {
          this.onFrameLoaded(index, img, time);
        }
      })
      .catch((err) => {
        console.error(`Failed to load frame ${index}:`, err);
      })
      .finally(() => {
        this.activeDownloads.delete(index);
        if (!this.isPaused) {
          this.processQueue(); // Automatically pull the next item
        }
      });

    // Recursively fill available concurrency slots
    this.processQueue();
  }

  public getActiveCount(): number {
    return this.activeDownloads.size;
  }
  
  public getQueueSize(): number {
    return this.queue.length;
  }
}
