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
import RobookCard from "@ui/author/RobookCard";
import { useInfiniteAuthors } from "@/hooks/author/useInfiniteAuthors";
import { useInfiniteBooksTofollow } from "@/hooks/robook/useInfiniteRobooksToFollow";

export function Page({ page }: { page: "contents" | "creators" }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [activePage, setActivePage] = React.useState(page);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAuthors();

  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const creators = data?.pages.flat() || [];
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

  // console.log("Authors", creators);

  // Books infinite query
  const {
    data: booksData,
    fetchNextPage: fetchNextBooks,
    hasNextPage: booksHasNextPage,
    isFetchingNextPage: isFetchingNextBooks,
  } = useInfiniteBooksTofollow();

  const booksLoaderRef = React.useRef<HTMLDivElement | null>(null);
  const books = booksData?.pages.flat() || [];

  React.useEffect(() => {
    if (!booksHasNextPage || isFetchingNextBooks) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextBooks();
    });

    const node = booksLoaderRef.current;
    if (node) observer.observe(node);

    return () => observer.disconnect();
  }, [booksHasNextPage, isFetchingNextBooks, fetchNextBooks]);

  return (
    <Container maxWidth="sm" sx={{ my: 2 }}>
      <Paper elevation={0} sx={{ bgcolor: "background.default" }}>
        <Box p={0}>
          <TextField
            fullWidth
            placeholder="Search Feedple "
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
                value={activePage}
                exclusive
                onChange={(event, newPage) => {
                  if (newPage !== null) {
                    router.replace(`/${newPage}`);
                    setActivePage(newPage);
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
                <ToggleButton value="creators" sx={{ mr: 1 }}>
                  Creators
                </ToggleButton>
                <ToggleButton value="contents"> Contents </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>
        {activePage === "creators" && (
          <>
            {creators.length === 0 ? (
              <p style={{ padding: "1rem", textAlign: "center", opacity: 0.7 }}>
                No creators to show yet
              </p>
            ) : (
              <List>
                {creators.map((author, index) => (
                  <React.Fragment key={index}>
                    <AuthorsList member={author} />
                    {index < creators.length - 1 && <Divider />}
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

        {activePage === "contents" && (
          <>
            {books.length === 0 ? (
              <p style={{ padding: "1rem", textAlign: "center", opacity: 0.7 }}>
                No books available to explore right now.
              </p>
            ) : (
              <List>
                {books.map((book: any, index: number) => (
                  <Box key={index} sx={{ mb: 1.5 }}>
                    <RobookCard robook={book} where="profile" />
                  </Box>
                ))}

                {/* Infinite trigger */}
                <div ref={booksLoaderRef} />

                {isFetchingNextBooks && (
                  <p style={{ padding: "0.5rem", textAlign: "center" }}>
                    Loading more books...
                  </p>
                )}
              </List>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}

export default function Authors() {
  return <Page page="creators" />;
}
