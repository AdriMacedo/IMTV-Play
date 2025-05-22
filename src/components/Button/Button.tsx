import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant: "home" | "movies" | "tv" ;
};

function Button ({children, variant}: ButtonProps) {
    return (
        <button className={`btn ${variant}`}>{children}</button>
    );
};

export default Button;