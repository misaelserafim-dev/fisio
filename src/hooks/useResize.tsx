import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { devices } from "@/scss/base/devices";

type DeviceKey = keyof typeof devices;

function useResize(query: DeviceKey, callBack?: () => void) {
  const isActive = useMediaQuery(devices[query]);

  useEffect(() => {
    if (isActive) {
      callBack && callBack();
    }
  }, [isActive]);

  return isActive;
}

export default useResize;
