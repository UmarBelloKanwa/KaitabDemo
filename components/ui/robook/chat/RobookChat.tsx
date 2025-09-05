import Box from "@mui/material/Box";
import AskInput from "@/components/ui/robook/chat/AskInput";
import ChatInterface from "@/components/ui/robook/chat/ChatInterface";


export default function RobookChat() {

    return (
        <Box sx={{
            width: "100%", m: "auto", position: "relative", left: 0,
        }}>
            <Box sx={{ flex: 1, overflowY: "auto", pt: 0, pb: { xs: 9, sm: 2 }, }}>
                <ChatInterface />
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    left: { xs: 0, sm: "unset" },
                    bottom: 0,
                    width: "100%",
                    m: "auto",
                    maxWidth: { xs: "100%", md: "33%" }, // it works base on the size of the screen, but not the size of the parent
                    display: 'flex',
                    bgcolor: "background.default",
                    p: 2, // You can control padding here
                }}

            >
                <Box sx={{ width: '100%', maxWidth: '100%', m: "auto" }}> {/* Constrain AskInput's width within the chat box */}
                    <AskInput borderRadius={2} />
                </Box>
            </Box>
        </Box>
    )

}