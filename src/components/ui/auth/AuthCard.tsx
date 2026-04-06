"use client";

import React from "react";
import SigninForm from "./signin";
import SignupForm from "./signup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery } from "@mui/material";

export default function AuthCard({
  displayAuthCard,
  setDisplayAuthCard,
}: {
  displayAuthCard: boolean;
  setDisplayAuthCard: (value: boolean) => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => setDisplayAuthCard(false);
  const [tab, setTab] = React.useState<"login" | "signup">("login");

  return (
    <Dialog
      open={displayAuthCard}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth={"xs"}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            border: isMobile ? "none" : "1px solid",
            bgcolor: "background.default",
            borderColor: "grey.800",
            borderRadius: isMobile ? 0 : 2,
            height: isMobile ? "100vh" : "auto",
            p: { xs: 0, md: 1 },
          },
          elevation: 0,
        },
      }}
    >
      {tab === "login" && (
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: isMobile ? 25 : 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ bgcolor: "background.default" }}>
        <Box
          sx={{
            textAlign: "center",
            m: "auto",
            display: "felx",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {tab == "login" && (
            <Box
              component="img"
              src="/app/logo.png"
              sx={{
                width: "50px",
                mb: 1,
                height: "50px",
              }}
            />
          )}

          {tab == "login" ? <SigninForm /> : <SignupForm />}
          <Typography
            component="div"
            sx={{
              textAlign: "center",
              m: "auto",
              width: "fit-content",
              mt: 1,
              display: "flex",
            }}
          >
            {tab == "login" ? "Don't" : "You"} have account &nbsp;
            <Typography
              color="secondary"
              component="span"
              onClick={() => setTab(tab == "login" ? "signup" : "login")}
              sx={{
                "&:hover": {
                  textDecorationLine: "underline",
                  cursor: "pointer",
                },
              }}
            >
              Sign {tab == "login" ? "up" : "in"}
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
