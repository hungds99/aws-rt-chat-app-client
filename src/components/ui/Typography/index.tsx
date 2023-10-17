import clsx from "clsx";
import { createElement } from "react";
import "./style.css";

export interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  as: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5";
}

const Typography = ({ as, className, children, ...rest }: TypographyProps) => {
  return createElement(
    as,
    Object.assign(
      {
        className: clsx("typography", className),
      },
      rest,
    ),
    children,
  );
};

export { Typography };
