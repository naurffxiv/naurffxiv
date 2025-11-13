"use client";

import { useEffect, useState } from "react";

type BanReasonState = {
  isReasonLoading: boolean;
  isReasonFailed: boolean;
  banReason: string;
};

/**
 * Handling for loading and returning relevant flags and value of a user's ban reason
 * TODO: remove demoFlag when api is integrated
 *  (effect dependency should be empty squares)
 * */
export function useLoadBanReason(demoFlag: number): BanReasonState {
  const [isReasonLoading, setIsReasonLoading] = useState(true);
  const [isReasonFailed, setIsReasonFailed] = useState(false);
  const [banReason, setBanReason] = useState("");

  useEffect(() => {
    // pull from api
    // set two state flags and banReason based on result

    if (demoFlag === 0) {
      // loading
      setIsReasonLoading(true);
      setIsReasonFailed(false);
      setBanReason("");
    }

    if (demoFlag === 1) {
      // load fail
      setIsReasonLoading(false);
      setIsReasonFailed(true);
      setBanReason("");
    }

    if (demoFlag === 2) {
      // load success
      setIsReasonLoading(false);
      setIsReasonFailed(false);
      setBanReason("Greeding Stillness");
    }
  }, [demoFlag]);

  return {
    isReasonLoading,
    isReasonFailed,
    banReason: banReason || (isReasonLoading ? "" : "none"),
  };
}
