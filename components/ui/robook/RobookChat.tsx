import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AskInput from "@/components/ui/robook/AskInput";
import ChatInterface from "@/components/ui/robook/ChatInterface";
import Button from "@mui/material/Button";

export default function RobookChat() {
    return (
        <>
            <Box sx={{ flex: 1, overflowY: "auto", p: 1, pt: 0, pb: 2, }}>
                <ChatInterface />
            </Box>
            <Box
                sx={{
                    px: 2,
                    py: 1,
                    pb: 2,
                    position: "sticky",
                    bottom: 0,
                    bgcolor: "background.default",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box sx={{
                    width: { xs: "100%", sm: "80%" }, maxWidth: { xs: "100%", sm: "80%" }
                }}>
                    <AskInput borderRadius={2} />
                </Box>
            </Box >

        </>
    )
}