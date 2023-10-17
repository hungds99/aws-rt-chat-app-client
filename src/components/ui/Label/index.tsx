import clsx from "clsx";
import React from "react";
import "./style.css";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label className={clsx("label", className)} ref={ref} {...props} />
  ),
);

export { Label };
