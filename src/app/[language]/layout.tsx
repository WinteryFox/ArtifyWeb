// noinspection JSUnusedGlobalSymbols

import './globals.sass'
import React from "react";
// @ts-ignore TODO
import {dir} from "i18next";
import {languages} from "../i18n/settings"
import Navbar from "@/app/[language]/components/Navbar";

export async function generateStaticParams() {
    return languages.map((language: string) => ({language}))
}

// noinspection JSUnusedGlobalSymbols
export default function RootLayout(params: {
    children: React.ReactNode,
    params: {
        language: string
    }
}) {
    return (
        <html lang={params.params.language} dir={dir(params.params.language)}>
        <head/>
        <body>
        <Navbar language={params.params.language}/>
        {params.children}
        </body>
        </html>
    )
}
