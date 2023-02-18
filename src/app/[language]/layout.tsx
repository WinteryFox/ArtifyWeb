// noinspection JSUnusedGlobalSymbols

import './globals.sass'
import React from "react";
// @ts-ignore TODO
import {dir} from "i18next";
import {languages} from "../i18n/settings"

export async function generateStaticParams() {
    return languages.map((language: string) => ({language}))
}

// noinspection JSUnusedGlobalSymbols
export default function RootLayout(
    {
        children,
        params: {
            language
        }
    }: {
        children: React.ReactNode,
        params: {
            language: string
        }
    }
) {
    return (
        <html lang={language} dir={dir(language)}>
        <head/>
        <body>{children}</body>
        </html>
    )
}
