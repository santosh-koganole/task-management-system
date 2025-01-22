import { FC } from "react";

interface ButtonProps {
  className?: string; // Optional CSS classes
  label: string; // Required button label
  type?: "button" | "submit" | "reset"; // Valid button types
  onClick?: () => void; // Optional click handler
}

const Button: FC<ButtonProps> = ({
  className = "",
  label,
  type = "button",
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={`px-3 py-2 outline-none ${className}`}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
