import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Element } from "@/types/book";

export default function GetContent({ element }: { element: Element }) {
  const { type, contentRole } = element;
  if (type === "head") {
    return (
      <Typography
        variant="h6"
        component={contentRole}
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        {element.text}
      </Typography>
    );
  } else if (type === "text") {
    return (
      <Typography component="div" variant="body2" sx={{ mb: 1 }}>
        {element.text}
      </Typography>
    );
  } else if (type === "image") {
    return (
      <Box component="img" src={element.src} alt={element.alt} sx={{ mb: 1 }} />
    );
  } else if (type === "list") {
    return (
      <Typography component="div" variant="body2" sx={{ mb: 1 }}>
        {element.text}
      </Typography>
    );
  } else if (type === "table") {
    return (
      <Typography component="div" variant="body2" sx={{ mb: 1 }}>
        {element.text}
      </Typography>
    );
  }
  return <></>;
}
