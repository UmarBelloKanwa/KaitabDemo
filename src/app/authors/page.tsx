"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  List,
  Container,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import AuthorsList from "@/components/ui/authors-robooks/AuthorsList";
import RobookCard from "@ui/RobookCard";
import robooks from "@/data/robooksList";
import { useInfiniteAuthors } from "@/hooks/author/useInfiniteAuthors";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthors } from "@/lib/api/author";

export function Page({ page }: { page: "robooks" | "authors" }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("discover");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("followers");

  const [activePage, setActivePage] = React.useState(page);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAuthors();
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const authors = data?.pages.flat() || [];
  React.useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      observer.disconnect(); // safer than unobserve()
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!authors) return <h1> Sorry, failed to load authors</h1>;

  return (
    <Container maxWidth="sm" sx={{ my: 2 }}>
      <Paper elevation={0} sx={{ bgcolor: "background.default" }}>
        <Box p={0}>
          <TextField
            fullWidth
            placeholder="Search kaitab"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 20,
              },
            }}
          />
          <Box display="flex" gap={1} mt={1} flexWrap={"wrap"}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ToggleButtonGroup
                value={activeFilter}
                exclusive
                onChange={(event, newFilter) => {
                  if (newFilter !== null) {
                    setActiveFilter(newFilter);
                  }
                }}
                size="small"
                sx={{
                  "& .MuiToggleButton-root": {
                    borderRadius: 20,
                    px: 3,
                  },
                }}
              >
                <ToggleButton value="discover" sx={{ mr: 1 }}>
                  Authors
                </ToggleButton>
                <ToggleButton value="following"> Robooks </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          
          </Box>
        </Box>
        {page === "authors" && (
          <>
            {authors.length === 0 ? (
              <p style={{ padding: "1rem", textAlign: "center", opacity: 0.7 }}>
                No authors to show yet
              </p>
            ) : (
              <List>
                {authors.map((author, index) => (
                  <React.Fragment key={index}>
                    <AuthorsList member={author} />
                    {index < authors.length - 1 && <Divider />}
                  </React.Fragment>
                ))}

                {/* Infinite loading trigger */}
                <div ref={loaderRef} />

                {isFetchingNextPage && (
                  <p style={{ padding: "0.5rem", textAlign: "center" }}>
                    Loading more...
                  </p>
                )}
              </List>
            )}
          </>
        )}

        {page == "robooks" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            {robooks.map((robook: any, index) => (
              <React.Fragment key={index}>
                <RobookCard robook={robook} where="profile" />
              </React.Fragment>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default function Authors() {
  return <Page page="authors" />;
}
