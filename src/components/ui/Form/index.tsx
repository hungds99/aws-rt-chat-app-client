import React from "react";
import { Label } from "../Label";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form className={`form ${className}`} ref={ref} {...props} />
  ),
);

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, children, ...props }, ref) => (
    <div className={`form-item ${className}`} ref={ref} {...props} />
  ),
);

export interface FormLabelProps
  extends React.HTMLAttributes<HTMLLabelElement> {}
const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <Label className={`form-label ${className}`} ref={ref} {...props} />
  ),
);

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => (
    <div className={`form-control ${className}`} ref={ref} {...props} />
  ),
);

export { Form, FormControl, FormItem, FormLabel };
