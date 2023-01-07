import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Center } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { useMyAccount } from "../hooks/logic/useMyAccount";
import { MainComponent } from "../components/layout/mainComponent";
import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import ColorAssets from "../constants/colorAssets";

function MyApp({ Component, pageProps }: AppProps) {
  const [isShowLoading, setIsShowLoading] = useState(false);
  const { user } = useMyAccount();

  useEffect(() => {
    setTimeout(() => {
      setIsShowLoading(true);
    }, 1000);
  });

  return (
    <RecoilRoot>
      <ChakraProvider>
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
              color={ColorAssets.entechMainBlue}
              ariaLabel="line-wave"
              visible={true}
            />
          </Center>
        )}
      </ChakraProvider>
    </RecoilRoot>
  );
}
export default MyApp;
