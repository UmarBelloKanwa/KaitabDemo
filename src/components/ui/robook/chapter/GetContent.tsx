import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Element } from "@/types/book";

export default function GetContent({ element }: { element: Element }) {
  switch (element.type) {
    case "head":
      return (
        <Typography
          variant="h6"
          component={element.contentRole || "h3"}
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {element.text}
        </Typography>
      );

    case "text":
      return (
        <Typography component="div" variant="body2" sx={{ mb: 1 }}>
          {element?.text}
        </Typography>
      );

    case "image":
      return (
        <Box
          component="img"
          src={element?.src}
          alt={element?.alt}
          sx={{
            mb: 2,
            // width: element.style?.width || "auto",
            // height: element.style?.height || "auto",
            borderRadius: 1,
            display: "block",
            width: "100%",
            height: "auto",
            maxWidth: "100%", // ensures never overflow
            objectFit: "contain",
          }}
        />
      );

    case "list":
      return (
        <Box
          component="ul"
          sx={{ pl: { sm: 1, md: 2 }, mb: 2, width: "100%", maxWidth: "100%" }}
        >
          {element?.items?.map((item, i) => (
            <Box component="li" key={i} sx={{ mb: 1 }}>
              <Typography variant="body2">{item}</Typography>
            </Box>
          ))}
        </Box>
      );

    case "table":
      return (
        <Box
          component="table"
          sx={{
            mb: 2,
            width: "100%", // ✅ makes table fit container
            maxWidth: "100%",
            borderCollapse: "collapse",
            overflowX: "auto",
            display: "block", // ✅ allows horizontal scroll if needed
          }}
        >
          <tbody>
            {element?.rows?.map((row, i) => (
              <Box component="tr" key={i}>
                {row?.map((cell, j) => (
                  <Box
                    component="td"
                    key={j}
                    sx={{
                      border: "1px solid grey",
                      borderColor: "grey.700",
                      borderRadius: 1,
                      p: 1,
                      fontSize: "13px",
                      wordBreak: "break-word",
                      // color: element.style?.color || "inherit",
                    }}
                  >
                    {cell}
                  </Box>
                ))}
              </Box>
            ))}
          </tbody>
        </Box>
      );

    default:
      return null;
  }
}
