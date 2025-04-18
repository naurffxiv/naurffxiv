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
        <div className="absolute top-1/2 left-[8%] -translate-x-[4%] xl:left-1/2 xl:-translate-x-1/2 -translate-y-1/2 shadow-[24] p-1">
          <Image src={src} {...props} />
        </div>
      </Modal>
    </>
  );
}
