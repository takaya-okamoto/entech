import { useRecoilState } from "recoil";
import { selectedFooterState, timeLineModeState } from "../stores/recoil";
import { useEffect } from "react";

const Search = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLineMode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  useEffect(() => {
    setSelectedFooter(1);
    setTimeLineMode("en");
  });
  return (
    <>
      <p>search page</p>
    </>
  );
};
export default Search;
