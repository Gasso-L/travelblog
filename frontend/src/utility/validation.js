import { sanitizeContent } from "./sanitizeContent";
export const validateField = (name, value) => {
  switch (name) {
    case "firstName":
    case "lastName":
      return (
        typeof value === "string" &&
        value.trim().length >= 2 &&
        value.trim().length <= 100
      );

    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    case "password":
      return value.length >= 12;

    case "bio":
      return value.length >= 10 && value.length <= 255;

    case "title":
      return (
        typeof value === "string" &&
        value.trim().length >= 2 &&
        value.trim().length <= 100
      );

    case "location":
      return (
        typeof value === "string" &&
        value.trim().length >= 2 &&
        value.trim().length <= 50
      );

    case "tags":
      if (!value || typeof value !== "string") return false;
      const tagsArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      return tagsArray.length >= 1;

    case "content":
      const clean = sanitizeContent(value);
      return (
        typeof clean === "string" &&
        clean.trim().length >= 2 &&
        clean.trim().length <= 5000
      );

    case "comment":
      return (
        typeof value === "string" &&
        value.trim().length >= 5 &&
        value.trim().length <= 1000
      );

    default:
      return true;
  }
};
