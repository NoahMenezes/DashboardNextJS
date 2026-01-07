"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
    // In a real app, use process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const clientId = "612878658844-2kegk8lptok4k091024l39i7bduup1s7.apps.googleusercontent.com"

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </NextThemesProvider>
        </GoogleOAuthProvider>
    )
}
