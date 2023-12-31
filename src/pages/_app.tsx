import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Center, extendTheme } from "@chakra-ui/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useMyAccount } from "../hooks/logic/useMyAccount";
import { MainComponent } from "../components/layout/mainComponent";
import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import Head from "next/head";
import * as gtag from "lib/gtag";
import { GaScript } from "lib/GaScript";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [isShowLoading, setIsShowLoading] = useState(false);
  const { user } = useMyAccount();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsShowLoading(true);
    }, 1000);
  });

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap"
          rel="stylesheet"
        />
      </Head>
      <RecoilRoot>
        <ChakraProvider
          theme={extendTheme({
            fonts: {
              body: "Share Tech, sans-serif;",
            },
          })}
        >
          <GaScript />
          {isShowLoading ? (
            <MainComponent
              Component={Component}
              pageProps={pageProps}
              user={user}
            />
          ) : (
            <Center mt={"30vh"} ml={"12vw"}>
              <LineWave
                height="200"
                width="200"
                color={"#17949D"}
                ariaLabel="line-wave"
                visible={true}
              />
            </Center>
          )}
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
export default MyApp;
