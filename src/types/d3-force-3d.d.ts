/**
 * Minimal declarations for d3-force-3d, which ships no types.
 * Only the pieces this project uses.
 */
declare module 'd3-force-3d' {
  export interface CollideForce {
    (alpha: number): void
    radius(r: number | ((node: unknown) => number)): CollideForce
    strength(s: number): CollideForce
    iterations(n: number): CollideForce
  }
  export function forceCollide(
    radius?: number | ((node: unknown) => number),
  ): CollideForce

  export interface PositionForce {
    (alpha: number): void
    strength(s: number | ((node: unknown) => number)): PositionForce
    y(y: number | ((node: unknown) => number)): PositionForce
  }
  export function forceY(
    y?: number | ((node: unknown) => number),
  ): PositionForce
}
