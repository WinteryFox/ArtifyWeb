import "./index.sass"
import "../Button/index.sass"
import {useTranslation} from "react-i18next";
import {Option} from "../Dropdown";
import {Link} from "react-router-dom";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const {t, i18n} = useTranslation(["common", "auth"])

    const options: Array<Option> = [
        {
            value: "en",
            label: "English"
        },
        {
            value: "ja",
            label: "Japanese"
        }
    ]

    let language = i18n.language

    return (
        <nav className={"header"}>
            <Link to={"/"} className={"branding"}>
                <img className={"logo"} alt={"Logo"} src={"/logo.svg"}/>
                <div className={"title"}>{t("title")}</div>
            </Link>

            <div className={"options"}>
                {/*<Dropdown value={language} options={options} onChange={(v) => language = v.value}/>*/}
                <Link to={"/login"} className={"button"}>
                    <FontAwesomeIcon icon={faRightToBracket}/>
                    <span>{t("auth:login")}</span>
                </Link>
            </div>
        </nav>
    )
}
