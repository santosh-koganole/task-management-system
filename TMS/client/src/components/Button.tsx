import { FC, ReactNode } from "react";

interface ButtonProps {
  className?: string; // Optional CSS classes
  label?: string; // Required button label
  type?: "button" | "submit" | "reset"; // Valid button types
  icon?: ReactNode;
  onClick?: () => void; // Optional click handler
}

const Button: FC<ButtonProps> = ({
  className = "",
  label,
  type = "button",
  icon,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={`px-3 py-2 outline-none ${className}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
