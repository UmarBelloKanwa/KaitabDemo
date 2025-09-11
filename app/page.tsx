"use client";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import RobooksList from "@/components/ui/home/RobooksList";
import CategoriesList from "@/components/ui/home/CategoriesList";
import PostLists from "@/components/ui/home/PostList";


export default function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        color: "text.primary",
        bgcolor: "background.default",
        pt: { xs: 1, sm: 2.5 },

        //maxWidth: { xs: "100%", sm: "78.3vw" }
        //    maxWidth: "79%",
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              disableUnderline: true, // Also removes underline for standard variant
            }}
            sx={(theme) => ({
              width: { xs: "100%", sm: "40%", md: "37%" }, // full width on xs
              boxSizing: "border-box", // ensure padding + border don't exceed width
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 1,
              px: 2,
              m: { xs: "auto" },
              mt: 0,
              border: `1px solid ${theme.palette.divider}`,
            })}

          />
        </Toolbar>

      </Box>

      {/* Content */}
      <Container maxWidth="xl" disableGutters sx={{ width: "100%", py: 3, pt: 1, px: 1.7, }}>
        <CategoriesList />
        <RobooksList />
        <PostLists />
      </Container>
    </Box>
  );
}
