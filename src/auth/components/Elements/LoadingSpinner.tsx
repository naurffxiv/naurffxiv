"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import type { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import { logWarn } from "@/lib/logger/logger";

/**
 * A full-screen or inline loading spinner with an optional fallback message + refresh button.
 */
type LoadingSpinnerProps = {
  fullscreen?: boolean;
  message?: string | false;
  timeoutMs?: number;
  size?: number;
};

export default function LoadingSpinner({
  fullscreen = true,
  message = "Warming things up...",
  timeoutMs = 10000, // boom explode
  size = 48,
}: LoadingSpinnerProps): ReactElement {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      logWarn("LoadingSpinner:Timeout", { message });
      setShowFallback(true);
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [message, timeoutMs]);

  const handleRefresh = (): void => {
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={fullscreen ? "100vh" : "auto"}
      width="100%"
      role="status"
      aria-busy="true"
      aria-label="Loading content"
      textAlign="center"
      gap={2}
    >
      <CircularProgress size={size} color="primary" />

      {message !== false && (
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.9)",
            textShadow: "0 0 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {message}
        </Typography>
      )}

      {showFallback && (
        <>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "rgba(255, 255, 255, 0.7)",
              fontStyle: "italic",
            }}
          >
            This is taking longer than expected.
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={handleRefresh}
            sx={{
              mt: 1,
              borderColor: "rgba(255, 255, 255, 0.7)",
              color: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Refresh Page
          </Button>
        </>
      )}
    </Box>
  );
}
