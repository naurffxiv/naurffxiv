export type AuthErrorResult = {
  errorCode: string;
  displayMessage: string;
  decodedMessage: string | null;
  heading: string;
  status: string;
};

// TODO: Tech-debt: Centralize constants for error codes and auth having its own const folder
export const AuthErrorType = {
  AccessDenied: "AccessDenied",
  SessionExpired: "SessionExpired",
  Unauthenticated: "Unauthenticated",
  Callback: "Callback",
  Banned: "Banned",
  OAuthCallback: "OAuthCallback",
  UnexpectedMiddlewareError: "UnexpectedMiddlewareError",
  Unknown: "Unknown",
} as const;

export type AuthErrorCode = keyof typeof AuthErrorType;
