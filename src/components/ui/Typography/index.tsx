import clsx from 'clsx';
import { createElement } from 'react';
import './style.css';

export interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  as: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Typography = ({
  as,
  className,
  color,
  size,
  children,
  ...rest
}: TypographyProps) => {
  return createElement(
    as,
    Object.assign(
      {
        className: clsx(
          'typography',
          {
            [`text-${size}`]: size,
            [`text-${color}`]: color
          },
          className
        )
      },
      rest
    ),
    children
  );
};

export { Typography };
