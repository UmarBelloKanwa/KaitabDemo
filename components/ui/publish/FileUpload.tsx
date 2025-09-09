"use client"

import React from "react"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import CloudUploadIcon from "@mui/icons-material/UploadFile"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import CloseIcon from "@mui/icons-material/Close"
import { styled } from "@mui/material/styles"

// Custom styled input for file upload, as recommended by Material-UI
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
})


export default function PDFUploadCardMUI({ setPdfFile }: { setPdfFile: (file: File) => void; }) {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const handleSetSelectedFile = (pdf: File | null) => {
        if (pdf) {
            setPdfFile(pdf);
            setSelectedFile(pdf);
        }
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0]
        if (file && file.type === "application/pdf") {
            handleSetSelectedFile(file)
        } else {
            handleSetSelectedFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = "" // Clear the input if not a PDF
            }
            alert("Please select a PDF file.")
        }

    }

    const handleRemoveFile = () => {
        handleSetSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    // const handleUpload = () => {
    //     if (selectedFile) {
    //         console.log("Uploading file:", selectedFile.name)
    //         alert(`File "${selectedFile.name}" is ready for upload!`)
    //         // In a real application, you would send this file to a server.
    //     } else {
    //         alert("No PDF file selected.")
    //     }
    // }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                border: "1px solid rgba(33, 19, 116, 0.3)",
                borderRadius: "8px",
                bgcolor: "background.paper", // White background as in screenshot
                transition: "border-color 0.3s, background-color 0.3s",
                "&:hover": {
                    borderColor: "rgba(33, 19, 116, 0.7)",
                },
            }}
        >
            {!selectedFile ? (
                <>
                    <CloudUploadIcon sx={{ fontSize: 60, color: "grey.500", mb: 0 }} /> {/* Darker grey icon */}
                    <Typography sx={{ display: "flex", alignItems: "center", }}>
                        <Button
                            component="label"
                            variant="text"
                            sx={{ textTransform: "none", color: "primary", fontWeight: "medium" }}
                        >
                            Click to upload
                            <VisuallyHiddenInput
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </Button>
                        <Typography component="span" variant="body2" color="text.secondary" sx={{ color: "grey.700", display: { xs: "none", sm: "none", md: "block" } }}>
                            or drag and drop PDF (max 10MB)
                        </Typography>
                    </Typography>


                </>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        p: 1.5,
                        bgcolor: "background.paper",
                        boxShadow: 1,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PictureAsPdfIcon sx={{ color: "error.main" }} />
                        <Typography
                            variant="body2"
                            sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                        >
                            {selectedFile.name}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleRemoveFile}
                        size="small"
                        aria-label="Remove file"
                        sx={{ color: "grey.500", "&:hover": { color: "grey.700" } }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </Box>
    )
}
