"use server";

import { createApi } from "../lib/axios";
import { getAllCookiesAsString } from "./cookie";

const serverAxios = async () => {
    const cookieHeader = await getAllCookiesAsString();
    return createApi(cookieHeader);
};

export default serverAxios;


export const serverCatcheAxios = async (cookieHeader: string) => {
    return createApi(cookieHeader);
};
