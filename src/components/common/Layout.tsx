import NextHeadSeo from "next-head-seo";
import { APP_DEFAULT_DESCRIPTION, APP_NAME, APP_ROOT_URL } from "@/lib/data/metaData";
import Header from "@/components/common/Header";

/**
 * Propsについて
 * @param path                - [必須]ページの相対パス。
 * @param title               - [必須]ページのタイトル。
 * @param description         - ページの説明。省略した場合、`APP_DEFAULT_DESCRIPTION`が設定される。
 * @param noindex             - ページを noindex にする場合、`true`を渡す。公開しない管理者ページなどを noindex にする。
 * @param titleOnlyTemplate   - ページタイトルのみを表示する場合、`true`を渡す。省略した場合、ページタイトルは`title`|`APP_NAME`になる。
 * @param children            - [必須]子要素
 */

type PublicLayoutProps = {
  path: string;
  title: string;
  description?: string;
  noindex?: boolean;
  titleOnlyTemplate?: boolean;
  children: React.ReactNode;
};

const Layout = ({
  path,
  title,
  description = APP_DEFAULT_DESCRIPTION,
  noindex,
  titleOnlyTemplate,
  children,
}: PublicLayoutProps): React.ReactElement => {
  // ページの絶対パス
  const pageUrl = APP_ROOT_URL + path;

  return (
    <>
      <NextHeadSeo
        title={titleOnlyTemplate ? title : `${title} | ${APP_NAME}`}
        canonical={pageUrl}
        description={description}
        robots={noindex ? "noindex nofollow" : undefined}
        og={{
          title,
          description,
          url: pageUrl,
          type: "website",
          siteName: APP_NAME,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Header title={title}/>
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default Layout;
