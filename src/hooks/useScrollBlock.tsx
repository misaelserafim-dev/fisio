import { useEffect } from "react";

/**
 * Custom hook to block scrolling when triggered.
 *
 * @param {boolean} action - Flag to control whether scrolling should be blocked.
 */
function useBlockScroll(action: boolean) {
  useEffect(() => {
    if (action) {
      // Function to prevent scrolling
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };
      // Add event listeners to block scroll actions
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });

      // Cleanup function to remove event listeners when action changes or component unmounts
      return () => {
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
      };
    } else {
      // Ensure previous scroll blocking event listeners are removed
      return () => {
        document.removeEventListener("wheel", (e: Event) => e.preventDefault());
        document.removeEventListener("touchmove", (e: Event) =>
          e.preventDefault()
        );
      };
    }
  }, [action]);
}

export default useBlockScroll;
