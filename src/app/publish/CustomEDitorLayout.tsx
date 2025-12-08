// app/price/layout.tsx
"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/navigation";

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
  return (
    <Dialog
      open={true} // always open for the /price page
      fullScreen // makes it fill the entire viewport
      TransitionComponent={Transition}
      disableScrollLock={true}
      PaperProps={{
        sx: {
          m: 0,
          borderRadius: 0,
          width: "100vw",
          minHeight: "100vh",
          maxWidth: "100vw",
        },
      }}
      hideBackdrop={false}
    >
      {/* optional top-right close button which can navigate away */}
      {children}
    </Dialog>
  );
}
