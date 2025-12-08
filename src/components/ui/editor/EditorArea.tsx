"use client";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Paper,
  Toolbar,
} from "@mui/material";
import { KeyboardArrowDown, Undo, Redo } from "@mui/icons-material";

import Button from "@mui/material/Button";
import BackButton from "@/components/ui/common/BackButton";
import { EditorContent } from "@tiptap/react";
import useTipTapEditor from "@/hooks/editor/useEditor";
import StyledEditorBox from "@/components/ui/editor/StyledEditorBox";

export function EditorComponent() {
  const theme = useTheme();

  const acts = useTipTapEditor();
  if (!acts) {
    return <></>;
  }

  const {
    editor,
    setStyleAnchorEl,
    styleAnchorEl,
    styleMenuItems,
    formatButtons,
    listButtons,
    insertButtons,
    setMoreAnchorEl,
    moreAnchorEl,
    moreMenuItems,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    handleSaveArticle,
    togglePreview,
    preview,
    handleCreateLink,
    showLinkDialog,
    setShowLinkDialog,
    setLinkText,
    setLinkUrl,
    linkUrl,
    linkText
  } = acts;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: 2,
          px: 2,
          bgcolor: "background.default",
          alignItems: "center",
        }}
      >
        <BackButton />

        <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant={preview ? "contained" : "outlined"}
            className={"elevated"}
            onClick={togglePreview}
            sx={{ textTransform: "none", px: 2 }}
          >
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSaveArticle();
            }}
          >
            Save Article
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {preview ? (
          <StyledEditorBox
            sx={{
              p: 2,
              bgcolor: "background.default",
              minHeight: "100vh",
              whiteSpace: "pre-wrap",
            }}
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
          />
        ) : (
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              minHeight: "100vh",
              pb: 3,
            }}
          >
            <Box
              sx={{
                maxWidth: 800,
                mx: "auto",
              }}
            >
              {/* Toolbar */}
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "transparent",
                }}
              >
                <Toolbar
                  sx={{
                    px: 2,
                    pb: 1,
                    gap: 1,
                    minHeight: "auto",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Undo/Redo */}
                  <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                  >
                    <Undo fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                  >
                    <Redo fontSize="small" />
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  {/* Style Menu */}
                  <Button
                    endIcon={<KeyboardArrowDown />}
                    sx={{ fontSize: "0.7rem" }}
                    onClick={(e) => setStyleAnchorEl(e.currentTarget)}
                  >
                    Style
                  </Button>
                  <Menu
                    anchorEl={styleAnchorEl}
                    open={Boolean(styleAnchorEl)}
                    onClose={() => setStyleAnchorEl(null)}
                    elevation={0}
                    sx={{ border: "1px solid", borderColor: "divider" }}
                  >
                    {styleMenuItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <MenuItem
                          key={i}
                          onClick={() => {
                            item.action();
                            setStyleAnchorEl(null);
                          }}
                          sx={{ fontSize: "0.7rem" }}
                        >
                          {Icon && <Icon sx={{ mr: 1 }} fontSize="small" />}
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Menu>

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  {/* Format Buttons */}
                  {formatButtons.map((btn, i) => {
                    const Icon = btn.icon;
                    return (
                      <IconButton
                        key={i}
                        size="small"
                        onClick={btn.action}
                        className={
                          editor.isActive(btn.active) ? "is-active" : ""
                        }
                      >
                        {Icon && <Icon fontSize="small" />}
                      </IconButton>
                    );
                  })}

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  {/* List Buttons */}
                  {listButtons.map((btn, i) => {
                    const Icon = btn.icon;
                    return (
                      <IconButton key={i} size="small" onClick={btn.action}>
                        {Icon && <Icon />}
                      </IconButton>
                    );
                  })}

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  {/* Insert Buttons */}
                  {insertButtons.map((btn, i) => {
                    const Icon = btn.icon;
                    return (
                      <IconButton
                        key={i}
                        size="small"
                        title={btn.title}
                        onClick={btn.action}
                      >
                        {Icon && <Icon />}
                      </IconButton>
                    );
                  })}

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  {/* More Menu */}
                  <Button
                    size="small"
                    endIcon={<KeyboardArrowDown />}
                    sx={{ textTransform: "none", fontSize: "0.7rem" }}
                    onClick={(e) => setMoreAnchorEl(e.currentTarget)}
                  >
                    More
                  </Button>
                  <Menu
                    anchorEl={moreAnchorEl}
                    open={Boolean(moreAnchorEl)}
                    onClose={() => setMoreAnchorEl(null)}
                    elevation={0}
                    sx={{ border: "1px solid", borderColor: "divider" }}
                  >
                    {moreMenuItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <MenuItem
                          key={i}
                          onClick={() => {
                            item.action();
                            setMoreAnchorEl(null);
                          }}
                          sx={{ fontSize: "0.7rem" }}
                        >
                          {Icon && <Icon />}
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Toolbar>
              </Paper>

              {/* Content Inputs */}
              <Box sx={{ px: 3, py: 1 }}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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

                <Dialog
                  maxWidth="xs"
                  open={showLinkDialog}
                  onClose={() => setShowLinkDialog(false)}
                  slotProps={{
                    paper: {
                      sx: {
                        border: "1px solid",
                        borderColor: "grey.800",
                        borderRadius: 2,
                        p: { xs: 0, md: 1 },
                      },
                      elevation: 0,
                    },
                  }}
                >
                  <DialogTitle>Create a link</DialogTitle>

                  <DialogContent sx={{ minWidth: 300 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Enter text"
                      fullWidth
                      variant="outlined"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                    />

                    <TextField
                      margin="dense"
                      label="Enter URL"
                      fullWidth
                      variant="outlined"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handleCreateLink} variant="contained">
                      Link
                    </Button>

                    <Button onClick={() => setShowLinkDialog(false)}>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* TipTap Editor */}
                <StyledEditorBox
                  sx={{
                    px: 0,
                    "& .ProseMirror": {
                      px: 0,
                      outline: "none",
                      minHeight: 300,
                      fontSize: theme.typography.body1.fontSize,
                      lineHeight: theme.typography.body1.lineHeight,
                      color: theme.palette.text.primary,
                      "& p.is-editor-empty:first-child::before": {
                        content: "attr(data-placeholder)",
                        color: "grey",
                        float: "left",
                        pointerEvents: "none",
                        height: 0,
                      },
                    },
                  }}
                >
                  <EditorContent editor={editor} />
                </StyledEditorBox>
              </Box>

              {/* Footer Stats */}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  bgcolor: theme.palette.background.default,
                  // borderTop: `1px solid ${theme.palette.divider}`,
                  fontSize: theme.typography.body2.fontSize,
                  color: theme.palette.text.secondary,
                }}
              >
                {`${
                  editor.storage.characterCount?.characters() || 0
                } characters`}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
