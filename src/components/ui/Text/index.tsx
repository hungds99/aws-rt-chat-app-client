import './style.css';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const Text = ({ className, ...props }: TextProps) => {
  return <p className={`text ${className}`} {...props} />;
};

export { Text };
