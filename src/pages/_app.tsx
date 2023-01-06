import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { Layout } from "../components/layout/layout";
import { useMyAccount } from "../hooks/logic/useMyAccount";

function MyApp({ Component, pageProps }: AppProps) {
  //Todo Loginしてたら直接TimeLineへ飛ばす。
  //Accountをフェッチして、あったらrecoil使って保存

  const { user } = useMyAccount();
  console.log(user);

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
