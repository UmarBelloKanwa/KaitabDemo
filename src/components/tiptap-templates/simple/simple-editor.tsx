"use client";
import { useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
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
// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useTheme } from "@mui/material/styles";
// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import BackButton from "@/components/ui/common/BackButton";
// --- Lib ---
import { MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { editorStorage } from "@/lib/indexdb-storage";
// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
// import StyledEditorBox from "@/components/ui/editor/StyledEditorBox";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
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
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  );
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [editorContent, setEditorContent] = useState<any>({} as any);
  const [previewContent, setPreviewContent] = useState<any>({} as any);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageBlobs, setImageBlobs] = useState<{ [key: string]: Blob }>({});

  const handleImageUploadWithStorage = async (file: File): Promise<string> => {
    try {
      const blob = new Blob([file], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);

      const imageKey = `img_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      setImageBlobs((prev) => ({ ...prev, [imageKey]: blob }));

      return blobUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const inEditor = {
    content: editorContent,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUploadWithStorage,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  };

  const inPreview = {
    editable: false, // make it read-only
    content: previewContent, // initial content from main editor
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

  const editor = useEditor({
    ...inEditor,
  });

  const previewEditor = useEditor({
    ...inPreview,
  });

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const savedData = await editorStorage.load();
        if (savedData) {
          setTitle(savedData.title || "");
          setSubtitle(savedData.subtitle || "");
          setEditorContent(savedData.content || {});
          setImageBlobs(savedData.images || {});

          if (savedData.images) {
            const blobUrls: { [key: string]: string } = {};
            Object.entries(savedData.images).forEach(([key, blob]) => {
              blobUrls[key] = URL.createObjectURL(blob as Blob);
            });
          }
        }
      } catch (error) {
        console.error("Failed to load saved content:", error);
      }
      setIsLoaded(true);
    };

    loadContent();
  }, []);

  useEffect(() => {
    if (!isLoaded || !editor) return;

    const saveData = async () => {
      try {
        await editorStorage.save({
          title,
          subtitle,
          content: editor.getJSON(),
          images: imageBlobs,
        });
      } catch (error) {
        console.error("Failed to save content:", error);
      }
    };

    const timeoutId = setTimeout(saveData, 500);
    return () => clearTimeout(timeoutId);
  }, [title, subtitle, isLoaded, editor, imageBlobs]);

  useEffect(() => {
    if (!isLoaded || !editor) return;

    const saveContent = async () => {
      try {
        await editorStorage.save({
          title,
          subtitle,
          content: editor.getJSON(),
          images: imageBlobs,
        });
      } catch (error) {
        console.error("Failed to save content:", error);
      }
    };

    const debouncedSave = (() => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(saveContent, 500);
      };
    })();

    editor.on("update", debouncedSave);

    return () => {
      editor.off("update", debouncedSave);
    };
  }, [editor, title, subtitle, isLoaded, imageBlobs]);

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  useEffect(() => {
    if (isPreview && editor && previewEditor) {
      const content = editor.getJSON();
      previewEditor.commands.setContent(content);
    }
  }, [isPreview, editor, previewEditor]);

  const togglePreview = () => {
    if (!isPreview && editor && previewEditor) {
      const content = editor.getJSON();
      previewEditor.commands.setContent(content);
    }
    setIsPreview(!isPreview);
  };

  const handleSaveArticle = () => {
    if (!editor) return;
    const articleData = {
      title,
      subtitle,
      contentHTML: editor.getHTML(),
      contentJSON: editor.getJSON(),
      createdAt: new Date().toISOString(),
    };
    console.log(" SAVED ARTICLE:", articleData);
    // Example:
    // await fetch('/api/article', { method: 'POST', body: JSON.stringify(articleData) })
  };

  return (
    <Box
      component="div"
      className="simple-editor-wrapper"
      sx={{ width: "100%", maxWidth: "100%" }}
    >
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
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
              onClick={() => {
                handleSaveArticle();
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
