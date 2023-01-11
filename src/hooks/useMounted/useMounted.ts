import { useEffect } from "react";
import { useState } from "react";
export default function useMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isMounted] as const;
}
