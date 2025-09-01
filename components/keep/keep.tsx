  <Card
                elevation={0}
                sx={{
                    cursor: "pointer",
                    maxWidth: 672,
                    m: "auto",
                    borderRadius: 2,
                    transition: "background-color 0.2s",
                    width: { xs: "100%", sm: "70%" },
                    mx: "auto"
                }}
                onClick={handlePostClick}
            >
                <CardContent sx={{
                    p: 2, width: { xs: "100%", sm: "90%" },
                    mx: "auto"
                }}>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                        <Avatar src={user.avatar || "/placeholder.svg"} sx={{ width: 40, height: 40 }}>
                            {user.name.charAt(0)}
                        </Avatar>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
                                    {user.name}
                                </Typography>
                                {user.verified && <CheckCircle sx={{ fontSize: 16, color: "#1DA1F2" }} />}
                                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                    @{user.username}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                    ·
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                    {timestamp}
                                </Typography>
                                <Box sx={{ ml: "auto" }}>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: "#6b7280",
                                            "&:hover": { color: "white", bgcolor: "rgba(255, 255, 255, 0.1)" },
                                        }}
                                    >
                                        <MoreHoriz />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Box sx={{ mb: 1.5 }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "white",
                                        whiteSpace: "pre-line",
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: expanded || !shouldShowMore ? "unset" : maxLines,
                                    }}
                                >
                                    {content}
                                </Typography>
                                {shouldShowMore && (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setExpanded(!expanded)
                                        }}
                                        sx={{
                                            color: "#1DA1F2",
                                            textTransform: "none",
                                            p: 0,
                                            minWidth: "auto",
                                            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                                        }}
                                    >
                                        {expanded ? "Show less" : "Show more"}
                                    </Button>
                                )}
                            </Box>

                            {image && (
                                <Box
                                    sx={{
                                        mb: 1.5,
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        border: "1px solid #374151",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={image || "/placeholder.svg"}
                                        alt="Post image"
                                        sx={{ width: "100%", height: 256, objectFit: "cover" }}
                                    />
                                </Box>
                            )}

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 400 }}>
                                <IconButton
                                    size="small"
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#1DA1F2",
                                            bgcolor: "rgba(29, 161, 242, 0.1)",
                                        },
                                    }}
                                >
                                    <ChatBubbleOutline sx={{ fontSize: 16 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        {formatNumber(metrics.replies)}
                                    </Typography>
                                </IconButton>

                                <IconButton
                                    size="small"
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#10b981",
                                            bgcolor: "rgba(16, 185, 129, 0.1)",
                                        },
                                    }}
                                >
                                    <Repeat sx={{ fontSize: 16 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        {formatNumber(metrics.retweets)}
                                    </Typography>
                                </IconButton>

                                <IconButton
                                    size="small"
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#ef4444",
                                            bgcolor: "rgba(239, 68, 68, 0.1)",
                                        },
                                    }}
                                >
                                    <Favorite sx={{ fontSize: 16 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        {formatNumber(metrics.likes)}
                                    </Typography>
                                </IconButton>

                                {metrics.views && (
                                    <IconButton
                                        size="small"
                                        onClick={(e) => e.stopPropagation()}
                                        sx={{
                                            color: "#6b7280",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            "&:hover": {
                                                color: "#1DA1F2",
                                                bgcolor: "rgba(29, 161, 242, 0.1)",
                                            },
                                        }}
                                    >
                                        <BarChart sx={{ fontSize: 16 }} />
                                        <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                            {formatNumber(metrics.views)}
                                        </Typography>
                                    </IconButton>
                                )}

                                <Box sx={{ display: "flex" }}>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => e.stopPropagation()}
                                        sx={{
                                            color: "#6b7280",
                                            "&:hover": {
                                                color: "#1DA1F2",
                                                bgcolor: "rgba(29, 161, 242, 0.1)",
                                            },
                                        }}
                                    >
                                        <BookmarkBorder sx={{ fontSize: 16 }} />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => e.stopPropagation()}
                                        sx={{
                                            color: "#6b7280",
                                            "&:hover": {
                                                color: "#1DA1F2",
                                                bgcolor: "rgba(29, 161, 242, 0.1)",
                                            },
                                        }}
                                    >
                                        <Share sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>