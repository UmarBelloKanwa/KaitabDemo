
import Box from "@mui/material/Box";

export default function RobookLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ minHeight: "100vh", width: "100%" }}>
            {children}
        </Box>
    )
}