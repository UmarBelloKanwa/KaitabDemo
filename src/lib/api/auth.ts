import axios from "@/lib/axios";
import type { SignupData } from "@/types/auth";

const signIn = {
  // Login Using OTP
  submitEmail: async (data: { email: string }) => {
    return (await axios.post("auth/login/email", data)).data;
  },

  submitOtpCode: async (data: { otp_code: string }) => {
    return (await axios.post("auth/login/verify-otp", data)).data;
  },

  // Login using Password
  loginTo: async (data: { email: string; password: string }) => {
    return (await axios.post("auth/login", data)).data;
  },
};

export default {
  signIn,
};

export const submitUserInfo = async (data: {
  fullName: string;
  // birthDate: string;
  // professionIds: number[];
}) =>
  (await axios.post("user/set-info", {
    full_name: data.fullName,
    // birth_date: data.birthDate,
    // profession_ids: data.professionIds,
  })).data;


export const signupUserDataForOtp = async (data: SignupData) =>
  (await axios.post("auth/signup", {
    // topics: data.interests,
    full_name: data.fullName,
    // birth_date: data.birthDate,
    email: data.email,
    password: data.password,
    confirm_password: data.confirmPassword,
  })).data;

export const signupByVerifyingOtp = async (data: SignupData) => {
  return (await axios.post("auth/signup/verify-otp", {
    // topics: data.interests,
    full_name: data.fullName,
    // birth_date: data.birthDate,
    email: data.email,
    password: data.password,
    confirm_password: data.confirmPassword,
    otp_code: data.otpCode,
  })).data;
};

export const logout = async () => await axios.post("auth/logout");
