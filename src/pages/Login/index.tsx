import background from "./cherry_blossom.svg"
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {FormEventHandler, useState} from "react";
import {Api} from "../../api";
import jwt_decode from "jwt-decode";
import {AxiosResponse} from "axios";

export default function Login() {
    const {t} = useTranslation("auth")
    const navigate = useNavigate()

    const [disabled, setDisabled] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault()
        setDisabled(true)
        setError(null)

        const currentSubject = localStorage.getItem("current_subject")
        const deviceKey = localStorage.getItem(`${currentSubject}_device_key`)
        const deviceGroupKey = localStorage.getItem(`${currentSubject}_device_group_key`)
        const devicePassword = localStorage.getItem(`${currentSubject}_device_password`)
        let device: Api.Device | null = null
        if (deviceKey && deviceGroupKey && devicePassword)
            device = {
                key: deviceKey,
                group_key: deviceGroupKey,
                password: devicePassword
            }

        try {
            const response = await Api.client.post<Api.Jwt, AxiosResponse<Api.Jwt, any>, Api.LoginRequest>(
                "/login",
                {
                    email: username,
                    password: password,
                    device: device
                }
            )

            let subject = currentSubject != null
                ? currentSubject
                : (jwt_decode(response.data.access_token) as any).sub

            localStorage.setItem(`current_subject`, subject)
            localStorage.setItem(`${subject}_access_token`, response.data.access_token)
            localStorage.setItem(`${subject}_id_token`, response.data.id_token)
            localStorage.setItem(`${subject}_refresh_token`, response.data.refresh_token)
            localStorage.setItem(`${subject}_expiry`, String(Date.now() / 1000 + response.data.expires_in))

            if (response.data.device) {
                localStorage.setItem(`${subject}_device_key`, response.data.device.key)
                localStorage.setItem(`${subject}_device_group_key`, response.data.device.group_key)
                localStorage.setItem(`${subject}_device_password`, response.data.device.password)
            }

            navigate("/")
        } catch (ignored) {
            setError(t("invalid-credentials")!!)
            setDisabled(false)
        }
    }

    return <main className={"main"}>
        <div className={"background"}>
            <img alt={"background image"} src={background} className={"background-image"}/>
        </div>

        <form className={"form"} onSubmit={login}>
            <h1>{t("welcome-back")}</h1>

            <label htmlFor={"username"}>
                {t("username")}
                <span className={"required"}>
                    *
                    {error && <span> - {error}</span>}
                </span>
            </label>
            <input className={"input"}
                   type={"email"}
                   id={"username"}
                   style={{marginBottom: "1rem"}}
                   onChange={e => setUsername(e.target.value)}
                   required/>

            <label htmlFor={"password"}>
                {t("password")}
                <span className={"required"}>
                    *
                    {error && <span> - {error}</span>}
                </span>
            </label>
            <input className={"input"}
                   type={"password"}
                   id={"password"}
                   style={{marginBottom: "1rem"}}
                   onChange={e => setPassword(e.target.value)}
                   required/>

            <button disabled={disabled} type={"submit"} className={"button"} style={{marginBottom: "0.2em"}}>
                {t("login")}
            </button>

            <Link className={"link"} to={"/register"}>{t("need-account")}</Link>
        </form>
    </main>
}
