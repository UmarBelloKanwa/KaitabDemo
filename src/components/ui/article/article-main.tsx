"use client";

import { EditorContent, EditorContext, Editor } from "@tiptap/react";

import { useEditor } from "@tiptap/react";
// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";

// --- Tiptap Node ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Styles ---
import "./simple-editor.scss";
// import StyledEditorBox from "@/components/ui/editor/StyledEditorBox";
import Box from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import type {Article} from "@/types/article";

export function MainArticleView({ article }: { article: Article }) {

  const inPreview = {
    editable: false, // make it read-only
    content: article.content, // initial content from main editor
    extensions: [
      StarterKit,
      Image,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem,
      Superscript,
      Subscript,
      Typography,
      HorizontalRule,
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  };

  const previewEditor = useEditor({
    ...inPreview,
  });

  return (
    <Box
      component="div"
    >
      <EditorContext.Provider value={{ editor: previewEditor as Editor }}>
          <Box>
            <MuiTypography variant="h5"> {article.title} </MuiTypography>
            <MuiTypography variant="h6"> {article.subtitle } </MuiTypography>
            <EditorContent
              editor={previewEditor}
              role="presentation"
              className="simple-editor-content"
            />
        </Box>
      </EditorContext.Provider>
    </Box>
  );
}
