"use client";

import { ChangeEvent, ReactNode, useState } from "react";
import { Button, CircularProgress, TextField, TextFieldProps } from "@mui/material";

import { useLoadBanReason } from "./useLoadBanReason";

/**
 * Unban appeal form
 * TODO remove demoFlag when api is integrated
 * */
export default function UnbanAppeal(): ReactNode {
  const [demoFlag, setDemoFlag] = useState(0);

  const [appealExplanation, setAppealExplanation] = useState("");
  const [isAppealSubmitted, setIsAppealSubmitted] = useState(false);
  const [isAppealFailed, setIsAppealFailed] = useState(false);

  const { isReasonLoading, isReasonFailed, banReason } = useLoadBanReason(demoFlag);

  const showAppealForm = !isReasonLoading && !isReasonFailed && !isAppealSubmitted;

  return (
    <div className="w-full max-w-5xl ml-auto mr-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <p className={"text-2xl font-bold"} onClick={onDemoClick}>
            Ban Appeal Form
        </p>

        {isReasonLoading && (
          <div className={"flex flex-col items-center"}>
              <CircularProgress />
              Loading...
          </div>
        )}

        {isReasonFailed && (
          <div>An error occurred loading details, please try again later</div>
        )}

        {showAppealForm && (
          <>
            <p>
              Some information about the form and the process that they will go through here but idrk what
            </p>

            <div className={"flex gap-1"}>
              <p className="font-bold">Ban Reason:</p>
              {banReason}
            </div>

            <div>
              <p className={"font-bold"}>Why should you be unbanned?</p>

              <TextField
                className={"bg-white w-full"}
                slotProps={AppealExplanationSlotProps}
                multiline
                value={appealExplanation}
                onChange={onAppealExplanationChange}
              />
            </div>

            <Button
              variant={"outlined"}
              onClick={onSubmitAppeal}
            >
              Submit Appeal
            </Button>
          </>
        )}

        {isAppealFailed && (
          <div>Failed to submit appeal, please try again later</div>
        )}

        {isAppealSubmitted && (
          <div>Appeal submitted successfully</div>
        )}
      </div>
    </div>
  );

  function onDemoClick(): void {
    if(demoFlag === 0) setDemoFlag(1); // loading failed
    if(demoFlag === 1) setDemoFlag(2); // load success
    if(demoFlag === 2) {
      setDemoFlag(3); // submit success
      setIsAppealSubmitted(true);
      setIsAppealFailed(false);
    }
    if(demoFlag === 3) {
      setDemoFlag(4); // submit fail
      setIsAppealSubmitted(false);
      setIsAppealFailed(true);
    }
    if(demoFlag === 4) {
      setDemoFlag(0); // loading
      setIsAppealSubmitted(false);
      setIsAppealFailed(false);
    }
  }

  function onAppealExplanationChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setAppealExplanation(e.target.value);
  }

  function onSubmitAppeal(): void {
    // push reason to api
    // set two state flags based on api result
  }
}

/**
 * slotProps for appeal textarea
 * */
const AppealExplanationSlotProps: TextFieldProps["slotProps"] = {
  htmlInput: {
    maxLength: 256,
  }
};
