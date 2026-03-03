import { useState } from "react";

export function useClipboard() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipUrl, setTooltipUrl] = useState("");

  function handleCopyAndShowTooltip(event: MouseEvent, copyUrl: boolean) {
    event.preventDefault();
    if (copyUrl) {
      const url = window.location.href;
      if (url) {
        const textToCopy = url;
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            setTooltipUrl(url);
          })
          .catch((err) => {
            console.error("Erro ao copiar para a área de transferência:", err);
          });
      }
    }
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 3000);
  }

  return { handleCopyAndShowTooltip, isTooltipVisible, tooltipUrl };
}
