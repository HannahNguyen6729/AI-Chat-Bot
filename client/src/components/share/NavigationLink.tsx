import { Link } from 'react-router-dom';

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  const { bg, textColor } = props;

  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ background: bg, color: textColor }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
