"use client"

import React from "react";
import {
    Typography,
    Avatar,
    Box,
    Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';

import { Card, CardContent, IconButton } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

import {
    ChatBubbleOutline as PostsIcon,
    ImportContacts as ChaptersIcon,
    MoreHoriz as MoreIcon,
} from '@mui/icons-material';
import MessageIcon from '@mui/icons-material/Message';
import ButtonBase from "@mui/material/ButtonBase";


export default function ProfileInfo({ contentName, setContentName }: { contentName: string, setContentName: (str: string) => void }) {
    return (
        <Box sx={{ width: "100%", m: "auto" }}>
            {/* Profile Section */}
            <Box>
                {/* Profile Info */}
                {/* <Box sx={{ px: 2, pb: 0 }}>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", m: "auto", mt: 1, mb: 2 }}
                    >
                        <Avatar
                            src="/atomic-habits.jpg"
                            sx={{
                                width: 107,
                                height: 100,
                                border: "2px solid black",
                                borderColor: "background.default",
                                borderRadius: 2,
                                m: "auto",
                            }}
                        >
                            Atomic
                        </Avatar>

                        <Box sx={{ width: "fit-content", m: "auto", textAlign: "center" }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                                Atomic Habits
                            </Typography>

                            <Typography variant="subtitle2" > Learn to change habits </Typography>
                            <Chip
                                variant="outlined"
                                icon={
                                    <Avatar
                                        src="/james-clear.jpg"
                                        sx={{
                                            width: "20%",
                                            height: "100%",
                                            borderRadius: "50%",
                                            border: "1px solid",
                                            borderColor: "inherit"
                                        }}
                                    >
                                        Atomic
                                    </Avatar>
                                }
                                label="James Clear"
                                sx={{ pl: 0 }}
                            />
                            <Typography component="div" variant="caption" color="text.secondary" >  Personal Development  </Typography>
                            <Typography component="div" variant="caption" color="text.secondary" > 751K Followers </Typography>
                            <Button variant="outlined" size="small" fullWidth sx={{ borderRadius: 50 }}> Follow </Button>
                        </Box>
                        <Box sx={{ width: "fit-content", ml: 2, display: "flex", gap: 1, my: 1.5 }}>
                            <Button
                                variant={contentName == "Posts" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setContentName("Posts")}
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                    borderRadius: 2
                                }}>
                                Posts
                            </Button>
                            <Button
                                variant={contentName == "Chapters" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setContentName("Chapters")}
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                    borderRadius: 2

                                }}>
                                Chapters
                            </Button>
                            <Button
                                variant={contentName == "Messages" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setContentName("Messages")}
                                sx={{
                                    display: { xs: "block", sm: "none" },
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                    borderRadius: 2
                                }}>
                                Messages
                            </Button>
                        </Box>
                    </Box>
                </Box> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m: "auto", mt: 1,
                    }}
                >
                    <ProfileCard
                        name="Atomic Habits"
                        title="Learn to change habits"
                        followers="4,990"
                        contentName={contentName}
                        setContentName={setContentName}
                        profileImage="/atomic-habits.jpg"
                        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        isFollowing={true}
                    />
                </Box>
            </Box>
        </Box>
    )
}


interface ProfileCardProps {
    name: string
    title: string
    followers: string
    profileImage: string
    backgroundImage: string
    contentName: string
    setContentName: (str: string) => void
    isFollowing?: boolean,

}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    title,
    followers,
    profileImage,
    backgroundImage,
    contentName,
    setContentName,
    isFollowing = true,
}) => {
    const actions = [
        { title: "Posts", icon: <PostsIcon sx={{ fontSize: 16 }} />, onClick: () => setContentName("Posts") },
        { title: "Chapters", icon: <ChaptersIcon sx={{ fontSize: 16 }} />, onClick: () => setContentName("Chapters") },
        { title: "Messages", icon: <MessageIcon sx={{ fontSize: 16 }} />, onClick: () => setContentName("Messages") },
    ]
    return (
        <Card
            sx={{
                borderRadius: 3,
                // boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                overflow: "hidden",
                position: "relative",
                width: { xs: "100%", sm: "98%" },
                // border: "1px solid",
                // borderColor: "divider",
                bgcolor: "background.default",
                m: "auto",
                mb: 2,

            }}
            elevation={0}
        >
            {/* Background Image */}
            <Box
                sx={{
                    height: 120,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
            </Box>

            <CardContent sx={{
                pt: 0, pb: 0,
                width: "100%"
            }}>
                {/* Profile Section */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    {/* Profile Avatar */}
                    <Avatar
                        src={profileImage}
                        sx={(theme) => ({
                            width: 107,
                            height: 100,
                            border: `2px solid ${theme.palette.background.paper}`,
                            borderRadius: 2,
                            mt: -5,
                            mr: 2,

                        })}
                    />

                    {/* Following Button */}
                    <Box sx={{ ml: "auto", mt: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={isFollowing ? <CheckCircle /> : null}
                            sx={{
                                borderRadius: 20,
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                            }}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </Button>
                    </Box>
                </Box>

                {/* Name and Title */}
                <Box sx={{ mb: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, mr: 1 }}>
                            {name}
                        </Typography>
                        <Box
                            component="svg"
                            sx={{ width: 20, height: 20, color: "#3b82f6" }}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.056-2.13c-.293-.306-.288-.778.018-1.1.306-.294.778-.287 1.1.018l1.476 1.528 3.825-5.738c.251-.375.756-.47 1.131-.22.375.251.47.756.22 1.131-.004-.001-.004-.001-.004-.003z" />
                        </Box>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: "0.95rem",
                            lineHeight: 1.4,
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Typography component="div" variant="caption" color="text.secondary" >  Personal Development | {followers}K followers </Typography>

                <Chip
                    size="small"
                    icon={
                        <Avatar
                            src="/james-clear.jpg"
                            sx={{
                                width: 23,
                                height: 23,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "inherit"
                            }}
                        />
                    }
                    label="James Clear"
                    sx={{
                        borderColor: "gray",
                        py: 1.7,
                        mt: 0.5,
                        mb: 1
                    }}
                />

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 2.5, sm: 0.5 }}
                    sx={{
                        p: 0,
                        m: { xs: "auto", sm: 0 },
                        mt: 2,
                        width: "fit-content",
                        maxWidth: "100%",
                    }}
                >
                    {actions.map((item, index) => (
                        <ButtonBase
                            key={index}
                            onClick={item.onClick}
                            sx={(theme) => ({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: 3,
                                px: 1,
                                py: 0.5,
                                "&:hover": {
                                    bgcolor: "action.hover",
                                },

                                gap: { xs: 0, sm: 0.5 },
                                // ✅ Active state
                                ...(contentName === item.title && {
                                    bgcolor: theme.palette.primary.main, // same as contained
                                    color: theme.palette.primary.contrastText, // text/icons turn white
                                    "&:hover": {
                                        bgcolor: theme.palette.primary.dark, // darker on hover
                                    },
                                    "& .MuiTypography-root": {
                                        color: theme.palette.primary.contrastText,
                                    },
                                    "& svg": {
                                        color: theme.palette.primary.contrastText, // icons white too
                                    },
                                }),

                                [theme.breakpoints.up("sm")]: {
                                    border: "1px solid",
                                    borderColor: "divider",
                                    flexDirection: "row",
                                    ...(item.title == "Messages" && {
                                        display: "none"
                                    }),
                                },
                            })}
                        >
                            {item.icon}
                            <Typography variant="caption" color="text.secondary" sx={{ ml: { sm: 0.5, xs: 0 }, mt: { xs: 0.5, sm: 0 } }}>
                                {item.title}
                            </Typography>
                        </ButtonBase>
                    ))}
                    <IconButton
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 0.5
                        }}
                    >
                        <MoreIcon sx={{ fontSize: 16, color: "gray" }} />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    )
}



