import { GEO_IP_LOOKUP_API } from "@/shared";
import { useCallback } from "react";

export const useGetIpInfo = () => {
  const ipDetails = useCallback(async (): Promise<object> => {
    try {
      const res = await fetch(GEO_IP_LOOKUP_API, { method: "GET" });

      if (res.ok) {
        const data = await res.json();

        const availableData: Record<string, any> = {};

        Object.entries(data).forEach(([key, value]) => {
          if (value) {
            availableData[key] = value;
          }
        });

        return availableData;
      } else {
        return {};
      }
    } catch (_) {
      return {};
    }
  }, []);

  return ipDetails;
};
