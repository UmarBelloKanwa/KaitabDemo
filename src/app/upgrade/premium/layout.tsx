// app/price/layout.tsx
"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PriceLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog
      open={true}              // always open for the /price page
      fullScreen               // makes it fill the entire viewport
      TransitionComponent={Transition}
      disableScrollLock={true}
      PaperProps={{
        sx: {
          m: 0,
          borderRadius: 0,
          width: "100vw",
          minHeight: "100vh",
          maxWidth: "100vw",
          overflowY: "auto"
        },
      }}
      // If your nav has extra-high zIndex, you can ensure the modal wins:
      sx={{ zIndex: (theme) => theme.zIndex.modal + 100 }}
      // optional: prevent closing by clicking backdrop; change as needed:
      hideBackdrop={false}
    >
      {/* optional top-right close button which can navigate away */}
      <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 1200 }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            // navigate back or to a safe page
            router.push("/");
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Place page content centered / full-size */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* children is your /price page content */}
        {children}
      </Box>
    </Dialog>
  );
}
