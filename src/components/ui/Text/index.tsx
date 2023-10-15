import './style.css';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const Text = ({ className, children, ...props }: TextProps) => {
  return (
    <p className={`text ${className}`} {...props}>
      {children}
    </p>
  );
};

export { Text };
