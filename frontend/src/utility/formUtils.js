import { validateField } from "./validation";

export const getFieldFeedback = (name, value, extra = {}) => {
  const isEmpty = !value || value.trim() === "";
  const isDirty = extra.dirty?.[name];

  if (isEmpty && isDirty) return "This field is required.";

  if (name === "confirmPassword") {
    if (value !== extra.password) {
      return "Passwords do not match.";
    }
    return null;
  }

  const isValid = validateField(name, value);
  if (isValid) return null;

  const messages = {
    firstName: "Must be between 2 and 100 characters.",
    lastName: "Must be between 2 and 100 characters.",
    userName: "Must be between 2 and 100 characters.",
    title: "Must be between 2 and 100 characters.",
    email: "Please enter a valid email address.",
    password: "Password must be at least 12 characters.",
    bio: "Bio must be between 10 and 255 characters.",
    location: "Location must be between 2 and 50 characters.",
    tags: "Please enter at least one tag.",
    content: "Content must be between 2 and 5000 characters.",
    comment: "Comment must be between 5 and 1000 characters.",
  };

  return messages[name] || "Invalid input.";
};
