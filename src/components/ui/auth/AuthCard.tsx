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

export default function AuthCard({
  displayAuthCard,
  setDisplayAuthCard,
}: {
  displayAuthCard: boolean;
  setDisplayAuthCard: (value: boolean) => void;
}) {
  const handleClose = () => setDisplayAuthCard(false);
  const [tab, setTab] = React.useState<"login" | "signup">("login");

  return (
    <Dialog
      open={displayAuthCard}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            border: "1px solid red",
            borderColor: "grey.800",
            borderRadius: 2, // optional: rounded corners
            p: { xs: 0, md: 1 },
          },
          elevation: 0,
        }
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
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
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
