import React, {useEffect} from 'react';
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import "./index.sass"
import {useAppDispatch} from "./api/hooks";
import {setUser} from "./api/store";
import {Api} from "./api";

export default function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem("current_subject") != null)
            Api.client.get<Api.User>("/users/@me")
                .then((response) => dispatch(setUser(response.data)))
                .catch()
    }, [])

    return (
        <>
            <Header/>
            <main className={"main"}>
                <Outlet/>
            </main>
        </>
    );
}
