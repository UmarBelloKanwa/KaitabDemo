"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={(theme) => ({
        bgcolor: "background.default",
        borderBottom: "1px solid grey",
        borderTop: { xs: `1px solid ${theme.palette.divider}` },
        borderColor: "divider",
        px: 0,
        justifyContent: "center",
        alignItems: "baseline",
      })}
    >
      <Toolbar sx={{ my: "auto", p: 0, mx: 0, gap: { xs: 1, md: 1 } }}>
        <IconButton>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src="/zero-to-one.jpg"
            sx={{
              width: { xs: 37, sm: 40 },
              height: { xs: 37, sm: 40 },
              borderRadius: 1,
            }}
          >
            Zero To One
          </Avatar>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              gap: 0.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Zero To One
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              By Peter Theil
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
