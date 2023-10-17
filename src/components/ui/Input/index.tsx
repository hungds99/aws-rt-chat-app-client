import clsx from "clsx";
import React from "react";
import "./style.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input className={clsx("input", className)} ref={ref} {...props} />
  ),
);

export { Input };
