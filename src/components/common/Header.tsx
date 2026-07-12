type Props = {
  title: string;
};

const Header = (props: Props): React.ReactElement => {
  const { title } = props;

  return (
    <header className="pt-8 pb-14 flex justify-center">
      <p className="text-display">{title}</p>
    </header>
  );
};

export default Header;
