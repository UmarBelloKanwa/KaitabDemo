import React from "react";
import {
    Popover,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
    Divider,
    Button,
    Box,
    Avatar
} from "@mui/material";
//import { useRouter } from "next/navigation";
import useNotifications from "@/hooks/home/useNotification";
import { formatDistanceToNow, parseISO } from "date-fns";
import type { Notification } from "@/types/home";


interface Props {
    notificationAnchor: HTMLDivElement | null;
    handleNotificationClose: () => void;
}

export default function NotificationBox({
    notificationAnchor,
    handleNotificationClose
}: Props) {
    //const router = useRouter();
    const isNotificationOpen = Boolean(notificationAnchor);

    // ✅ Get data & actions from hook
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        isLoading,
        errors
    } = useNotifications();

    const [hoverOverBox, setHoverOverBox] = React.useState(false);
    const [scrolling, setScrolling] = React.useState(false);
    const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const handleScroll = () => {
        setScrolling(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setScrolling(false), 800);
    };


    // "5 minutes ago"
    const toTimeAgo = (date: string) => {
        const createdAt = parseISO(date);
        return formatDistanceToNow(createdAt, { addSuffix: true });
    }

    return (
        <Popover
            elevation={0}
            open={isNotificationOpen}
            anchorEl={notificationAnchor}
            onClose={handleNotificationClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
                sx: {
                    width: 350,
                    maxHeight: 700,
                    mt: 1,
                    boxShadow: 4,
                    borderRadius: 2,
                }
            }}
            disableScrollLock
        >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6">Notifications</Typography>
                    {unreadCount > 0 && (
                        <Button size="small" onClick={async () => await markAllAsRead()}>
                            Mark all as read
                        </Button>
                    )}
                </Box>
            </Box>

            {isLoading ? (
                <Typography sx={{ p: 2, textAlign: "center" }}>Loading...</Typography>
            ) : errors ? (
                <Typography sx={{ p: 2, textAlign: "center", color: "error.main" }}>
                    Failed to load notifications: {errors}
                </Typography>
            ) : (
                <List
                    sx={{
                        p: 0,
                        maxHeight: 470,
                        overflowY: hoverOverBox ? "auto" : "hidden",
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": {
                            width: scrolling ? "6px" : "0px",
                            transition: "width 0.3s ease"
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(0,0,0,0.3)",
                            borderRadius: "3px"
                        }
                    }}
                    onMouseEnter={() => setHoverOverBox(true)}
                    onMouseLeave={() => {
                        setHoverOverBox(false);
                        setScrolling(false);
                    }}
                    onScroll={handleScroll}
                >
                    {notifications.map((notification: Notification, index: number) => (
                        <Box key={index} >
                            <ListItem
                                sx={{
                                    backgroundColor: notification.read ? "transparent" : "action.hover",
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "action.selected" },
                                }}
                                onClick={async () => await markAsRead(String(notification.id))}
                            >
                                <ListItemAvatar>
                                    <Avatar src={notification.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={notification.title}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.secondary" display="block">
                                                {notification.payload && Array.isArray(notification.payload)
                                                    ? notification.payload.map((item, i) => {
                                                        if (item.type === "text") {
                                                            return <span key={i}>{item.value}</span>;
                                                        }
                                                        if (item.type === "link") {
                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={item.url}
                                                                    style={{ color: "#1976d2", textDecoration: "none", margin: "0 5px" }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // prevent triggering markAsRead
                                                                    }}
                                                                >
                                                                    {item.text}
                                                                </a>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                    : notification.message}
                                            </Typography>

                                            <Typography component="span" variant="caption" color="text.secondary" display="block">
                                                {toTimeAgo(notification.created_at)}
                                            </Typography>
                                        </>
                                    }
                                />
                                {!notification.read && (
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            backgroundColor: "primary.main",
                                            ml: 1,
                                        }}
                                    />
                                )}
                            </ListItem>
                            {index < notifications.length - 1 && <Divider />}
                        </Box>
                    ))}
                            {notifications.length < 0 && "No notifications to show." }
                    {/* <Box sx={{ m: 1, textAlign: "center" }}>
                        <Button
                            color="secondary"
                            fullWidth
                            onClick={() => {
                                handleNotificationClose();
                                //router.push("/notifications");
                            }}
                        >
                            View All Notifications
                        </Button>
                    </Box> */}
                </List>
            )
            }
        </Popover >
    );
}
