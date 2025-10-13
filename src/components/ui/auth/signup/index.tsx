"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { SignupProvider, useSignup } from "@/context/SignupContext";
import type { SignupStep } from "@/types/auth";

// Step Components
import InterestsStep from "./TopicsOfInterest";
import PersonalInfoStep from "./PersonalInfo";
import CredentialsStep from "./UserCredentials";
import VerifyOtpStep from "./VerifyOtp";

const stepOrder: SignupStep[] = [
  "interests",
  "personalInfo",
  "credentials",
  "verify-otp",
];

const StepContent = () => {
  const { currentStep, setStep } = useSignup();

  const currentIndex = stepOrder.indexOf(currentStep);

  const handleNext = () => {
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <Box>
      {/* Render the step component */}
      {currentStep === "interests" && <InterestsStep />}
      {currentStep === "personalInfo" && <PersonalInfoStep />}
      {currentStep === "credentials" && <CredentialsStep />}
      {currentStep === "verify-otp" && <VerifyOtpStep />} 
     

      {/* Navigation Buttons */}
      {/* <div style={{ marginTop: 20 }}>
        {currentIndex > 0 && <button onClick={handleBack}>Back</button>}
        {currentStep !== "otp" && <button onClick={handleNext}>Next</button>}
      </div> */}
    </Box>
  );
};

export default function Signup() {
  return (
    <SignupProvider>
      <StepContent />
    </SignupProvider>
  );
}
