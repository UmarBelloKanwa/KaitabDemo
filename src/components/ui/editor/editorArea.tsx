"use client";

import { useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  Avatar,
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
import {
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  TableChart,
  FormatListBulleted,
  FormatListNumbered,
  KeyboardArrowDown,
  Undo,
  Redo,
  FormatQuote,
  HorizontalRule,
} from "@mui/icons-material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Table as TableKit,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";

export function EditorComponent() {
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [byline, setByline] = useState("");
  const [showBylineDialog, setShowBylineDialog] = useState(false);
  const [bylineInput, setBylineInput] = useState("");
  const [styleAnchorEl, setStyleAnchorEl] = useState<null | HTMLElement>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Link.configure({ openOnClick: false }),
      Image,
      TableKit.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "<p>Start writing...</p>",
    editorProps: { attributes: { class: "ProseMirror" } },
    immediatelyRender: false,
  });

  // Actions
  const addLink = useCallback(() => {
    const url = window.prompt("Enter URL:");
    if (url && editor)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const insertTable = useCallback(() => {
    if (editor)
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
  }, [editor]);

  const handleSaveByline = () => {
    setByline(bylineInput);
    setShowBylineDialog(false);
  };

  const handleSaveArticle = () => {
    if (!editor) return;
    const contentJSON = editor.getJSON();
    const contentHTML = editor.getHTML();
    console.log("JSON:", contentJSON);
    console.log("HTML:", contentHTML);
  };

  if (!editor) return <div></div>;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        py: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          // bgcolor: theme.palette.background.paper,
          // borderRadius: theme.shape.borderRadius,
          // boxShadow: theme.shadows[1],
        }}
      >
        {/* Toolbar */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: "transparent",
            borderBottom: `1px solid ${theme.palette.divider}`,
            overflowX: "auto",
          }}
        >
          <Toolbar
            sx={{ px: 2, py: 1, gap: 0.5, minHeight: "auto", flexWrap: "wrap" }}
          >
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
              size="small"
              endIcon={<KeyboardArrowDown />}
              sx={{
                textTransform: "none",
                color: theme.palette.text.primary,
                fontSize: theme.typography.body2.fontSize,
              }}
              onClick={(e) => setStyleAnchorEl(e.currentTarget)}
            >
              Style
            </Button>
            <Menu
              anchorEl={styleAnchorEl}
              open={Boolean(styleAnchorEl)}
              onClose={() => setStyleAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                  setStyleAnchorEl(null);
                }}
              >
                <LooksOneIcon sx={{ mr: 1 }} fontSize="small" />
                Heading 1
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                  setStyleAnchorEl(null);
                }}
              >
                <LooksTwoIcon sx={{ mr: 1 }} fontSize="small" />
                Heading 2
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                  setStyleAnchorEl(null);
                }}
              >
                <Looks3Icon sx={{ mr: 1 }} fontSize="small" />
                Heading 3
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setStyleAnchorEl(null);
                }}
              >
                Paragraph
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().toggleBlockquote().run();
                  setStyleAnchorEl(null);
                }}
              >
                <FormatQuote sx={{ mr: 1 }} fontSize="small" />
                Blockquote
              </MenuItem>
            </Menu>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <FormatBold fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <FormatItalic fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <FormatStrikethrough fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}
            >
              <Code fontSize="small" />
            </IconButton>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <FormatListBulleted fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <FormatListNumbered fontSize="small" />
            </IconButton>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton size="small" onClick={addLink} title="Add Link">
              <LinkIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={addImage} title="Add Image">
              <ImageIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={insertTable} title="Insert Table">
              <TableChart fontSize="small" />
            </IconButton>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <Button
              size="small"
              endIcon={<KeyboardArrowDown />}
              sx={{
                textTransform: "none",
                color: theme.palette.text.primary,
                fontSize: theme.typography.body2.fontSize,
              }}
              onClick={(e) => setMoreAnchorEl(e.currentTarget)}
            >
              More
            </Button>
            <Menu
              anchorEl={moreAnchorEl}
              open={Boolean(moreAnchorEl)}
              onClose={() => setMoreAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  editor.chain().focus().setHorizontalRule().run();
                  setMoreAnchorEl(null);
                }}
              >
                <HorizontalRule sx={{ mr: 1 }} fontSize="small" />
                Divider
              </MenuItem>
              <MenuItem
                onClick={() => {
                  editor.chain().focus().clearContent().run();
                  setMoreAnchorEl(null);
                }}
              >
                Clear All
              </MenuItem>
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

          {/* Byline */}
          <Box sx={{ mb: 3 }}>
            <Chip
              avatar={
                <Avatar
                  sx={{
                    bgcolor: theme.palette.grey[500],
                    width: 28,
                    height: 28,
                    fontSize: theme.typography.caption.fontSize,
                  }}
                >
                  {byline.charAt(0) || "A"}
                </Avatar>
              }
              label={byline || "Add byline"}
              variant="outlined"
              onClick={() => {
                setBylineInput(byline);
                setShowBylineDialog(true);
              }}
              onDelete={() => setByline("")}
              sx={{
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary,
                fontWeight: 400,
                cursor: "pointer",
                "&:hover": { bgcolor: theme.palette.action.hover },
              }}
            />
          </Box>

          {/* Byline Dialog */}
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
              <Button onClick={() => setShowBylineDialog(false)}>Cancel</Button>
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
            borderTop: `1px solid ${theme.palette.divider}`,
            fontSize: theme.typography.body2.fontSize,
            color: theme.palette.text.secondary,
          }}
        >
          {`${editor.storage.characterCount?.characters() || 0} characters`}
        </Box>

        <Box sx={{ px: 3, py: 2 }}>
          <Button variant="contained" onClick={handleSaveArticle}>
            Save Article
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
