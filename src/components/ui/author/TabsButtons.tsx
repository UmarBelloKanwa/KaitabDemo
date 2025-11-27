"use client";

import React from "react";
import Box from "@mui/material/Box";
//import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function TabsButton() {
  const pathname = usePathname(); // e.g. "/r/atomic/library"
  const router = useRouter();

  // Get last part of the path
  const isLibraryPage = pathname.endsWith("/library");
  // Split the path into segments
  const segments = pathname.split("/").filter(Boolean);
  // Example: ["r", "atomic", "library"]

  // Get the book ID (2nd segment in /r/:bookId/...)
  const bookId = segments[0];

  //const requireAuth = useAuthCheck();

  const handleNavigation = () => {
    if (isLibraryPage) {
      router.push(`/${bookId}`);
      setValue("activity");
    } else {
     // requireAuth(() => {
        router.push(`/${bookId}/library`);
        setValue("library");
     // });
    }
  };

  const [value, setValue] = React.useState(
    isLibraryPage ? "library" : "activity"
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleNavigation();
  };
  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiTabs-flexContainer": {
              gap: { xs: 6, sm: 9, md: 13 }, // 👈 works here
            },
            px: { xs: 0, sm: 3, md: 9 },
            minHeight: 36, // reduce total height of the Tabs bar
            "& .MuiTabs-indicator": {
              height: 2, // thinner bottom border
            },
          }}
          centered
        >
          <Tab
            label="Activity"
            value="activity"
            sx={{
              py: 0, // reduces vertical padding
              minHeight: 36, // aligns with Tabs bar height
            }}
          />

          <Tab
            label="Library"
            value="library"
            sx={{
              py: 0,
              minHeight: 36,
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
