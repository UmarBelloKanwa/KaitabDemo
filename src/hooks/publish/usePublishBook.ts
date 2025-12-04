"use client";

import React, { useState } from "react";
import { publishBook } from "@/lib/api/book";
import { UserFormData } from "@/types/social";
import { RESERVED_SLUGS } from "@/constants";
import { useRouter } from "next/navigation";


type ErrorState = {
    pdfFile: string;
    name: string;
    topics: string;
    slug: string;
    description: string;
    general: string;
};


export default function usePublishPage() {
    const router = useRouter();

    const [formData, setFormData] = useState<UserFormData>({
        coverPhoto: null as File | null,
        pdfFile: null as File | null,
        name: "",
        slug: "",
        topics: [],
        description: "",
    });

    const baseErr: ErrorState = {
        pdfFile: "",
        name: "",
        topics: "",
        slug: "",
        description: "",
        general: "",
    };

    const [errors, setErrors] = useState({ ...baseErr });

    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [mainPreview, setMainPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const isFormValid = () => {
        return (
            formData.name.trim() !== "" &&
            formData.slug !== null &&
            formData.description.trim() !== "" &&
            formData.topics.length > 0 &&
            formData.coverPhoto !== null &&
            formData.pdfFile !== null
            // Object.values(errors).every((val) => val === "")
        );
    };

    const createBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isFormValid()) { return };
        setIsSubmitting(true);

        publishBook(formData).then((res) => {
            // console.log(res);
            setErrors({
                pdfFile: "",
                name: "",
                slug: "",
                topics: "",
                description: "",
                general: "",
            });
            setShowToast(true);
            // Success: redirect or clear form here
        })
            .catch((err) => {
                const imageErrors: string[] = [];

                if (err.main_photo) imageErrors.push(`Main photo: ${err.main_photo}`);
                if (err.cover_photo) imageErrors.push(`Cover photo: ${err.cover_photo}`);

                const newErrors = {
                    pdfFile: err.file || "",
                    name: err.book_name || "",
                    topics: err.topics || "",
                    slug: err.slug || "",
                    description: err.description || "",
                    general:
                        imageErrors.length > 0
                            ? imageErrors.join(", ")
                            : err.message || err.general,
                };
                setErrors(newErrors);
            }).finally(() => setIsSubmitting(false));
    }


    const handleImageChange = (field: "coverPhoto") => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, [field]: file }));

            if (field === "coverPhoto") {
                setCoverPreview(previewURL);
            }
            // else {
            //     setMainPreview(previewURL);
            // }
        }
    };



    const handleInputChange = (field: keyof typeof formData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (field === "slug") {
            const value = event.target.value;
            const slugRegex = /^[a-zA-Z0-9._]+$/;

            if (value.length < 5 || value.length > 50) {
                setErrors(prev => ({ ...prev, slug: "Slug must be 5–50 characters long." }));
            } else if (!slugRegex.test(value)) {
                setErrors(prev => ({ ...prev, slug: "Only letters, numbers, dots, and underscores are allowed." }));
            } else if (RESERVED_SLUGS.includes(value.toLowerCase())) {
                setErrors(prev => ({ ...prev, slug: `"${value}" is reserved and cannot be used.` }));
            } else {
                setErrors(prev => ({ ...prev, slug: "" }));
            }
        }
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const setPdf = (file: File) => {
        setFormData((prev) => ({
            ...prev,
            pdfFile: file,
        }));
    }

    const [origin, setOrigin] = useState<string>("here.com");
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
    }, []);

    const closeToast = () => {
        setShowToast(false);
        router.push("/");
    }

    return {
        coverPreview, handleImageChange,
        mainPreview, errors, setPdf,
        handleInputChange, formData,
        setFormData, isFormValid,
        isSubmitting, createBook, origin,
        showToast, closeToast
    }
}