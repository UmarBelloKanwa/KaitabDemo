import axios from "@/lib/axios";


const signIn = {
    submitEmail: async (data: { email: string }) => {
        axios.post("auth/email", data);
    },
    loginTo: async (data: { email: string, password: string }) => {
        axios.post("auth/login", data);
    },
    submitOtpCode: async (data: { otp_code: string }) => { },
    resendOtpCode: async () => { axios.post("auth/login/resend-otp") }
}

export default {
    signIn,
};