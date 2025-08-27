"use client";

import {
  Toolbar,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Container,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Search, Chat, Person, ChevronRight, Lock } from "@mui/icons-material";
import AuthorsList from "@ui/authorsList";
import CategoriesList from "@ui/categoriesList";


export default function Dashboard() {
  const theme = useTheme();

  const scenes = [
    {
      id: 1,
      title: "Kpop: Boy Vs. Girl Band",
      image: "/placeholder-t5igt.png",
      locked: true,
    },
    {
      id: 2,
      title: "Beatboxing With Nuns",
      image: "/placeholder-ii0sy.png",
      locked: true,
    },
    {
      id: 3,
      title: "Gunslinger I: New In Town",
      image: "/placeholder-l4hyq.png",
      locked: true,
    },
    {
      id: 4,
      title: "Gunslinger II: High Noon Standoff",
      image: "/placeholder-ork1w.png",
      locked: true,
    },
    {
      id: 5,
      title: "Gunslinger III: Outlaw Camp",
      image: "/placeholder-po16g.png",
      locked: true,
    },
    {
      id: 6,
      title: "Gunslinger IV: Wanted Poster",
      image: "/placeholder-po16g.png",
      locked: true,
    },
  ];

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
          <TextField
            placeholder="Search"
            size="small"
            variant="standard"
            sx={(theme) => ({ width: { xs: "99%", sm: "40%", md: "37%" }, bgcolor: "background.paper", borderRadius: 9, p: 1.3, px: 2, m: { xs: "auto" }, mt: 0, border: `1px solid ${theme.palette.divider}`, })}
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
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <CategoriesList />
        {/* For You Section */}
        <Box sx={{ my: 2 }}>
          <AuthorsList />
        </Box>


        {/* Robook Section */}

      </Container>
    </Box>
  );
}
