"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import type { Article } from "@/types/article";
import { useQueryClient } from "@tanstack/react-query";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { useRouter } from "next/navigation";

export default function SubscribeCard({ article }: { article: Article }) {
  const authCheck = useAuthCheck();
  const router = useRouter();

  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);

  const isLogin = !!user;
  const notPaid = article.requires_upgrade; // already
  const email = user?.contact ?? "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "primary.dark",
        textAlign: "center",
        my: 2,
        boxShadow: 11,
        borderRadius: 1,
        py: 4,
      }}
    >
      {isLogin && <Typography> Hi {email} </Typography>}

      <Typography variant="h6" fontSize={"17px"} fontWeight={800}>This article is for paid subcribers</Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          authCheck(() => {
            router.push("/subscribe");
          });
        }}
      >
        {notPaid && isLogin ? "Upgrade to paid" : "Subscribe"}
      </Button>

      {!isLogin && (
        <Typography
          variant="caption"
          onClick={() => {
            authCheck(() => {});
          }}
        >
          Already a paid subscriber? Sign in
        </Typography>
      )}
    </Box>
  );
}
