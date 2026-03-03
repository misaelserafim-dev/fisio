import { useEffect, useRef } from "react";
import applyEmGradient from "@/utils/applyGradient";

/**
 * Splits the text content of an element into word- and char-wrapped spans.
 * @param target  The HTMLElement whose text you want to split.
 */
function splittingWords(target: HTMLElement) {
  // Read original HTML and build a temporary container
  const original = Array.from(target.childNodes);
  // Compute totals across all text characters
  let wordCount = 0;
  let charCount = 0;
  original.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const trimmed = text.trim();
      if (!trimmed) return;
      const words = trimmed.split(/\s+/);
      wordCount += words.length;
      words.forEach((w) => (charCount += Array.from(w).length));
    }
  });
  // Prepare target
  target.innerHTML = "";
  target.dataset.splitting = "";
  target.classList.add("words", "chars", "splitting");
  target.style.setProperty("--word-total", String(wordCount));
  target.style.setProperty("--char-total", String(charCount));

  let globalCharIdx = 0;
  let globalWordIdx = 0;

  // Recursive function to process nodes
  function processNode(node: ChildNode, container: DocumentFragment | HTMLElement) {
    if (node.nodeType === Node.TEXT_NODE) {
      const rawText = node.textContent || "";
      const tokens = rawText.match(/(\S+|\s+)/g);
      if (!tokens) return;

      tokens.forEach((token) => {
        if (/^\s+$/.test(token)) {
          // whitespace token: preserve each space/newline
          token.split("").forEach((ch) => {
            const ws = document.createElement("span");
            ws.className = "whitespace";
            ws.textContent = ch;
            container.appendChild(ws);
          });
        } else {
          // non-whitespace token: treat as single word
          const wordSpan = document.createElement("span");
          wordSpan.className = "word";
          wordSpan.dataset.word = token;
          wordSpan.style.setProperty("--word-index", String(globalWordIdx++));
          // split into characters
          Array.from(token).forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = "char";
            charSpan.dataset.char = char;
            charSpan.textContent = char;
            charSpan.style.setProperty("--char-index", String(globalCharIdx++));
            wordSpan.appendChild(charSpan);
          });
          container.appendChild(wordSpan);
        }
      });
      return;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = document.createElement((node as HTMLElement).tagName);
      // Copy attributes
      Array.from((node as HTMLElement).attributes).forEach((attr) => {
        el.setAttribute(attr.name, attr.value);
      });
      // Process child nodes recursively
      Array.from(node.childNodes).forEach((child) => {
        processNode(child, el);
      });
      container.appendChild(el);
    }
  }

  const frag = document.createDocumentFragment();
  original.forEach((node) => processNode(node, frag));
  target.appendChild(frag);
}

export default function useSplitting({ gradient = false }: { gradient?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      splittingWords(ref.current);
      gradient && applyEmGradient(ref.current);
    }
  }, []);

  return ref;
}
