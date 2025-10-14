export interface TopicResponse {
    name: string;
    category: string;
}

export interface BookResponse {
    slug: string;
    publicId: string; // UUID as string
    author: string;
    content: Record<string, unknown>; // Assuming content is a JSON object
    fileUrl: string;
    coverPhotoUrl: string;
    mainPhotoUrl: string;
    name: string;
    topics: TopicResponse[];
    description: string | null;
    customTopics: TopicResponse[];
    uploadedAt: string; // ISO 8601 string
    updatedAt: string;
}

export interface SelectedTopic {
    name: string;
    topicId: string | null;       // null if custom
    category: string;
    categoryId: string | null;    // null if custom
    isCustom: boolean;
}

export interface UserFormData {
    mainPhoto: File | null;
    coverPhoto: File | null;
    pdfFile: File | null;
    author: string;
    name: string;
    slug: string;
    topics: SelectedTopic[];
    description: string;
}

