import "server-only";

import sanitizeHtml from "sanitize-html";

// Corps de leçon saisi par l'admin : liste blanche stricte (balises de mise en forme, liens
// http(s), images https). Tout le reste (scripts, gestionnaires on*, styles, iframes) disparaît.

const LESSON_CLASSES = ["callout", "callout-title", "example", "formula", "frac"];

export function sanitizeLessonHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2", "h3", "h4", "p", "br", "hr", "strong", "em", "b", "i", "u", "sub", "sup", "span", "div",
      "ul", "ol", "li", "blockquote", "code", "pre", "table", "thead", "tbody", "tr", "th", "td",
      "caption", "figure", "figcaption", "img", "a",
    ],
    allowedAttributes: {
      a: ["href", "title", "rel"],
      img: ["src", "alt", "width", "height"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
      "*": ["class"],
    },
    allowedClasses: { "*": LESSON_CLASSES },
    allowedSchemes: ["https", "http"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true) },
  });
}
