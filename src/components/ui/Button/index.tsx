import React from "react";
import "./style.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button className={`btn ${className}`} ref={ref} {...props} />;
  },
);

export { Button };
