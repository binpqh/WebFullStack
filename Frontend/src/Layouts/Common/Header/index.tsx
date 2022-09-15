interface Props {
  content: string;
}

const Header: React.FC<Props> = (props) => {
  return <div>This is Header {props.content}</div>;
};

export default Header;
