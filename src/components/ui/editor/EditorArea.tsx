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
    setShowBylineDialog,
    showBylineDialog,
    bylineInput,
    setBylineInput,
    handleSaveByline,
    handleSaveArticle,
    togglePreview,
    preview,
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
            sx={{ textTransform: "none", px: 2, }}
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
          <Box
            sx={{
              p: 2,
              bgcolor: "background.default",
             // border: `1px solid ${theme.palette.divider}`,
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
              <Box sx={{ px: 3, py: 3 }}>
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
                  open={showBylineDialog}
                  onClose={() => setShowBylineDialog(false)}
                >
                  <DialogTitle>Add Byline</DialogTitle>
                  <DialogContent sx={{ minWidth: 300 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Author name"
                      fullWidth
                      variant="outlined"
                      value={bylineInput}
                      onChange={(e) => setBylineInput(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setShowBylineDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveByline} variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* TipTap Editor */}
                <Box
                  sx={{
                    "& .ProseMirror": {
                      outline: "none",
                      minHeight: 300,
                      fontSize: theme.typography.body1.fontSize,
                      lineHeight: theme.typography.body1.lineHeight,
                      color: theme.palette.text.primary,
                      "& h1": {
                        fontSize: theme.typography.h4.fontSize,
                        fontWeight: theme.typography.h4.fontWeight,
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1),
                      },
                      "& h2": {
                        fontSize: theme.typography.h5.fontSize,
                        fontWeight: theme.typography.h5.fontWeight,
                        marginTop: theme.spacing(0.5),
                        marginBottom: theme.spacing(0.5),
                      },
                      "& h3": {
                        fontSize: theme.typography.h6.fontSize,
                        fontWeight: theme.typography.h6.fontWeight,
                        marginTop: theme.spacing(0.3),
                        marginBottom: theme.spacing(0.3),
                      },
                      "& p": { margin: theme.spacing(0.5, 0) },
                      "& ul, & ol": {
                        paddingLeft: theme.spacing(3),
                        margin: theme.spacing(0.5, 0),
                      },
                      "& li": { marginBottom: theme.spacing(0.25) },
                      "& blockquote": {
                        paddingLeft: theme.spacing(1),
                        borderLeft: `3px solid ${theme.palette.divider}`,
                        margin: theme.spacing(0.5, 0),
                        color: theme.palette.text.secondary,
                        fontStyle: "italic",
                      },
                      "& a": {
                        color: theme.palette.primary.main,
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                        margin: theme.spacing(0.5, 0),
                      },
                      "& table": {
                        borderCollapse: "collapse",
                        width: "100%",
                        margin: theme.spacing(0.5, 0),
                      },
                      "& th, & td": {
                        border: `1px solid ${theme.palette.divider}`,
                        padding: theme.spacing(0.5),
                        textAlign: "left",
                      },
                      "& th": {
                        backgroundColor: theme.palette.background.default,
                        fontWeight: 600,
                      },
                      "& code": {
                        backgroundColor: theme.palette.action.hover,
                        padding: theme.spacing(0.2, 0.4),
                        borderRadius: theme.shape.borderRadius,
                        fontFamily: "monospace",
                      },
                      "& pre": {
                        backgroundColor: theme.palette.action.hover,
                        padding: theme.spacing(1),
                        borderRadius: theme.shape.borderRadius,
                        overflow: "auto",
                      },
                      "& hr": {
                        borderTop: `1px solid ${theme.palette.divider}`,
                        margin: theme.spacing(1, 0),
                      },
                    },
                  }}
                >
                  <EditorContent editor={editor} />
                </Box>
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
