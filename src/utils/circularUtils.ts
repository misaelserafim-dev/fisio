export function lerp(start: number, stop: number, amt: number): number {
  return (1 - amt) * start + amt * stop;
}
