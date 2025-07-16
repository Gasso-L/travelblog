const sanitizeHtml = require("sanitize-html");

const sanitizeContent = (html) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(
      (tag) => tag !== "script"
    ),
    allowedAttributes: false,
  });
};

module.exports = { sanitizeContent };
