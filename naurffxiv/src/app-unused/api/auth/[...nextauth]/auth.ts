import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
};

export const handler = NextAuth(authOptions);