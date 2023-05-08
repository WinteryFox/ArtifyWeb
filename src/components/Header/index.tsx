import "./index.sass"
import "../Button/index.sass"
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const {t} = useTranslation(["common", "auth"])

    return (
        <nav className={"header"}>
            <Link to={"/"} className={"branding"}>
                <img className={"logo"} alt={"Logo"} src={"/logo.svg"}/>
            </Link>

            <div className={"options"}>
                <Link to={"/login"} className={"button"}>
                    <FontAwesomeIcon icon={faRightToBracket}/>
                    <span>{t("auth:login")}</span>
                </Link>
            </div>
        </nav>
    )
}
