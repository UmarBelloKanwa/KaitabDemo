"use client";

import { EditorContent, EditorContext } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// Hooks
import { useTheme } from "@mui/material/styles";
import useSimpleEditor from "@/components/tiptap-templates/simple/use-simple-editor";
// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import BackButton from "@/components/ui/common/BackButton";


// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
// import StyledEditorBox from "@/components/ui/editor/StyledEditorBox";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import MuiButton from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>
      <Spacer />
      {isMobile && <ToolbarSeparator />}
      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
    </>
  );
};
const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>
    <ToolbarSeparator />
    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);
export function SimpleEditor() {
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
    setAlertOpen
  } = useSimpleEditor();
  return (
    <Box
      component="div"
      className="simple-editor-wrapper"
      sx={{ width: "100%", maxWidth: "100%" }}
    >
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
              onClick={() => requireAuth(async () => await handleSaveArticle())}
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Publish
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
                fontSize: theme.typography.h3.fontSize,
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
