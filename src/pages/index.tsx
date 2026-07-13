import Layout from "@/components/common/Layout";
import WorkContainer from "@/components/works/WorkContainer";
import worksData from "@/lib/data/works.json";
import { ROUTES } from "@/lib/data/routes";
import { NextPage } from "next";

const TopPage: NextPage = () => {
  return (
    <Layout path={ROUTES.WORKS} title="WORKS">
      <div className="flex items-center justify-center pt-8 pb-16">
        <div className="flex items-start gap-[40px]">
          {worksData.map((work, i) => (
            <WorkContainer key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TopPage;
