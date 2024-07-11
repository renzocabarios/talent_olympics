import { GET } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useGetFungibleTokens({ ownerAddress }: any) {
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["fungible-tokens"],
    queryFn: () =>
      GET(`api/v1/wallet/fungible-tokens?ownerAddress=${ownerAddress}`),
  });

  const parsed = useMemo(() => {
    return data?.data.data ?? [];
  }, [data]);

  return { data: parsed, isFetching, isLoading, isError };
}
