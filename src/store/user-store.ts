import { create } from "zustand"
import axios from "@/lib/axios" // 👈 import your configured Axios instance

interface User {
    public_id: string
    full_name: string
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
            const res = await axios.get("/me")
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
            await axios.post("/logout")
        } catch (err: any) {
            // console.error("Logout failed:", err.response?.data || err.message)
        } finally {
            set({ user: null })
        }
    },
}))
