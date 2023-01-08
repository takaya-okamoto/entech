import { NextComponentType } from "next";
import { AppProps } from "next/app";
import { User } from "@firebase/auth";
import { Layout } from "./layout";
import LoginBeforeTop from "../../pages/loginBeforeTop";

type Props = {
  Component: NextComponentType;
  pageProps: AppProps["pageProps"];
  user: User | null;
};

export const MainComponent = (props: Props): JSX.Element => {
  if (props.user) {
    return (
      <Layout>
        <props.Component {...props.pageProps} />
      </Layout>
    );
  } else {
    return <LoginBeforeTop />;
  }
};
