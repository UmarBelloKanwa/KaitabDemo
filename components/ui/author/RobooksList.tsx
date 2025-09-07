"use client";

import React from "react";
import Box from "@mui/material/Box";
import robooks from "@/data/robooksList";
import RobookCard from "./Author-RobookCard";

export default function RobooksList() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0, }}>
            {robooks.map((robook, index) => (
                <React.Fragment key={index}>
                    <RobookCard robook={robook} author={{
                        image: "/james-clear.jpg",
                        name: "James Clear",
                        handle: "@jamesclear",
                        time: "5h"
                    }} />
                </React.Fragment>
            ))}
        </Box>
    );
}