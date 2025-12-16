"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
} from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Box sx={{ bgcolor: "background.default", py: 6, minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          Feedple Privacy Policy
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>Effective Date:</strong> December 16, 2025
        </Typography>

        <Typography paragraph>
          Feedple is committed to protecting your privacy. This policy explains
          how we <strong>collect, use, and protect your information</strong>{" "}
          during the initial launch of our platform. Feedple is launching{" "}
          <strong>before official business registration</strong>, and full legal
          compliance will apply after registration. By using Feedple, you
          acknowledge this early-stage status.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          1. Information We Collect
        </Typography>
        <Typography paragraph>We may collect data to provide and improve our services:</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Personal Information: Name, email, profile details, and birth date you provide." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Content Data: Posts, writings, or uploads you share to train your Personal Companion." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Usage Data: Interactions, IP address, device info, and logs for platform improvement." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Companion Data: Published content may be used to train your Companion, only with your consent." />
          </ListItem>
        </List>
        <Typography paragraph>
          We do <strong>not</strong> intentionally collect sensitive data (e.g., health, religion) unless voluntarily provided.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          2. How We Use Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="To create and manage your account and Personal Companion." />
          </ListItem>
          <ListItem>
            <ListItemText primary="To train your Companion solely on content you publish, with your consent." />
          </ListItem>
          <ListItem>
            <ListItemText primary="To enable following, chatting, and knowledge sharing." />
          </ListItem>
          <ListItem>
            <ListItemText primary="For internal analytics, security, and platform improvements." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Data is not sold or used for advertising." />
          </ListItem>
        </List>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          3. Sharing Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="With Your Consent: Content shared publicly or with other users as you choose." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Service Providers: Trusted vendors (e.g., cloud hosting) may access data for platform operation." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Legal Requirements: Only if required by law." />
          </ListItem>
        </List>
        <Typography paragraph>We do <strong>not</strong> sell or rent your data.</Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          4. Your Rights
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Access, correct, or delete your data." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Pause or delete Companion training data." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Opt out of features or data collection where possible." />
          </ListItem>
        </List>
        <Typography paragraph>
          Contact{" "}
          <Link href="mailto:support@feedple.com">support@feedple.com</Link> to exercise these rights.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          5. Security
        </Typography>
        <Typography paragraph>
          We implement standard security measures but cannot guarantee complete protection. Use strong passwords and report any issues.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          6. Data Retention
        </Typography>
        <Typography paragraph>
          Data is retained as needed for service operation. Deletion requests are handled promptly.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          7. Children’s Privacy
        </Typography>
        <Typography paragraph>
          Authors/creators on Feedple must be 18 or older.
        </Typography>
        <Typography paragraph>
          Audience members or readers can be of any age, but children under 13
          should use Feedple only with parental guidance.
        </Typography>
        <Typography paragraph>
          We do not knowingly collect sensitive personal information from users
          under 13 without parental consent.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          8. Changes
        </Typography>
        <Typography paragraph>
          This policy may be updated. Continued use of Feedple indicates acceptance.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          9. Contact
        </Typography>
        <Typography paragraph>
          Questions: <Link href="mailto:support@feedple.com">support@feedple.com</Link>
        </Typography>
      </Container>
    </Box>
  );
}
