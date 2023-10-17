import clsx from 'clsx';
import React from 'react';
import './style.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      className={clsx('input', { 'input-error': error })}
      ref={ref}
      {...props}
    />
  )
);

export { Input };
