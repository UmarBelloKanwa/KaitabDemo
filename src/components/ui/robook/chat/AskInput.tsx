import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MicIcon from "@mui/icons-material/Mic";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { Author } from "@/types/author";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }
}

function AskInputBase({
  isExpanded = false,
  submitUserMessage,
}: {
  submitUserMessage: (txt: string) => Promise<void>;
  isExpanded?: boolean;
}) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [expanded, setExpanded] = React.useState(isExpanded);
  const [voiceErr, setVoiceErr] = React.useState<string | null>(null);

  const [isVoice, setIsVoice] = React.useState(false);

  const handleVoiceClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceErr("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = function (event: SpeechRecognitionEvent) {
      const text = event.results[0][0].transcript;
      setInputValue((prev) => `${prev} ${text}`);
    };

    recognition.onerror = function (event: SpeechRecognitionErrorEvent) {
      setVoiceErr(`Voice failed, ${event.error} error.`);
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onstart = function () {
      setIsVoice(true);
    };
    recognition.onend = function () {
      setIsVoice(false);
    };

    if (isVoice) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  React.useEffect(() => {
    if (voiceErr) {
      setTimeout(() => {
        setVoiceErr("");
      }, 3000);
    }
  }, [voiceErr]);

  const submit = async () => {
    if (inputValue.trim()) {
      try {
        await submitUserMessage(inputValue.trim());
      } catch (err) {
        console.log(err);
      }
    }
    setInputValue("");
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        textAlignLast: "center",
        width: { xs: "100%", sm: "100%", md: "90%" },
        m: "auto",
      }}
    >
      <Paper
        component="form"
        {...(!isExpanded && {
          onMouseEnter: () => {
            setExpanded(true);
          },
          onMouseLeave: () => {
            setExpanded(false);
          },
        })}
        elevation={1}
        sx={(theme) => ({
          textAlign: "left",
          textAlignLast: "left",
          backgroundColor: theme.palette.background.default,
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          boxShadow: 11,
          pt: 0,
          ...(!expanded
            ? {
                display: "flex",
                alignItems: "center",
                p: "2px 4px",
              }
            : {
                p: 2,
                pt: 0,
                pb: 2,
              }),
        })}
      >
        {(isVoice || voiceErr) && (
          <Typography
            variant="caption"
            color={"info"}
            sx={{ pb: 0, letterSpacing: 0.5 }}
          >
            {" "}
            {voiceErr ?? "Listening"}{" "}
          </Typography>
        )}

        <InputBase
          autoFocus
          {...(!expanded && {
            onInput: () => {
              setExpanded(true);
            },
          })}
          {...(!isExpanded &&
            !expanded && {
              onBlur: () => {
                setExpanded(false);
              },
            })}
          onFocus={(e) => {
            const length = e.target.value.length;
            e.target.setSelectionRange(length, length);
          }}
          placeholder="Ask me"
          sx={{
            mt: 0,
            pt: 0,
            width: "100%",
            maxHeight: "143.7px",
            overflowY: "auto",
            ...(!expanded && {
              flex: 1,
              m: 0,
              ml: 3,
              p: 0,
              input: {
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              },
            }),
          }}
          multiline={expanded}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          inputProps={{ "aria-label": "ask questions" }}
        />

        {!expanded && (
          <Tooltip title="Dictate">
            <IconButton
              size="medium"
              sx={{
                // color: "#94a3b8",
                p: "10px",
                "&:hover": {
                  backgroundColor: isVoice ? "transparent" : "rgb(12, 56, 117)",
                },
                ...(isVoice && {
                  backgroundColor: "rgb(12, 56, 117)",
                }),
              }}
              color="primary"
              aria-label="dictate"
            >
              <MicIcon />
            </IconButton>
          </Tooltip>
        )}
        {expanded && (
          <Box
            sx={{
              p: 0,
              m: 0,
              ml: -1.5,
              display: !expanded ? "none" : "flex",
              gap: 0,
            }}
          >
            <Box
              sx={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                borderRadius: 1,
                color: "text.secondary",
              }}
            >
              <Tooltip title="Dictate">
                <IconButton
                  size="medium"
                  onClick={handleVoiceClick}
                  sx={{
                    ...(isVoice && {
                      backgroundColor: "rgb(12, 56, 117)",
                    }),
                  }}
                  color="primary"
                  aria-label="dictate"
                >
                  <MicIcon />
                </IconButton>
              </Tooltip>

              {!isVoice && inputValue.trim() && (
                <Tooltip title="Submit">
                  <IconButton
                    onClick={submit}
                    size="medium"
                    color="primary"
                    //  type="submit"
                    //  aria-label="submit"
                    sx={{
                      bgcolor: "background.default",
                    }}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        )}
      </Paper>
      <Typography variant="caption" fontSize="x-small" sx={{ pb: 0, mt: 1 }}>
        Cortex can make mistakes. Check important info.
      </Typography>
    </Box>
  );
}

export default function AskInput({
  submitUserMessage,
  containerRef,
  authorHandle,
}: {
  submitUserMessage: (txt: string) => Promise<void>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  authorHandle: string;
}) {
  const [containerStyle, setContainerStyle] = React.useState<{
    left: number;
    width: string;
  } | null>(null);

  const queryClient = useQueryClient();
  const author: Author = queryClient.getQueryData(["author", authorHandle])!;

  React.useLayoutEffect(() => {
    function updatePosition() {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerStyle({ left: rect.left, width: rect.width + "px" });
      }
    }

    updatePosition(); // run immediately

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    if (containerRef?.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("scroll", updatePosition); // if page has horizontal scroll
    window.addEventListener("resize", updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // console.log(containerStyle);

  return (
    <>
      {containerStyle && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: containerStyle.left,
            // width control
            width: containerStyle.width,
            bgcolor: "background.default",
            pb: 1,
            px: 1,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            textAlign: "center",
          }}
        >
          {author.requires_upgrade || !author.monetization_enabled && (
            <Typography variant="caption" fontSize="x-small" sx={{ pb: 1 }}>
              Maximum 5 messages
            </Typography>
          )}
          <AskInputBase submitUserMessage={submitUserMessage} />
        </Box>
      )}
    </>
  );
}
