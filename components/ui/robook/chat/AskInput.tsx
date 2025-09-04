import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

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

export default function AskInputBase({ isExpanded = false, borderRadius = "27px" }: { isExpanded?: boolean, borderRadius?: string | number }) {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [expanded, setExpanded] = React.useState(isExpanded);
    const [voiceErr, setVoiceErr] = React.useState<string | null>(null);


    const [file, setFile] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const handleUploadClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    }
    const handleFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) setFile(file);
    }
    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);


    React.useEffect(() => {
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }

    }, [file]);

    const [isVoice, setIsVoice] = React.useState(false);

    const handleVoiceClick = () => {

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setVoiceErr("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.lang = 'en-US';

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
        }
        recognition.onend = function () {
            setIsVoice(false);
        }

        if (isVoice) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    React.useEffect(() => {
        if (voiceErr) {
            setTimeout(() => { setVoiceErr(""); }, 3000);
        }
    }, [voiceErr]);

    const uploadBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);

    const cameraInputRef = React.useRef<HTMLInputElement | null>(null);
    const photosInputRef = React.useRef<HTMLInputElement | null>(null);
    const filesInputRef = React.useRef<HTMLInputElement | null>(null);

    const openCamera = () => cameraInputRef.current?.click();
    const openPhotos = () => photosInputRef.current?.click();
    const openFiles = () => filesInputRef.current?.click();

    const uploadOptions = [
        { label: "Camera", icon: <CameraAltIcon />, action: openCamera },
        { label: "Photos", icon: <PhotoLibraryIcon />, action: openPhotos },
        { label: "Files", icon: <InsertDriveFileIcon />, action: openFiles },
    ];

    return (
        <Paper
            component="form"
            {...(!isExpanded && {
                onMouseEnter: () => { setExpanded(true); },
                onMouseLeave: () => {
                    if (file) return;
                    setExpanded(false);
                }
            })}
            sx={(theme) => ({
                width: "100%",
                borderRadius,
                pt: 0,
                ...(!expanded ? {
                    display: 'flex', alignItems: 'center', p: '2px 4px',
                } : {
                    p: 2,
                    pt: 2,
                    pb: 2,
                })
            })}
        >
            {file &&
                <Box sx={{ display: file ? "flex" : "none", alignItems: 'center', mb: 2, ...(!expanded && { m: 2 }), gap: 0 }}>
                    {file && (
                        <>
                            {previewUrl ? (
                                <img src={previewUrl} alt={file.name} style={{ height: 75, width: 110, borderRadius: 8 }} />
                            ) : file.type === 'application/pdf' ? (
                                <>
                                    <PictureAsPdfIcon sx={{ fontSize: 40, }} />
                                    <span style={{ fontSize: 14 }}>{file.name}</span>
                                </>
                            ) : (
                                <>
                                    <InsertDriveFileIcon sx={{ fontSize: 40, }} />
                                    <span style={{ fontSize: 14 }}>{file.name}</span>
                                </>
                            )}
                            <IconButton size="small" onClick={handleRemoveFile} aria-label="remove file">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    )}
                </Box>
            }

            {(isVoice || voiceErr) && <Typography variant="caption" color={"info"} sx={{ pb: 1, letterSpacing: 0.5, }}> {voiceErr ?? "Listening"} </Typography>}


            <InputBase
                autoFocus
                {...(!expanded && {
                    onInput: () => { setExpanded(true); },
                })}
                {...((!isExpanded && !expanded) && {
                    onBlur: () => {
                        if (file) return;
                        setExpanded(false);
                    }
                })}
                onFocus={(e) => {
                    const length = e.target.value.length;
                    e.target.setSelectionRange(length, length);
                }}
                placeholder="Ask me"
                sx={{
                    mt: 0, pt: 0,
                    width: "100%",
                    maxHeight: "143.7px",
                    overflowY: "auto",
                    ...(!expanded && {
                        flex: 1, m: 0, ml: 3, p: 0,
                        input: {
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden"
                        }
                    })
                }}
                multiline={expanded}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                inputProps={{ 'aria-label': 'ask questions' }}
            />

            {
                !expanded && <Tooltip title="Dictate">
                    <IconButton size="medium"
                        sx={{
                            color: "#94a3b8",
                            p: '10px',
                            "&:hover": {
                                backgroundColor: isVoice ? "transparent" : "rgb(12, 56, 117)",
                            },
                            ...(isVoice && {
                                backgroundColor: "rgb(12, 56, 117)",
                            })
                        }} color="primary" aria-label="dictate">
                        <MicIcon />
                    </IconButton>
                </Tooltip>
            }
            {expanded &&
                <Box sx={{ p: 0, m: 0, ml: -1.5, display: !expanded ? "none" : "flex", gap: 0, }}>
                    {/* Hidden inputs */}
                    <div style={{ display: 'none' }} >
                        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChanged} />
                        <input ref={photosInputRef} type="file" accept="image/*" onChange={handleFileChanged} />
                        <input ref={filesInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.bmp,.webp" onChange={handleFileChanged} />
                    </div>

                    {/* <div>
                        <Tooltip title="Upload file">
                            <IconButton size="medium"
                                ref={uploadBtnRef}
                                onClick={() => setOpen(true)}
                                sx={{
                                    color: "#94a3b8",
                                    "&:hover": {
                                        backgroundColor: "rgba(148, 163, 184, 0.1)",
                                    },
                                }} type="button" aria-label="upload">
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Popover
                            id="mouse-over-popover"
                            open={open}
                            anchorReference="anchorEl"
                            anchorEl={uploadBtnRef.current}
                            anchorOrigin={{
                                vertical: 'top',     // align with top edge of button
                                horizontal: 'left'
                            }}
                            transformOrigin={{
                                vertical: 'bottom',  // popover's bottom will align to button's top
                                horizontal: 'left'
                            }}
                            onClose={() => setOpen(false)}
                        >
                            <List sx={(theme) => ({
                                width: 150,
                                color: 'white',
                                backgroundColor: "rgb(28, 70, 129)",
                                boxShadow:
                                    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
                                ...theme.applyStyles('dark', {
                                    boxShadow:
                                        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
                                })
                            })}>
                                {uploadOptions.map((option, index) => (
                                    <ListItemButton key={index} onClick={() => {
                                        option.action();
                                        setOpen(false); // close the popover after selection
                                    }} sx={{ display: { md: index === 0 ? 'none' : "" } }}>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 'unset', // remove default 40px width
                                                mr: 1,
                                                color: 'white',
                                                // add right margin for spacing
                                            }}
                                        >{option.icon}</ListItemIcon>
                                        <ListItemText primaryTypographyProps={{
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                        }} primary={option.label} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Popover>
                    </div> */}

                    <Box
                        sx={{
                            marginLeft: "auto",
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 1,
                            color: 'text.secondary',
                        }}
                    >
                        <Tooltip title="Dictate">
                            <IconButton size="medium"
                                onClick={handleVoiceClick}
                                sx={{
                                    color: "#94a3b8",
                                    "&:hover": {
                                        backgroundColor: isVoice ? "transparent" : "rgb(12, 56, 117)",
                                    },
                                    ...(isVoice && {
                                        backgroundColor: "rgb(12, 56, 117)",
                                    })
                                }} color="primary" aria-label="dictate">
                                <MicIcon />
                            </IconButton>
                        </Tooltip>


                        {(!isVoice && inputValue.trim()) && (
                            <Tooltip title="Submit">
                                <IconButton size="medium"
                                    sx={{
                                        color: "#94a3b8",
                                        "&:hover": {
                                            backgroundColor: "rgb(52, 129, 236)",
                                        },

                                    }} color="primary" type="submit" aria-label="submit">
                                    <ArrowUpwardIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Box>
            }
        </Paper >
    );
}