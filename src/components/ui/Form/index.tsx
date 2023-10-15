import React from 'react';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
const Form = ({ className, children, ...props }: FormProps) => (
  <form className={`form ${className}`} {...props}>
    {children}
  </form>
);

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}
const FormItem = ({ className, children, ...props }: FormItemProps) => (
  <div className={`form-item ${className}`} {...props}>
    {children}
  </div>
);

export { Form, FormItem };
