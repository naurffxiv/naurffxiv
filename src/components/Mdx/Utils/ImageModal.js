"use client";

import Image from "next/image";
import Modal from "@mui/material/Modal";
import { useState } from "react";

// we can disable warnings for no alt-text as it will be provided by props
export default function ImageModal({ src, compressedExt = "avif", ...props }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let compressed = src.substr(0, src.lastIndexOf(".")) + `.${compressedExt}`;
  return (
    <>
      <button onClick={handleOpen} className="not-prose">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={compressed} {...props} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={props.alt}
        className="not-prose"
      >
        <div className="absolute top-1/2 left-[8%] -translate-x-[4%] xl:left-1/2 xl:-translate-x-1/2 -translate-y-1/2 shadow-[24] p-1">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={src} {...props} />
        </div>
      </Modal>
    </>
  );
}
