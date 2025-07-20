"use client";
import React from "react";
import { Box } from "@mui/material";

import HomepageContent from "@/components/Homepage/HomepageContent";
import Hero from "@/components/Homepage/Hero";

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Hero />
        <HomepageContent />
      </Box>
    </Box>
  );
}
