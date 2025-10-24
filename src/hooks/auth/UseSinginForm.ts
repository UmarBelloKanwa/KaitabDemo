"use client";

import React from "react";
import authApi from "@/lib/api/auth";
import { useUserStore } from "@/store/user-store";
import { useUIStore } from "@/store/ui-store";
import { useRouter } from "next/navigation"; 

export default function useSigninForm() {
  const router = useRouter();
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [userPassword, setUserPassword] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<any | null>({
    email: null,
    password: null,
    otp: null,
    general: null,
  });
  const [loading, setLoading] = React.useState(false);
  const [loginMethod, setLoginMethod] = React.useState<"email" | "password">(
    "email"
  );
  const [isOtpStep, setIsOtpStep] = React.useState(false);
  const {setDisplayAuthCard } = useUIStore();

  const handleSetEmail = (value: string) => {
    setUserEmail(value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submitEmail = async () => {
    const email = userEmail ?? ""; // fallback to empty string
    // Validate email
    if (!emailRegex.test(email)) {
      setErrors({ email: "Invalid email address" });
      return;
    }
    try {
      setLoading(true);
      setErrors({});

      const res = await authApi.signIn.submitEmail({ email });
      console.log(res.data);
      setIsOtpStep(true);
    } catch (err: any) {
      console.log(err);
      setErrors({ email: err?.email || err?.general || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    const password = userPassword ?? "";
    const email = userEmail ?? ""; // fallback to empty string
    // Validate email
    if (!emailRegex.test(email)) {
      setErrors({ email: "Invalid email address" });
      return;
    }
    // Validate password if required
    if (password.length < 3) {
      setErrors({ password: "Invalid password" });
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      const res = await authApi.signIn.loginTo({ email, password });
      setDisplayAuthCard(false);
      router.refresh();
    } catch (err: any) {
      console.log(err);
      setErrors((prev: any) => ({ ...prev, ...err }));
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    if (loginMethod === "email") {
      await submitEmail();
      return;
    } else if (loginMethod === "password") {
      await login();
    }
  };

  const handleSetUserPassword = (password: string) => {
    setUserPassword(password);
  };

  const submitOtpCode = async (otp_code: string) => {
    try {
      const res = await authApi.signIn.submitOtpCode({ otp_code });

      // get Zustand store (outside React)
      const { setUser } = useUserStore.getState();

      // store the user globally
      if (res?.data?.user) {
        setUser(res.data.user);
        setDisplayAuthCard(false);
        
      }

      return res;
    } catch (error) {
      // console.error("OTP verification failed:", error);
      throw error;
    }
  };

  const setIsOtpTab = async (v: boolean) => {
    setIsOtpStep(v);
  };

  return {
    userEmail,
    loading,
    handleSetEmail,
    loginUser,
    errors,
    loginMethod,
    setLoginMethod,
    isOtpStep,
    setIsOtpTab,
    submitOtpCode,
    userPassword,
    handleSetUserPassword,
  };
}
