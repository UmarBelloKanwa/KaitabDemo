"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { SignupContextType, SignupData, SignupStep } from "@/types/auth";

const SignupContext = createContext<SignupContextType | undefined>(undefined);

interface SignupProviderProps {
  children: ReactNode;
}

export const SignupProvider: React.FC<SignupProviderProps> = ({ children }) => {
  const plainData = {
    interests: [],
    fullName: "",
    // birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [currentStep, setCurrentStep] = useState<SignupStep>("personalInfo");
  const [data, setData] = useState<SignupData>({...plainData});

  const updateData = (partial: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const reset = () => {
    setData({...plainData});
    setCurrentStep("credentials");
  };

  return (
    <SignupContext.Provider
      value={{ currentStep, setStep: setCurrentStep, data, updateData, reset }}
    >
      {children}
    </SignupContext.Provider>
  );
};


export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) throw new Error("useSignup must be used within SignupProvider");
  return context;
};
