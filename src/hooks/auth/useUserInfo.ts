import * as React from "react";
import { useSignup } from "@/context/SignupContext";


export default function useUserInfoPage() {

    type ProfessionOption = { id: number; name: string };
    type UserInfo = {
        fullName: string
        // birthDate: string,
        email: string,
    };
    type Errors = {
        fullName: string
        // birthDate: string,
        email: string,
        general: string,
    };
    const { data, updateData, setStep } = useSignup(); 



    const main = { fullName: '', birthDate: '', email: "", general: "" }
    const [userInfo, setUserInfo] = React.useState<UserInfo>({ fullName: '', email: "", /*birthDate: ''*/});
    const [errors, setErrors] = React.useState<Errors>({ ...main });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [openProfessions, setOpenProfessions] = React.useState(false);
    const [professionOptions, setProfessionOptions] = React.useState<ProfessionOption[]>([]);
    const [loadingOptions, setLoadingOptions] = React.useState(false);


    const handleCloseProfessions = () => {
        setOpenProfessions(false);
        setProfessionOptions([]);
    };
    const validate = (key: keyof UserInfo, value: string) => {
        switch (key) {
            case 'fullName':
                if (!value.trim()) {
                    return "Full name is required";
                } else if (value.trim().length < 3) {
                    return "Minimum characters 3 letters"
                } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value.trim())) {
                    return "Only letters and spaces allowed"
                }
                break;
            // case 'birthDate':
            //     const today = new Date();
            //     const dob = new Date(value);
            //     const age = today.getFullYear() - dob.getFullYear();
            //     const isFuture = dob > today;
            //     const isTooOld = age > 120;
            //     const isTooYoung = age < 5;

            //     if (!dob || value == null) {
            //         return "Date of birth is required";
            //     } else if (isNaN(dob.getTime())) {
            //         return "Invalid date format";
            //     } else if (isFuture) {
            //         return "Date must be in the past";
            //     } else if (isTooOld || isTooYoung) {
            //         return "Unrealistic date of birth";
            //     }
            //     break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return "Invalid email address"
                };
                break;

        }
    }

    const handleSetUserInfo = (key: keyof UserInfo, value: string | number) => {
        const err = validate(key, value as string);
        setUserInfo((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: err }));
    }

    const handleSubmit = () => {
        const newErrors: Errors = { ...main };

        (Object.entries(userInfo) as [keyof UserInfo, string][]).forEach(([key, value]) => {
            const error = validate(key, value);
            const errKey: keyof Errors = key as keyof Errors;
            if (error) newErrors[errKey] = error;
            else delete newErrors[errKey]; // Clean up any previous error if now valid
        });

        setErrors(newErrors);

        // Only proceed if NO error values exist
        const hasErrors = Object.values(newErrors).some(error => error);

        if (hasErrors) return;

        setIsSubmitting(true);

        // const formattedDOB = new Date(userInfo.birthDate).toISOString().split("T")[0];

        updateData({ ...data, ...userInfo, /*birthDate: formattedDOB*/  });
        setStep("credentials");
        setIsSubmitting(false);
    };


    return {
        errors,
        userInfo,
        handleSetUserInfo,
        isSubmitting,
        handleSubmit,
        professionOptions,
        openProfessions,
        loadingOptions,
        handleCloseProfessions,
    }
}