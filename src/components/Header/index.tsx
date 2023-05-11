import "./index.sass";
import "../Button/index.sass";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import store from "../../api/store";
import {Api} from "../../api";

export default function Header() {
    const {t} = useTranslation(["common", "auth"])
    const [self, setSelf] = useState<Api.User | null>(store.getState().self)

    store.subscribe(() => {
        const state = store.getState()
        setSelf(state.self)
    })

    return (
        <nav className={"header"}>
            <Link to={"/"} className={"branding"}>
                <img className={"logo"} alt={"Logo"} src={"/logo.svg"}/>
            </Link>

            <div className={"options"}>
                {self != null ?
                    <Link to={"/profile"} className={"user"}>
                        <span className={"icon"}>
                            <FontAwesomeIcon icon={faCircleUser}/>
                        </span>
                        <span>{self.username}</span>
                    </Link> :
                    <Link to={"/login"} className={"button"}>
                        <span className={"icon"}>
                            <FontAwesomeIcon icon={faRightToBracket}/>
                        </span>
                        <span>{t("auth:login")}</span>
                    </Link>}
            </div>
        </nav>
    )
}
