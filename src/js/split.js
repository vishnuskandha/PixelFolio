/**
 * Minimal text splitter — wraps words or characters in masked spans
 * so they can be animated with GSAP (staggered, masked reveal).
 * No dependencies; keeps text selectable and semantics intact.
 */

function isWhitespaceOnly(text) {
  return /^\s+$/.test(text);
}

/** Split every text node of `el` into masked character spans. Returns inner spans. */
export function splitChars(el) {
  const inners = [];
  const nodes = [...el.childNodes];
  el.textContent = "";

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      words.forEach((word) => {
        if (!word) return;
        if (isWhitespaceOnly(word)) {
          el.appendChild(document.createTextNode(word));
          return;
        }
        const wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.setAttribute("aria-hidden", "false");
        [...word].forEach((char) => {
          const wrap = document.createElement("span");
          wrap.className = "split-char";
          const inner = document.createElement("span");
          inner.className = "split-char-inner";
          inner.textContent = char;
          wrap.appendChild(inner);
          wordSpan.appendChild(wrap);
          inners.push(inner);
        });
        el.appendChild(wordSpan);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      el.appendChild(node);
    }
  });

  return inners;
}

/** Split every text node of `el` into masked word spans. Returns inner spans. */
export function splitWords(el) {
  const inners = [];
  const nodes = [...el.childNodes];
  el.textContent = "";

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      words.forEach((word) => {
        if (!word) return;
        if (isWhitespaceOnly(word)) {
          el.appendChild(document.createTextNode(word));
          return;
        }
        const wrap = document.createElement("span");
        wrap.className = "split-line";
        const inner = document.createElement("span");
        inner.className = "split-inner";
        inner.textContent = word;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        inners.push(inner);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      el.appendChild(node);
    }
  });

  return inners;
}
