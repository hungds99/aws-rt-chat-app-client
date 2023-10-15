import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={`card ${className}`} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

export { Card };
