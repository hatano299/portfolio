import Layout from "@/components/common/Layout";
import { ROUTES } from "@/lib/data/routes";
import { NextPage } from "next";

const AboutPage: NextPage = () => {
  return (
    <Layout path={ROUTES.ABOUT} title="about hatano">
      <div className="mx-auto max-w-xl px-6 pb-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mb-12 h-36 w-36 rounded-full" src="/favicon/apple-touch-icon.png" alt="" />
        <div className="mb-12">
          <h1 className="text-2xl font-semibold mb-2">Yota Hatano</h1>
          <ul className="text-card-body space-y-1">
            <li>エンジニア</li>
            <li>山口県出身</li>
            <li>朝活とサウナがすき</li>
          </ul>
        </div>
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">経歴</h2>
          <ul className="text-card-body space-y-1">
            <li>2025 ウェルスナビ株式会社 入社</li>
            <li>2024 九州大学 農学部 卒業</li>
            <li>2024 基本情報技術者</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">目標</h2>
          <p className="text-card-body">1万人が使用するサービスの開発</p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
