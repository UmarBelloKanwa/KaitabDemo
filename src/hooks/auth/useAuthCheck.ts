import { useUserStore } from "@/store/user-store";
import { useUIStore } from "@/store/ui-store";

/**
 * Hook that checks authentication before performing an action.
 * Supports both synchronous and asynchronous actions.
 *
 * Usage:
 * const requireAuth = useAuthCheck();
 * await requireAuth(async () => {
 *   await api.likePost(id);
 * });
 */
import { useCallback } from "react";

export default function useAuthCheck() {
  const { user } = useUserStore();
  const { setDisplayAuthCard } = useUIStore();

  return useCallback(async (action: () => void | Promise<void>): Promise<boolean> => {
    if (!user) {
      setDisplayAuthCard(true);
      return false;
    }
    try {
      await action();
      return true;
    } catch (error) {
      //console.error("Error in authenticated action:", error);
      return false;
    }
  }, [user, setDisplayAuthCard]);
}
