import { getErrorMessage } from "utils/api";
import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
export default function useLogout() {
  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  return handleLogout;
}
