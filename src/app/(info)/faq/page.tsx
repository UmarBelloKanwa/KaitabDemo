"use client";

import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import faqData from "@data/faq";

export default function FAQ() {
  return (
    <Box sx={{ py: 6, px: 3 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Image
              src="/app/logo.png"
              alt="Feedple logo"
              width={56}
              height={56}
            />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 400, mb: 1 }}
          >
            Feedple Support & How-To Guide
          </Typography>

          <Typography
            variant="body2"
            sx={{
              maxWidth: 520,
              mx: "auto",
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            Step-by-step guidance and answers to common questions to help you
            get started and use Feedple effectively.
          </Typography>
        </Box>

        {/* FAQ List */}
        <Box>
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                borderRadius: 0,
                  backgroundColor: "transparent",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0, py: 1,   backgroundColor: "transparent", }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 500, color: "text.primary" }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ px: 0, pb: 2,   backgroundColor: "transparent", }}>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.8,
                    color: "text.secondary",
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
