"use client";

import {
  Toolbar,
  Box,
  Typography,
  TextField,
  Avatar,
  Container,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import RobooksList from "@/components/ui/home/RobooksList";
import CategoriesList from "@/components/ui/home/CategoriesList";
import PostLists from "@/components/ui/home/PostList";


export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        color: "text.primary",
        bgcolor: "background.default",
        overflow: "auto",
        pt: { xs: 1, sm: 2.5 }
      }}
    >
      {/* Header */}
      <Box>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Welcome back,
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 20, height: 20, fontSize: 13 }}>U</Avatar>
                <Typography variant="body1" color="text.primary" fontWeight={"500"}>
                  Umar Bello Kanwa
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" }, flex: 1 }}></Box>
          <TextField
            placeholder="Search"
            size="small"
            variant="standard"
            sx={(theme) => ({ width: { xs: "99%", sm: "40%", md: "37%" }, bgcolor: "background.paper", borderRadius: 2, p: 1, px: 2, m: { xs: "auto" }, mt: 0, border: `1px solid ${theme.palette.divider}`, })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              disableUnderline: true, // Also removes underline for standard variant
            }}
          />
        </Toolbar>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 3, pt: 1 }}>
        <CategoriesList />
        <RobooksList />
        <PostLists />
      </Container>
    </Box>
  );
}
