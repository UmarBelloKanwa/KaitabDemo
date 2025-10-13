import React from "react";
import OtpTab from "../OtpTab";
import { useSignup } from "@/context/SignupContext";
import { signupByVerifyingOtp } from "@/api/auth";
import { useUserStore } from "@/store/user-store";

export default function VerifyOtp() {
  const { data, setStep, updateData } = useSignup();
  const [isOtpStep, setIsOtpStep] = React.useState(true);

  React.useEffect(() => {
    if (!isOtpStep) {
      setStep("credentials");
    }
  }, [isOtpStep]);

  const submitOtpCode = async (otp_code: string) => {
    updateData({ ...data, otpCode: otp_code });
    
    try {
      const res = await signupByVerifyingOtp({ ...data, otpCode: otp_code });
      
      // get Zustand store (outside React)
      const { setUser } = useUserStore.getState();
      if (res?.data?.user) {
        setUser(res?.data?.user);
      }
      
      return res;
    } catch (err) {
      throw err;
    }

  };

  const backToTryAgain = (v: boolean) => {
    setIsOtpStep(v);
  };

  return (
    <OtpTab
      email={data.email}
      submitOtpCode={submitOtpCode}
      setIsOtpStep={backToTryAgain}
    />
  );
}
