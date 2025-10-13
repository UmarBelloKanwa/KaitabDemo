"use client";

import * as React from "react";
import useUserTopics from "@/hooks/auth/useUserTopics";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "../ErrAlert";

export default function UserTopicsPage() {
  const {
    loadingTopic,
    selectedTopics,
    searchTerm,
    filteredCategories,
    handleToggleTopic,
    errors,
    submitTopics,
    isSubmitting,
  } = useUserTopics();

  return (
    <Stack
      sx={{
        opacity: isSubmitting ? 0.5 : 1,
        pointerEvents: isSubmitting ? "none" : "auto",
        transition: "opacity 0.4s ease-in-out",
        mt: 0,
      }}
    >
      <Box>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Choose your interests
        </Typography>
        {errors?.general && (
          <Alert severity="error" sx={{ textAlign: "left" }}>
            {errors?.general}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          {/* Topic List */}
          {Object.keys(filteredCategories).length === 0 ? (
            <Box>
              {loadingTopic ? (
                <Typography color="text.secondary">
                  Loading interests...
                </Typography>
              ) : (
                <Typography color="text.secondary">
                  {searchTerm ? "No topic found match" : "no topics"}
                </Typography>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                height: "55vh",
                overflowY: "scroll",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
                },
              }}
            >
              {Object.entries(filteredCategories).map(([category, topics]) => (
                <Box key={category} sx={{ display: "grid", mb: 2.3, gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ textAlign: "left", color: "primary.main" }}
                  >
                    {category}
                  </Typography>
                  <Grid container spacing={1}>
                    {topics.map((topic) => {
                      const isSelected = selectedTopics.some(
                        (t) => t.id === topic.id
                      );
                      return (
                        <Grid key={topic.id}>
                          <Chip
                            label={topic.name}
                            onClick={() => handleToggleTopic(topic)}
                            variant="outlined"
                            sx={{
                              cursor: "pointer",
                              transition: "all 0.2s ease-in-out",
                              bgcolor: isSelected
                                ? "primary.main"
                                : "transparent",
                              color: isSelected ? "white" : "inherit",
                              "&:hover": {
                                bgcolor: isSelected
                                  ? "primary.dark"
                                  : "primary.50",
                                transform: "translateY(-1px)",
                                boxShadow: 1,
                              },
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              ))}
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={selectedTopics.length === 0 || isSubmitting}
            loading={isSubmitting}
            loadingPosition="end"
            color="secondary"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              submitTopics();
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
