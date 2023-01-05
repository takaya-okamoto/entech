import { Layout } from "../components/layout/layout";
import { useRecoilState } from "recoil";
import { headerState, selectedFooterState } from "../stores/recoil";
import { useEffect } from "react";

const Search = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [headerMode, setHeaderMode] = useRecoilState(headerState);
  useEffect(() => {
    setSelectedFooter(1);
    setHeaderMode(false);
  });
  return (
    <Layout>
      <p>search page</p>
    </Layout>
  );
};
export default Search;
