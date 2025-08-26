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


export default function Dashboard() {
  const theme = useTheme();

  const characters = [
    {
      id: 1,
      name: "Arrange fiancee",
      author: "@inkbase_",
      description: "💍 - Your arrange marriage with a mafia daughter",
      avatar: "/anime-girl-black-hair.png",
      interactions: "21.6k",
    },
    {
      id: 2,
      name: "Smash or pass bot",
      author: "@CertifiedHuman",
      description: "As the name suggests",
      avatar: "/placeholder-tm9hf.png",
      interactions: "33.7k",
    },
    {
      id: 3,
      name: "Zeke",
      author: "@AlivSalmonella",
      description: "🖤 - he wants some too..",
      avatar: "/placeholder-z55wu.png",
      interactions: "320.5k",
    },
    {
      id: 4,
      name: "Ex husband Alex",
      author: "@Mrs_Jeyu",
      description: "Ex-husband who wants to get you back||",
      avatar: "/placeholder-z55wu.png",
      interactions: "66.2k",
    },
  ];

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
            sx={{ width: { xs: "99%", sm: "40%", md: "37%" }, bgcolor: "background.paper", borderRadius: 9, p: 1.3, px: 2, m: { xs: "auto" }, mt: 0 }}
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
        {/* For You Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
            For you
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 2,
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": { borderRadius: 4 },
            }}
          >
            {characters.map((character) => (
              <Card
                key={character.id}
                sx={{
                  minWidth: 320,
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": { bgcolor: "action.hover" },
                  cursor: "pointer",
                  backgroundColor: "background.paper",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Avatar src={character.avatar} sx={{ width: 48, height: 48 }}>
                      {character.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {character.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        By {character.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {character.description}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Chat sx={{ fontSize: 14, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {character.interactions}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Scenes Section */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" color="text.primary">
              Scenes
            </Typography>
            <IconButton sx={{ color: "text.primary" }}>
              <ChevronRight />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 2,
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-track": { bgcolor: "background.paper" },
              "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 4 },
            }}
          >
            {scenes.map((scene) => (
              <Card
                key={scene.id}
                sx={{
                  minWidth: 256,
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: "hidden",
                  "&:hover": { bgcolor: "action.hover" },
                  cursor: "pointer",
                  backgroundColor: "background.paper",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={scene.image}
                    alt={scene.title}
                    sx={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                    }}
                  />
                  {scene.locked && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        borderRadius: 1,
                        p: 0.5,
                      }}
                    >
                      <Lock color="action" sx={{ fontSize: 12 }} />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: `linear-gradient(transparent, ${theme.palette.background.paper})`,
                      p: 2,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                      {scene.title}
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Person />}
                      sx={{
                        backgroundColor: "action.selected",
                        color: "text.primary",
                        textTransform: "none",
                        fontSize: "0.75rem",
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      Select Character
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
