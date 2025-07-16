import sanitizeHtml from "sanitize-html";

export const sanitizeContent = (html) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(
      (tag) => tag !== "script"
    ),
    allowedAttributes: false,
  });
};
