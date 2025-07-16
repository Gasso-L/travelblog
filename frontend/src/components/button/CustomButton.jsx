import Button from "react-bootstrap/Button";
import "./custombutton.css";

const CustomButton = ({
  variant = "accent",
  disabled = false,
  icon = null,
  children,
  className = "",
  ...props
}) => {
  const baseClass = {
    accent: "btn-accent",
    outline: "btn-outline-accent",
    ghost: "btn-ghost-accent",
    transparent: "btn-transparent",
    danger: "btn-danger",
    "outline-danger": "btn-outline-danger",
  }[variant];

  return (
    <Button
      className={`${baseClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
