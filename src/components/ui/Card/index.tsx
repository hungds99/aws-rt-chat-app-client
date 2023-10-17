import clsx from "clsx";
import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div className={clsx("card", className)} ref={ref} {...props}>
      {children}
    </div>
  ),
);

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className={clsx("card-header", className)} ref={ref} {...props}>
    {children}
  </div>
));

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className={clsx("card-content", className)} ref={ref} {...props}>
    {children}
  </div>
));

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className={clsx("card-footer", className)} ref={ref} {...props}>
    {children}
  </div>
));

export { Card, CardContent, CardFooter, CardHeader };
