// app/price/layout.tsx
"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
  
  }) {
  React.useEffect(() => {
    const drawer = document.getElementById("appDrawer");
    if (drawer) {
      drawer.style.display = "none";
    }
  }, []);

  return (
    <Dialog
      open={true} // always open for the /price page
      fullScreen // makes it fill the entire viewport
      hideBackdrop={true}   
      TransitionComponent={Transition}
      disableScrollLock={true}
      PaperProps={{
        sx: {
          bgcolor: "background.default",
          m: 0,
          borderRadius: 0,
          width: "100vw",
          minHeight: "100vh",
          maxWidth: "100vw",
        },
        elevation: 0,
      }}
      sx={{
        zIndex: 50
      }}
    >
      {/* optional top-right close button which can navigate away */}
      {children}
    </Dialog>
  );
}
