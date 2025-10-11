import { api } from '@/lib/axios';

type ApiResponse<T> = Promise<T>;
type ProfessionOption = { id: number; name: string };

export const getUserProfessions = async (q: string): ApiResponse<ProfessionOption[]> => await api.get(`user/professions${q ? `?q=${q}` : ''}`);

export const submitUserInfo = async (data: {
    fullName: string,
    birthDate: string,
    professionIds: number[]
}) => await api.post('user/set-info', {
    full_name: data.fullName,
    birth_date: data.birthDate,
    profession_ids: data.professionIds
});

export const getUserTopics = async (q?: string) => await api.get(`topic/search-topic${q ? `?q=${q}` : ''}`);

export const submitUserTopics = async (data: { topics: { id: number; category_id: number; }[] }) =>
    await api.post("topic/add-topic", data);