"use client";
import React from "react";
import { ContentCopy } from "@mui/icons-material";

export const CopyToClipboard = ({ children }) => {
  const textInput = React.useRef(null);

  const onCopy = () => {
    if (textInput.current !== null && textInput.current.textContent !== null)
      navigator.clipboard.writeText(textInput.current.textContent);
  };

  return (
    <div ref={textInput} className="relative">
      <button
        aria-label="Copy code"
        type="button"
        className="absolute right-2 top-2 w-10 h-10 p-1 rounded hover:bg-gray-700 active:bg-gray-600 transition-colors"
        onClick={onCopy}
      >
        <ContentCopy />
      </button>
      {children}
    </div>
  );
};
