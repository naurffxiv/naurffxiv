import {
  authPages as pages,
  authSecret as secret,
  sessionConfig as session,
} from "./config";
import {
  jwt as jwtCallback,
  session as sessionCallback,
  signIn as signInCallback,
} from "./callbacks";
import { signIn as signInEvent, signOut as signOutEvent } from "./events";

import type { AuthOptions } from "next-auth";
import { providers } from "./providers";

//
// NextAuth master configuration
// Used in [...nextauth]/route.ts
//
export const authOptions: AuthOptions = {
  providers,
  session,
  pages,
  secret,
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    signIn: signInCallback,
    jwt: jwtCallback,
    session: sessionCallback,
  },
  events: {
    signIn: signInEvent,
    signOut: signOutEvent,
  },
};
