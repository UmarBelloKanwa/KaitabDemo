import { create } from "zustand";
import { getUserMe } from "@/lib/api/user";
import { logout } from "@/lib/api/auth";

interface User {
    public_id: string
    name: string
    contact: string
    // avatar?: string
}

interface UserStore {
    user: User | null
    loading: boolean
    setUser: (user: User | null) => void
    fetchUser: () => Promise<void>
    logout: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    loading: false,

    setUser: (user) => set({ user }),

    fetchUser: async () => {
        set({ loading: true })
        try {
            const res = await getUserMe();
            set({ user: res.data.user || null })
        } catch (err: any) {
            // console.error("Failed to fetch user:", err.response?.data || err.message)
            set({ user: null })
        } finally {
            set({ loading: false })
        }
    },

    logout: async () => {
        try {
            await logout();
        } catch (err: any) {
            // console.error("Logout failed:", err.response?.data || err.message)
        } finally {
            set({ user: null })
        }
    },
}))
