"use client";

import React from "react";
import { Box, Container, Typography, Divider, Link, } from "@mui/material";

export default function TermsOfService() {
  return (
    <Box sx={{ bgcolor: "background.default", py: 6, minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          Feedple Terms of Service
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>Effective Date:</strong> December 16, 2025
        </Typography>

        <Typography paragraph>
          Welcome to Feedple! By accessing or using our platform, you agree to
          these terms. Feedple is launching <strong>before official business registration</strong>, and full legal compliance will apply after registration. Please read carefully.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 1. Account Eligibility */}
        <Typography variant="h5" gutterBottom>
          1. Account Eligibility
        </Typography>
        <Typography paragraph>
          - Authors/creators must be <strong>18 or older</strong> to create an account.
        </Typography>
        <Typography paragraph>
          - Audience members can be of any age, but children under 13 should
          use Feedple only with parental guidance.
        </Typography>
        <Typography paragraph>
          - Keep your login credentials secure; you are responsible for all
          activity on your account.
        </Typography>
        <Typography paragraph>
          - We may suspend or terminate accounts that violate these Terms.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 2. Content Ownership */}
        <Typography variant="h5" gutterBottom>
          2. Content Ownership
        </Typography>
        <Typography paragraph>
          - You retain ownership of content you create (posts, writings, uploads, and Companion outputs).
        </Typography>
        <Typography paragraph>
          - By posting content, you grant Feedple a <strong>limited license</strong> to host, display, and operate the platform.
        </Typography>
        <Typography paragraph>
          - You may not post content that is harmful, illegal, infringing, or violates these Terms.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 3. Personal Companion */}
        <Typography variant="h5" gutterBottom>
          3. Personal Companion
        </Typography>
        <Typography paragraph>
          - Your Companion is an AI aide trained only on your published content, with your explicit consent.
        </Typography>
        <Typography paragraph>
          - It is <strong>not a representation of you as a person</strong>.
        </Typography>
        <Typography paragraph>
          - You control its actions, including posting, chatting, and deletion.
        </Typography>
        <Typography paragraph>
          - Legacy mode (post-death) requires your prior consent and heir approval.
        </Typography>
        <Typography paragraph>
          - You are responsible for monitoring Companion outputs.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 4. Prohibited Conduct */}
        <Typography variant="h5" gutterBottom>
          4. Prohibited Conduct
        </Typography>
        <Typography paragraph>
          - No impersonation, spam, harassment, or misuse of Companions.
        </Typography>
        <Typography paragraph>
          - Respect intellectual property, privacy, and local laws.
        </Typography>
        <Typography paragraph>
          - Do not attempt to interfere with the platform, reverse engineer, or exploit vulnerabilities.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 5. Beta Disclaimer */}
        <Typography variant="h5" gutterBottom>
          5. Beta Disclaimer
        </Typography>
        <Typography paragraph>
          - Feedple is in an early-stage launch. Use at your own risk.
        </Typography>
        <Typography paragraph>
          - Features may change, be limited, or discontinued without notice.
        </Typography>
        <Typography paragraph>
          - We provide <strong>no warranties</strong> regarding accuracy, reliability, or uptime.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 6. Limitation of Liability */}
        <Typography variant="h5" gutterBottom>
          6. Limitation of Liability
        </Typography>
        <Typography paragraph>
          - Feedple is <strong>not liable</strong> for any damages, loss, or claims arising from your use of the platform.
        </Typography>
        <Typography paragraph>
          - You agree to use the platform responsibly and understand the risks of beta software.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 7. Governing Law */}
        <Typography variant="h5" gutterBottom>
          7. Governing Law
        </Typography>
        <Typography paragraph>
          - Nigerian law governs these Terms.
        </Typography>
        <Typography paragraph>
          - Any disputes will be handled in Nigerian courts.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 8. Changes to Terms */}
        <Typography variant="h5" gutterBottom>
          8. Changes to Terms
        </Typography>
        <Typography paragraph>
          - Feedple may update these Terms.
        </Typography>
        <Typography paragraph>
          - Continued use of the platform constitutes acceptance of any changes.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 9. Contact */}
        <Typography variant="h5" gutterBottom>
          9. Contact
        </Typography>
        <Typography paragraph>
          Questions about these Terms can be sent to:{" "}
          <Link href="mailto:support@feedple.com">support@feedple.com</Link>
        </Typography>
      </Container>
    </Box>
  );
}
