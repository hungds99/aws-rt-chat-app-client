import React from "react";
import "./style.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input className={`form-input ${className}`} ref={ref} {...props} />;
  },
);

export { Input };
