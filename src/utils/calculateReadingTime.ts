export function calculateReadingTime(text: string) {
  if (!text) return;
  const wordsPerMinute = 200;
  const wordArray = text.trim().split(/\s+/);
  const readingTimeMinutes = Math.ceil(wordArray.length / wordsPerMinute);
  return `${readingTimeMinutes} min. de leitura`;
}