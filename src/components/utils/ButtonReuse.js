import { Button } from 'react-bootstrap';

const ButtonReuse = (props) => {
  const { variant, type, style, block, className, onClick, name,disabled } = props;
  return (
    <Button
      className={`${className} shadow-none`}
      name={name}
      variant={variant}
      type={type}
      style={style}
      block={block}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
    </Button>
  );
};

export default ButtonReuse;
