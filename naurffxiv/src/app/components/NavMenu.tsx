"use client";
import {signIn, signOut, useSession} from "next-auth/react";

function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
            {session?.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    }
    return (
        <div>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    );
}

export default function NavMenu() {
    return (
        <div>
            <AuthButton />
        </div>
    );
}