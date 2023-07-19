import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Illustration from "./pages/Illustration";
import Error from "./components/Error"
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {Provider} from "react-redux";
import store from "./api/store";
import background from "./pages/Auth/cherry_blossom.svg";

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "ja"],
        fallbackLng: "en",
        load: "all",
        defaultNS: "common",
        ns: "common",
        detection: {
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
            },
            {
                path: "/auth",
                element: <>
                    <div className={"background"}>
                        <img alt={"background image"} src={background} className={"background-image"}/>
                    </div>

                    <Outlet/>
                </>,
                children: [
                    {
                        path: "/auth/login",
                        element: <Login/>
                    },
                    {
                        path: "/auth/register",
                        element: <Register/>
                    }
                ]
            }
        ]
    },
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);
