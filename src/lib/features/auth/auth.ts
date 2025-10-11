import { api } from '@/lib/axios'; // your axios instance

export const submitUserContact = async (contact: {
    contact: string,
    contact_type: string
}) => await api.post('auth/signup/contact', contact);

export const signup = async (data: {
    password: string
}) => await api.post('auth/signup', data);

export const resendSignupOtp = async () =>
    await api.post('auth/signup/send-otp');

export const verifySignupOtp = async (data: {
    otp_code: string
}) => await api.post('auth/signup/verify-otp', data);

export const submitLoginContact = async (contact: {
    contact: string,
    contact_type: string
}) => await api.post('auth/login/contact', contact);

export const login = async (credentials: {
    password: string
}) => await api.post('auth/login', credentials);

export const requestResetPassword = async () =>
    await api.post("auth/reset-password/contact")

export const resendResetPasswordOtp = async () =>
    await api.post("auth/reset-password/send-otp");

export const verifyResetPasswordOtp = async (data: { otp_code: string }) =>
    await api.post("auth/reset-password/verify-otp", data);

export const setNewPassword = async (data: { password: string, confirm_password: string }) =>
    await api.post("auth/reset-password/set-new-password", data);