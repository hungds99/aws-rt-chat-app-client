import clsx from 'clsx';
import React from 'react';
import './style.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button className={clsx('btn', className)} ref={ref} {...props} />;
  }
);

export { Button };
