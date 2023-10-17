import clsx from "clsx";
import React from "react";
import "./style.css";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => (
    <div
      className={clsx("divider", className)}
      ref={ref}
      role="separator"
      {...props}
    />
  ),
);

export { Divider };
