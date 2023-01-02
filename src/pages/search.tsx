import { Layout } from "../components/layout/layout";
import { useRecoilState } from "recoil";
import { selectedFooterState } from "../stores/recoil";
import { useEffect } from "react";

const Search = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  useEffect(() => {
    setSelectedFooter(1);
  });
  return (
    <Layout>
      <p>search page</p>
    </Layout>
  );
};
export default Search;
