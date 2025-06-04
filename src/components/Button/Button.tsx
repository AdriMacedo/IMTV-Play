import type { ReactNode } from "react";
import "./Button.scss";

interface ButtonProps {
  children: ReactNode;
  variant: "home" | "movies" | "tv";
  active?: boolean;
}

function Button({ children, variant, active = false }: ButtonProps) {
  return (
    <button className={`btn ${variant} ${active ? "active" : ""}`}>
      {children}
    </button>
  );
}

export default Button;
