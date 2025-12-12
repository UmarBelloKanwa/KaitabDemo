"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
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

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { publishArticle } from "@/lib/api/article";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { editorStorage } from "@/lib/indexdb-storage";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { useRouter } from "next/navigation";
import type { Article } from "@/types/article";
// import content from "./data/content.json";

export default function useSimpleEditor() {
  const router = useRouter();
  const requireAuth = useAuthCheck();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [images, setImages] = useState<
    {
      file: File;
      tempUrl: string;
    }[]
  >([]);

  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  );

  //const [errors, setErrors] = useState({ ...baseErr });

  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [editorContent, setEditorContent] = useState<any>({
    /*...content*/
  } as any);
  const [previewContent, setPreviewContent] = useState<any>({} as any);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageBlobs, setImageBlobs] = useState<{ [key: string]: Blob }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const handleImageUploadWithStorage = async (
    file: File,
    onProgress?: (event: { progress: number }) => void,
    abortSignal?: AbortSignal
  ): Promise<string> => {
    if (!file) {
      throw new Error("No file provided");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
      );
    }
    try {
      const blob = new Blob([file], { type: file.type });
      const tempUrl = URL.createObjectURL(blob);

      setImages((prev) => [...prev, { file, tempUrl }]);

      const imageKey = `img_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      6;
      setImageBlobs((prev) => ({ ...prev, [imageKey]: blob }));

      return tempUrl;
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

  const handleSaveArticle = async () => {
    if (!editor) return;
    setIsSubmitting(true);

    try {
      const res = await publishArticle({
        title,
        subtitle,
        content: editor.getJSON(),
        images: images,
      });
      const publishedArticle: Article = res.data as Article;
      setAlertMessage("Article published successfully!");
      setAlertType("success");
      setAlertOpen(true);
      router.push(`/${publishedArticle.author.handle}/library`)
    } catch (err: any) {
      setAlertMessage(err?.message || "Failed to publish article.");
      setAlertType("error");
      setAlertOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
