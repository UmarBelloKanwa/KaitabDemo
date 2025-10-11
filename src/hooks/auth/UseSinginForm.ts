"use client";

import React from "react";
import authApi from "@/api/auth"

export default function useSigninForm() {

    const [userEmail, setUserEmail] = React.useState<string | null>(null);
    const [userPassword, setUserPassword] = React.useState<string | null>(null)
    const [errors, setErrors] = React.useState<any | null>({
        email: null,
        password: null,
        otp: null,
        general: null
    });
    const [loading, setLoading] = React.useState(false);
    const [loginMethod, setLoginMethod] = React.useState<"email" | "password">("email");
    const [isOtpStep, setIsOtpStep] = React.useState(false);

    const handleSetEmail = (value: string) => {
        setUserEmail(value);
    };


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const loginUser = async () => {
        const email = userEmail ?? ""; // fallback to empty string
        const password = userPassword ?? "";

        // Validate email
        if (!emailRegex.test(email)) {
            setErrors({ email: "Invalid email address" });
            return;
        }

        // Validate password if required
        if (loginMethod === "password" && !passwordRegex.test(password)) {
            setErrors({ password: "Invalid password" });
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            if (loginMethod === "email") {
                //const res = await authApi.signIn.submitEmail({ email })
                setIsOtpStep(true);
            } else {
                //const res = await authApi.signIn.loginTo({ email, password });
            }
        } catch (err: any) {
            setErrors({ email: err?.message || "Login failed" });
        } finally {
            setLoading(false);
        }
    };



    const handleSetUserPassword = (password: string) => { setUserPassword(password) }
    const resendOtpCode = async () => {

    }

    const submitOtpCode = async () => {

    }

    const setIsOtpTab = async (v: boolean) => { setIsOtpStep(v); }

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
        resendOtpCode,
        submitOtpCode,
        userPassword,
        handleSetUserPassword
    }
}