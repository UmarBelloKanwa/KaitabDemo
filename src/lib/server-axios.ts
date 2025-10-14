"use server";

import { createApi } from "./axios";
import { getAllCookiesAsString } from "./cookie";

const serverAxios = async () => {
    const cookieHeader = await getAllCookiesAsString();
    return createApi(cookieHeader);
};

export default serverAxios;