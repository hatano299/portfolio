import Container from "@/components/common/parts/Container";

type Props = {
  title: string;
};

const Header = (props: Props): React.ReactElement => {
  const { title } = props;

  return (
    <header className="relative py-4">
      <Container className="flex">
        <h3 className="text-3xl font-bold text-[#AAAAAA] opacity-25">{title}</h3>
      </Container>
    </header>
  );
};

export default Header;
