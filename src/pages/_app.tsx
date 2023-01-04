import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { Layout } from "../components/layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
  //Todo Loginしてたら直接TimeLineへ飛ばす。
  //Accountをフェッチして、あったらrecoil使って保存
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
export default MyApp;
