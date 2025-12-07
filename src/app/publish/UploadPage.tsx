"use client";

import React from "react";
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
import usePublishPage from "@/hooks/publish/usePublishBook";
import useAuthCheck from '@/hooks/auth/useAuthCheck';
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
   const requireAuth = useAuthCheck();    

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
                <Typography >
                  Your book cover
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
                        mb:2,
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
                {/* <Box
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
                </Box> */}

                {/* PDF Upload */}
                <Box sx={{ mb: 1.5 }}>
                    <Typography
                        variant="body2"
                        component="div"
                        align="left"
                        sx={{ mb: 1 }}
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
                    <Typography variant="body2" sx={{  mb: 1 }}>
                        Book name
                    </Typography>
                    <TextField
                        fullWidth
                        value={formData.name}
                        placeholder="Book name"
                        onChange={handleInputChange("name")}
                        helperText={errors.name || "Enter the name of the book"}
                        error={Boolean(errors.name)}
                        sx={{ mb: 2 }}
                    />
                </Box>

                {/* Author Input */}
                {/* <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{  mb: 1 }}>
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
                </Box> */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{  mb: 1 }}>
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
                    <Typography variant="body2" sx={{  mb: 1 }}>
                        Book slug
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="my_book_name"
                        value={formData.slug}
                        onChange={handleInputChange("slug")}
                        helperText={errors.slug || `Create a unique name so people can easily find your book at ${origin}/r/yourbook.`}
                        error={Boolean(errors.slug)}
                        sx={{ mb: 2 }}
                    />
                </Box>

                {/* Description Input */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{  mb: 1 }}>
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

                <Box sx={{ width: "100%", m: "auto" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="secondary"
                        loading={isSubmitting}
                        disabled={!isFormValid() || isSubmitting}
                        loadingPosition="end"
                        onClick={(e) => requireAuth(() => createBook(e))}
                    >
                        {isSubmitting ? "Publishing..." : "Publish"}
                    </Button>
                </Box>
                  <ProcessingToast
                    isVisible={showToast}
                    onClose={closeToast}
                    title={formData.name}
                    fileName={formData.pdfFile?.name}
                    slug={`${origin}/${formData.slug}`}
                />
            </Box>
        </ Container>
    );
}
