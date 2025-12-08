"use client";

import { useState, useCallback } from "react";
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
  FormatQuote,
  HorizontalRule,
} from "@mui/icons-material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Table as TableKit,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extensions";

export default function useTipTapEditor() {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [styleAnchorEl, setStyleAnchorEl] = useState<null | HTMLElement>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Link.configure({ openOnClick: false }),
      Image,
      TableKit.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
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

  const handleSaveArticle = () => {
    if (!editor) return;
    const contentJSON = editor.getJSON();
    const contentHTML = editor.getHTML();
    console.log("JSON:", contentJSON);
    console.log("HTML:", contentHTML);
  };

  if (!editor) return null;

  const handleCreateLink = () => {
    if (!editor || !linkUrl) return;

    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;

    if (hasSelection) {
      // Case 1: Apply link to selected text
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .setTextSelection({
          from: to,
          to: to,
        }) // move cursor after the selection
        .unsetLink() // remove active link mark
        .run();
    } else {
      // Case 2: Insert new text as link
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: linkText || linkUrl,
          marks: [{ type: "link", attrs: { href: linkUrl } }],
        })
        .setTextSelection({
          from: editor.state.selection.to,
          to: editor.state.selection.to,
        }) // move cursor after inserted link
        .unsetLink() // ensure further typing is normal
        .run();
    }

    setLinkText("");
    setLinkUrl("");
    setShowLinkDialog(false);
  };

  const styleMenuItems = [
    {
      label: "Heading 1",
      icon: LooksOneIcon,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      icon: LooksTwoIcon,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      icon: Looks3Icon,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Paragraph",
      icon: null,
      action: () => editor.chain().focus().setParagraph().run(),
    },
    {
      label: "Blockquote",
      icon: FormatQuote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
  ];

  const formatButtons = [
    {
      icon: FormatBold,
      active: "bold",
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: FormatItalic,
      active: "italic",
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: FormatStrikethrough,
      active: "strike",
      action: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: Code,
      active: "code",
      action: () => editor.chain().focus().toggleCode().run(),
    },
  ];

  const listButtons = [
    {
      icon: FormatListBulleted,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: FormatListNumbered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
  ];

  const insertButtons = [
    {
      icon: LinkIcon,
      title: "Add Link",
      action: () => setShowLinkDialog(true),
    },
    { icon: ImageIcon, title: "Add Image", action: addImage },
    { icon: TableChart, title: "Insert Table", action: insertTable },
  ];

  const moreMenuItems = [
    {
      label: "Divider",
      icon: HorizontalRule,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Clear All",
      icon: null,
      action: () => editor.chain().focus().clearContent().run(),
    },
  ];

  const togglePreview = () => {
    setPreview(!preview);
  };

  return {
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
    linkText,
  };
}
