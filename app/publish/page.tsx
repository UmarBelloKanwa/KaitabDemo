"use client";

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import CameraAlt from "@mui/icons-material/CameraAlt";
import FileUpload from "@/components/ui/publish/FileUpload";
import AddBookTopic from "@/components/ui/publish/AddBookTopic";
import { SelectedTopic } from "@/types/social";
import ProcessingToast from "@/components/ui/publish/ProcessingToast";


export default function PublishBook() {
    const {
        coverPreview, handleImageChange,
        mainPreview, errors, setPdf,
        handleInputChange, formData,
        setFormData, isFormValid,
        isSubmitting, createBook, origin,
        showToast, closeToast
    } = usePublishPage();

    return (
        <Container sx={{ height: "fit-content", pb: 1 }}>
            <Typography variant="h5" sx={{ my: 1, mt: 3 }}> Upload Book </Typography>
            <Box maxWidth="sm" sx={{
                m: "auto", mb: 5, width: "100%",
                position: "relative",
                top: 0,
                height: "100%",
                overflow: "hidden",
            }}>
                <Typography sx={{ color: "text.secondary" }}>
                    Transform your book into a Robook - an intelligent book that understands, interacts, and solves problems.
                </Typography> <br />

                {/* Cover Photo Upload */}
                <Box
                    sx={{
                        position: "relative",
                        height: 200,
                        overflow: "hidden",
                        borderRadius: 1,
                        border: "1px solid rgba(33, 19, 116, 0.3)",
                        bgcolor: "background.paper",
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${coverPreview || "/cover-image.png"})`,
                        "&:hover": {
                            borderColor: "rgba(33, 19, 116, 0.7)",
                        },
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        id="cover-upload"
                        onChange={handleImageChange("coverPhoto")}
                    />
                    <label htmlFor="cover-upload">
                        <IconButton
                            component="span"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                bgcolor: "rgba(0,0,0,0.5)",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                            }}
                        >
                            <CameraAlt sx={{ color: "white", fontSize: 32 }} />
                        </IconButton>
                    </label>
                </Box>

                {/* Main Photo Upload */}
                <Box
                    sx={{
                        position: "relative",
                        mt: -3,
                        ml: 3,
                        mb: 3,
                        width: 110,
                        height: 100,
                        border: "1px solid rgba(33, 19, 116, 0.3)",
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                        backgroundImage: `url(${mainPreview || "/cover-image.png"})`,
                        "&:hover": {
                            borderColor: "rgba(33, 19, 116, 0.7)",
                        },
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        id="main-upload"
                        onChange={handleImageChange("mainPhoto")}
                    />
                    <label htmlFor="main-upload">
                        <IconButton
                            component="span"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                bgcolor: "rgba(0,0,0,0.5)",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                            }}
                        >
                            <CameraAlt sx={{ color: "white", fontSize: 28 }} />
                        </IconButton>
                    </label>
                </Box>

                {/* PDF Upload */}
                <Box sx={{ mb: 1.5 }}>
                    <Typography
                        variant="body2"
                        component="div"
                        align="left"
                        sx={{ color: "text.secondary", mb: 1 }}
                    >
                        Upload book
                    </Typography>
                    <FileUpload setPdfFile={setPdf} />
                    {errors.pdfFile && (
                        <Typography variant="caption" color="error">
                            {errors.pdfFile}
                        </Typography>
                    )}
                </Box>

                {/* Title Name Input */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        Book name
                    </Typography>
                    <TextField
                        fullWidth
                        value={formData.name}
                        placeholder="Robook name"
                        onChange={handleInputChange("name")}
                        helperText={errors.name || "Enter the name of the book"}
                        error={Boolean(errors.name)}
                        sx={{ mb: 2 }}
                    />
                </Box>

                {/* Author Input */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        Author
                    </Typography>
                    <TextField
                        fullWidth
                        value={formData.author}
                        placeholder="Author name"
                        onChange={handleInputChange("author")}
                        helperText={errors.author || "Enter the author’s name"}
                        error={Boolean(errors.author)}
                        sx={{ mb: 2 }}
                    />
                </Box>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        Topic
                    </Typography>
                    <AddBookTopic
                        onChange={(selectedTopics: any) => {
                            setFormData((prev) => ({
                                ...prev,
                                topics: selectedTopics
                            }));
                        }}
                    />
                </Box>
                {/* Page name Input */}
                <Box sx={{ mb: 1, mt: 3 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        Book URL name (Robook)
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Book name"
                        value={formData.slug}
                        onChange={handleInputChange("slug")}
                        helperText={errors.slug || `Create a unique name so people can easily find your Robook at ${origin}/yourbook.`}
                        error={Boolean(errors.slug)}
                        sx={{ mb: 2 }}
                    />
                </Box>

                {/* Description Input */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        Description
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        placeholder="Book description"
                        value={formData.description}
                        onChange={handleInputChange("description")}
                        helperText={
                            errors.description || "Write a short description of the book"
                        }
                        error={Boolean(errors.description)}
                        sx={{ mb: 2 }}
                    />
                </Box>

                {errors.general && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.general}
                    </Alert>
                )}

                <Box sx={{ width: "50%", m: "auto" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="secondary"
                        loading={isSubmitting}
                        loadingPosition="end"
                        onClick={createBook}
                        sx={{ borderRadius: 2 }}
                    >
                        {isSubmitting ? "Publishing..." : "Publish"}
                    </Button>
                </Box>
                <ProcessingToast
                    isVisible={showToast}
                    onClose={closeToast}
                    title={formData.name}
                    author={formData.author}
                    description={formData.description}
                    fileName={formData.pdfFile?.name}
                    estimatedTime="2-3 minutes"
                    slug={`${origin}/${formData.slug}`}
                />
            </Box>
        </ Container>
    );
}

interface FormData {
    name: string
    author: string
    slug: string
    description: string
    topics: SelectedTopic[]
    coverPhoto: File | null
    mainPhoto: File | null
    pdfFile: File | null
}
function usePublishPage() {
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        author: "",
        slug: "",
        description: "",
        topics: [],
        coverPhoto: null,
        mainPhoto: null,
        pdfFile: null,
    });

    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [mainPreview, setMainPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const origin = "https://robooks.example.com";

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleImageChange = (type: "coverPhoto" | "mainPhoto") => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (type === "coverPhoto") {
                setCoverPreview(reader.result as string);
            } else {
                setMainPreview(reader.result as string);
            }
        };
        reader.readAsDataURL(file);

        setFormData((prev) => ({ ...prev, [type]: file }));
    };

    const setPdf = (file: any) => {
        setFormData((prev) => ({ ...prev, pdfFile: file }));
    };

    const isFormValid = () => {
        return formData.name && formData.author && formData.slug && formData.pdfFile;
    };

    const createBook = () => {
        setErrors({});
        if (!isFormValid()) {
            setErrors({ general: "Please fill all required fields." });
            return;
        }

        setIsSubmitting(true);
        setShowToast(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowToast(false);

            // Reset form after "publishing"
            setFormData({
                name: "",
                author: "",
                slug: "",
                description: "",
                topics: [],
                coverPhoto: null,
                mainPhoto: null,
                pdfFile: null,
            });
            setCoverPreview(null);
            setMainPreview(null);
            alert("Book published successfully! ✅");
        }, 3000);
    };

    const closeToast = () => setShowToast(false);

    return {
        coverPreview,
        mainPreview,
        handleImageChange,
        setPdf,
        handleInputChange,
        formData,
        setFormData,
        errors,
        setErrors,
        isFormValid,
        isSubmitting,
        createBook,
        origin,
        showToast,
        closeToast,
    };
}
