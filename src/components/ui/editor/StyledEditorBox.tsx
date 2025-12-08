"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledEditorBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  minHeight: 300,
  whiteSpace: "pre-wrap",
  outline: "none",
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
}));

export default StyledEditorBox;
