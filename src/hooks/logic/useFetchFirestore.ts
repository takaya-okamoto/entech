import { useEffect, useState } from "react";

export const useFetchFirestore = <T, U>(
  fetchFn: (args: T) => Promise<U>,
  args?: T
): { data: U | null } => {
  const [data, setData] = useState<U | null>(null);
  useEffect(() => {
    if (!args) return;
    fetchFn(args)
      .then((res) => setData(res))
      .catch((e) => {
        throw e;
      });
  }, [fetchFn, args]);
  return { data };
};
