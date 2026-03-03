type MouseFollowerHandlers = {
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function useMouseFollower(
  containerRef: React.RefObject<HTMLElement>,
  followerRef: React.RefObject<HTMLElement>
): MouseFollowerHandlers {
  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const follower = followerRef.current;
    if (!container || !follower) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    follower.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  const handleMouseEnter = () => {
    const follower = followerRef.current;
    if (!follower) return;
    follower.classList.add(`active`);
  };

  const handleMouseLeave = () => {
    const follower = followerRef.current;
    if (!follower) return;
    follower.classList.remove(`active`);
  };

  return {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };
}
