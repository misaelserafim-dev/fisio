export function createCaptionImg(
  img: HTMLImageElement
): HTMLImageElement | undefined {
  const alt = img.getAttribute("alt");
  const parent = img.parentElement;

  if (alt && parent && parent.tagName.toLowerCase() !== "figure") {
    const figure = document.createElement("figure");
    const caption = document.createElement("figcaption");
    caption.textContent = alt;

    img.replaceWith(figure);
    figure.appendChild(img);
    figure.appendChild(caption);

    return img;
  } else {
    if (parent && parent.tagName.toLowerCase() !== "figure") {
      const figure = document.createElement("figure");
      img.replaceWith(figure);
      figure.appendChild(img);
      return img;
    }
    return img;
  }
}
