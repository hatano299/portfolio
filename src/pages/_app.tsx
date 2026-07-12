import "@/styles/globals.css";
import { Noto_Serif_JP } from "next/font/google";
import type { AppProps } from "next/app";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <div className={notoSerifJP.variable}>
      <Component {...pageProps} />
    </div>
  );
}
