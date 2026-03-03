/**
 * Reads the gradient background from each <em> inside `container`
 * and slices it across all descendant `.char` elements within each <em>.
 * If no <em> is found, this is a no-op.
 */
export default function applyEmGradient(container: HTMLElement): void {
  const ems = Array.from(container.querySelectorAll<HTMLElement>("em"));
  if (ems.length === 0) return;

  ems.forEach((em) => {
    // Read gradient from <em>
    const gradient = getComputedStyle(em).background;
    // Measure <em> dimensions and position
    const emRect = em.getBoundingClientRect();

    // Apply gradient slice to each char inside this <em>
    em.querySelectorAll<HTMLElement>(".char").forEach((charEl) => {
      charEl.style.background = gradient;
      charEl.style.backgroundClip = "text";
      charEl.style.webkitBackgroundClip = "text";
      charEl.style.webkitTextFillColor = "transparent";

      // Size background to full <em> bounds
      charEl.style.backgroundSize = `${emRect.width}px ${emRect.height}px`;

      // Offset background so each char shows its correct slice
      const charRect = charEl.getBoundingClientRect();
      const offsetX = charRect.left - emRect.left;
      const offsetY = charRect.top - emRect.top;
      charEl.style.backgroundPosition = `-${offsetX}px -${offsetY}px`;
    });
  });
}
