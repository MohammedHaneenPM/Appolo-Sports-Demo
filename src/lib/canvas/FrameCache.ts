/**
 * FrameCache.ts
 * Manages the memory storage of decoded frames, handles intelligent eviction,
 * and provides O(log N) nearest-frame binary search fallback.
 */

export class FrameCache {
  private cache: Map<number, HTMLImageElement>;
  // Maintain a sorted array of loaded indices for O(log N) binary search
  private loadedIndices: number[];

  constructor() {
    this.cache = new Map();
    this.loadedIndices = [];
  }

  public set(index: number, img: HTMLImageElement): void {
    if (!this.cache.has(index)) {
      this.cache.set(index, img);
      
      // Binary insert to keep loadedIndices sorted
      const insertPos = this.binarySearchInsertPosition(index);
      this.loadedIndices.splice(insertPos, 0, index);
    }
  }

  public get(index: number): HTMLImageElement | undefined {
    return this.cache.get(index);
  }

  public has(index: number): boolean {
    return this.cache.has(index);
  }

  /**
   * O(log N) search for the nearest available frame if the requested one isn't loaded.
   */
  public getNearestFrame(index: number): HTMLImageElement | null {
    if (this.loadedIndices.length === 0) return null;
    
    // Exact match
    if (this.cache.has(index)) return this.cache.get(index)!;

    // Binary search for closest
    let low = 0;
    let high = this.loadedIndices.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (this.loadedIndices[mid] === index) {
        return this.cache.get(index)!; // Should be caught by exact match above
      } else if (this.loadedIndices[mid] < index) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Now low is the insertion point. The closest is either low or low - 1.
    const cand1 = this.loadedIndices[Math.min(low, this.loadedIndices.length - 1)];
    const cand2 = this.loadedIndices[Math.max(low - 1, 0)];

    const diff1 = Math.abs(cand1 - index);
    const diff2 = Math.abs(cand2 - index);

    const bestIndex = diff1 < diff2 ? cand1 : cand2;
    return this.cache.get(bestIndex) || null;
  }

  /**
   * Evicts frames outside the dynamic sliding window to prevent memory leaks.
   */
  public evictOutsideWindow(minIdx: number, maxIdx: number): void {
    const indicesToRemove: number[] = [];
    
    for (const idx of this.loadedIndices) {
      if (idx < minIdx || idx > maxIdx) {
        indicesToRemove.push(idx);
      }
    }

    if (indicesToRemove.length === 0) return;

    // Remove from cache and aggressively nullify to aid GC
    for (const idx of indicesToRemove) {
      const img = this.cache.get(idx);
      if (img) {
        img.src = ""; // Clear src to stop any rogue loading and release memory faster
      }
      this.cache.delete(idx);
    }

    // Filter loadedIndices
    this.loadedIndices = this.loadedIndices.filter(
      (idx) => idx >= minIdx && idx <= maxIdx
    );
  }

  private binarySearchInsertPosition(value: number): number {
    let low = 0;
    let high = this.loadedIndices.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (this.loadedIndices[mid] === value) return mid;
      if (this.loadedIndices[mid] < value) low = mid + 1;
      else high = mid - 1;
    }
    return low;
  }

  public getLoadedCount(): number {
    return this.loadedIndices.length;
  }
}
