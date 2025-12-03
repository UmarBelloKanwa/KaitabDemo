import { Author } from "@/types/author";

export interface User {
    public_id: string
    name: string
    contact: string
    author?: Author | null
}