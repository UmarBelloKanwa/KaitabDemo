"use client";

import React from "react";
import { EditorContent, EditorContext } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { Toolbar } from "@/components/tiptap-ui-primitive/toolbar";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// Hooks
import { useTheme } from "@mui/material/styles";
import useSimpleEditor from "@/components/tiptap-templates/simple/use-simple-editor";
// --- Components ---
import BackButton from "@/components/ui/common/BackButton";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
// import StyledEditorBox from "@/components/ui/editor/StyledEditorBox";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import MuiButton from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import {
  MainToolbarContent,
  MobileToolbarContent,
} from "@/components/tiptap-templates/simple/MainToolbarContent";
import ConfirmPublishDialog from "@/components/ui/editor/ConfirmPublish";

export function SimpleEditor() {
  const [open, setOpen] = React.useState(true);

  const theme = useTheme();
  const {
    editor,
    isPreview,
    togglePreview,
    handleSaveArticle,
    toolbarRef,
    isMobile,
    height,
    rect,
    setMobileView,
    mobileView,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    previewEditor,
    isSubmitting,
    requireAuth,
    alertOpen,
    alertMessage,
    alertType,
    setAlertOpen,
  } = useSimpleEditor();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      component="div"
      className="simple-editor-wrapper"
      sx={{ width: "100%", maxWidth: "100%" }}
    >
      <ConfirmPublishDialog
        open={open}
        handleClose={handleClose}
        isSubmitting={isSubmitting}
        publish={async (isFree: boolean) => {
          requireAuth(() => handleSaveArticle(isFree));
        }}
      />

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alertType}
          variant="filled"
          onClose={() => setAlertOpen(false)}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <EditorContext.Provider value={{ editor }}>
        <Box
          sx={{
            display: "flex",
            m: 1,
            bgcolor: "background.default",
            alignItems: "center",
          }}
        >
          <BackButton />
          <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
            <MuiButton
              size="small"
              variant={isPreview ? "contained" : "outlined"}
              className={"elevated"}
              onClick={togglePreview}
              sx={{ textTransform: "none", px: 2 }}
            >
              {isPreview ? "Edit" : "Preview"}
            </MuiButton>
            <MuiButton
              fullWidth
              variant="contained"
              loading={isSubmitting}
              loadingPosition="end"
              // onClick={async () => await requireAuth(handleSaveArticle)
              onClick={handleClickOpen}
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Continue
            </MuiButton>
          </Box>
        </Box>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          {!isPreview && (
            <Toolbar
              ref={toolbarRef}
              style={{
                ...(isMobile
                  ? {
                      bottom: `calc(100% - ${height - rect.y}px)`,
                    }
                  : {}),
              }}
            >
              {mobileView === "main" ? (
                <MainToolbarContent
                  onHighlighterClick={() => setMobileView("highlighter")}
                  onLinkClick={() => setMobileView("link")}
                  isMobile={isMobile}
                />
              ) : (
                <MobileToolbarContent
                  type={mobileView === "highlighter" ? "highlighter" : "link"}
                  onBack={() => setMobileView("main")}
                />
              )}
            </Toolbar>
          )}
          <Box sx={{ m: 1 }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={isPreview}
              style={{
                width: "100%",
                fontSize: theme.typography.h4.fontSize,
                fontWeight: 300,
                color: theme.palette.text.primary,
                border: "none",
                outline: "none",
                marginBottom: theme.spacing(1),
                fontFamily: "inherit",
                background: "transparent",
              }}
            />
            <input
              type="text"
              placeholder="Add a subtitle..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              readOnly={isPreview}
              style={{
                width: "100%",
                fontSize: theme.typography.body1.fontSize,
                color: theme.palette.text.secondary,
                border: "none",
                outline: "none",
                marginBottom: theme.spacing(2),
                fontFamily: "inherit",
                background: "transparent",
              }}
            />
            <div style={{ display: isPreview ? "none" : "block" }}>
              <EditorContent
                editor={editor}
                role="presentation"
                className="simple-editor-content"
              />
            </div>
            <div style={{ display: isPreview ? "block" : "none" }}>
              <EditorContent
                editor={previewEditor}
                role="presentation"
                className="simple-editor-content"
              />
            </div>
          </Box>
        </Box>
      </EditorContext.Provider>
    </Box>
  );
}
