import { useEffect, useState } from "react";
import { Falsy } from "utility-types";

export const useFetchFirestore = <T, U>(
  fetchFn: (args: T) => Promise<U>,
  args: T | Falsy
): { data: U | null } => {
  const [data, setData] = useState<U | null>(null);
  useEffect(() => {
    if (!args) return;
    fetchFn(args)
      .then((res) => setData(res))
      .catch((e) => {
        throw e;
      });
  }, [args, fetchFn]);
  return { data };
};
