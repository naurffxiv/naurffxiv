"use client";

import { useCallback, useState } from "react";

export type ToastOptions = {
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  durationMs?: number;
};

type UseToastResult = {
  open: boolean;
  message: string;
  severity: ToastOptions["severity"];
  durationMs: number;
  showToast: (options: ToastOptions) => void;
  closeToast: () => void;
};

export function useToast(): UseToastResult {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<ToastOptions["severity"]>("info");
  const [durationMs, setDurationMs] = useState<number>(5000);

  const showToast = useCallback((options: ToastOptions) => {
    setMessage(options.message);
    setSeverity(options.severity ?? "info");
    setDurationMs(options.durationMs ?? 5000);
    setOpen(true);
  }, []);

  const closeToast = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    message,
    severity,
    durationMs,
    showToast,
    closeToast,
  };
}
