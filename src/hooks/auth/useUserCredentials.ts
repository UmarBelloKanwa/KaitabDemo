import * as React from "react";
import { useSignup } from "@/context/SignupContext";
import { signupUserDataForOtp } from "@/lib/api/auth";

export default function useuserCredentialsPage() {
  type ProfessionOption = { id: number; name: string };
  type UserCredentials = {
    password: string;
    confirmPassword: string;
    email: string;
  };
  type Errors = {
    password: string;
    confirmPassword: string;
    email: string;
    general: string;
  };
  const { data, updateData, setStep } = useSignup();

  const main = { password: "", confirmPassword: "", email: "" };
  const [userCredentials, setUserCredentials] = React.useState<UserCredentials>(
    { ...main, email: data.email, password: data.password, confirmPassword: data.confirmPassword }
  );
  const [errors, setErrors] = React.useState<Errors>({ ...main, general: "" });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [openProfessions, setOpenProfessions] = React.useState(false);
  const [professionOptions, setProfessionOptions] = React.useState<
    ProfessionOption[]
  >([]);
  const [loadingOptions, setLoadingOptions] = React.useState(false);

  React.useEffect(() => {
    if (userCredentials.confirmPassword) {
      if (userCredentials.password !== userCredentials.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  }, [userCredentials.password, userCredentials.confirmPassword]);

  const handleCloseProfessions = () => {
    setOpenProfessions(false);
    setProfessionOptions([]);
  };
  const passwordRulesText = {
    minLength: "At least 8 characters",
    uppercase: "At least one uppercase letter",
    lowercase: "At least one lowercase letter",
    digit: "At least one digit",
    specialChar: "At least one special character",
  };

  const rules: { label: keyof typeof passwordRulesText; passed: boolean }[] = [
    { label: "minLength", passed: userCredentials.password.length >= 8 },
    { label: "uppercase", passed: /[A-Z]/.test(userCredentials.password) },
    { label: "lowercase", passed: /[a-z]/.test(userCredentials.password) },
    { label: "digit", passed: /\d/.test(userCredentials.password) },
    { label: "specialChar", passed: /[\W_]/.test(userCredentials.password) },
  ];

  const passwordRules = rules
    .map((obj) => ({
      ...obj,
      label: passwordRulesText[obj.label], // ✅ works fine now
    }))
    .filter((rule) => !rule.passed)
    .slice(0, 1);
  const passwordValid = passwordRules.every((rule) => rule.passed);
  const passwordRulesToShow = passwordRules
    .filter((rule) => !rule.passed)
    .slice(0, 1);

  // Enable confirm password only if password is valid
  const isConfirmEnabled = passwordValid && userCredentials.password.length > 0;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const validate = (key: keyof UserCredentials, value: string) => {
    switch (key) {
      case "password":
        break;
      case "confirmPassword":
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Invalid email address";
        }
        break;
    }
  };

  const handleSetUserCredentials = (
    key: keyof UserCredentials,
    value: string | number
  ) => {
    const err = validate(key, value as string);
    setUserCredentials((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: err }));
  };

  const handleSubmit = async () => {
    const newErrors: Errors = { ...main, general: "" };

    (
      Object.entries(userCredentials) as [keyof UserCredentials, string][]
    ).forEach(([key, value]) => {
      const error = validate(key, value);
      const errKey: keyof Errors = key as keyof Errors;
      if (error) newErrors[errKey] = error;
      else delete newErrors[errKey]; // Clean up any previous error if now valid
    });
    if (!passwordRegex.test(userCredentials.password)) {
      handleSetUserCredentials("password", userCredentials.password);
      setIsSubmitting(false);
    }
    let hasError = false;

    if (!passwordValid) {
      newErrors.password = "Please enter password";
      hasError = true;
    }
    if (!userCredentials.confirmPassword) {
      newErrors.confirmPassword = "Password not match";
      hasError = true;
    } else if (userCredentials.password !== userCredentials.confirmPassword) {
      newErrors.confirmPassword = "Password not match";
      hasError = true;
    }
    if (hasError) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors(newErrors);

    // Only proceed if NO error values exist
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) return;

    updateData({ ...data, ...userCredentials });

    try {
      setIsSubmitting(true);
      const res = await signupUserDataForOtp({...data, ...userCredentials});
      setStep("verify-otp");
    } catch (err: any) {
      setErrors({
        ...err,
        fullName: err.full_name,
        confirmPassword: err.confirm_password,
        password: err.password,
        general: err.general 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    userCredentials,
    handleSetUserCredentials,
    isSubmitting,
    handleSubmit,
    professionOptions,
    openProfessions,
    loadingOptions,
    handleCloseProfessions,
    passwordRules,
  };
}
