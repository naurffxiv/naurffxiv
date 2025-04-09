"use client";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";

export default function ImageModal({ src, compressedExt = "avif", ...props }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let compressed = src.substr(0, src.lastIndexOf(".")) + `.${compressedExt}`;
  return (
    <>
      <button onClick={handleOpen} className="not-prose">
        <Image src={compressed} {...props} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={props.alt}
        className="not-prose"
      >
        <div className="image-modal">
          <Image src={src} {...props} />
        </div>
      </Modal>
    </>
  );
}
