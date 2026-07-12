import Layout from "@/components/common/Layout";
import Container from "@/components/common/parts/Container";
import WorkCard from "@/components/works/WorkCard";
import { useWorks } from "@/hooks/works/useWorks";
import { ROUTES } from "@/lib/data/routes";
import { NextPage } from "next";

const TopPage: NextPage = () => {
  const { works } = useWorks();

  return (
    <Layout path={ROUTES.WORKS} title="WORKS">
      <Container maxWidth="max-w-7xl flex justify-center">
        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {works.map((work) => (
            <div key={work.id} className="mt-4 break-inside-avoid">
              <WorkCard work={work} />
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default TopPage;
