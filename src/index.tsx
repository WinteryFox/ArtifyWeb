import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Illustration from "./pages/Illustration";
import Error from "./components/Error"

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "ja"],
        fallbackLng: "en",
        load: "languageOnly",
        defaultNS: "common",
        detection: {
            order: ['path', 'cookie', 'navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag'],
            lookupFromPathIndex: 0
        }
    })
    .then()

i18next.on("languageChanged", (language) => document.documentElement.setAttribute("lang", language))

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/illustrations/:id",
                element: <Illustration/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
