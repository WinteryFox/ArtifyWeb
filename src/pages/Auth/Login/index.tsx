import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {FormEventHandler, useState} from "react";
import {Api} from "../../../api";
import jwt_decode from "jwt-decode";
import {AxiosError, AxiosResponse} from "axios";
import Input from "../../../components/Input";
import {setUser} from "../../../api/store";
import {useAppDispatch} from "../../../api/hooks";

export default function Login() {
    const {t} = useTranslation("auth")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [disabled, setDisabled] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login: FormEventHandler<HTMLFormElement> = async (event) => {
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
                    email: email,
                    password: password,
                    device: device
                }
            )

            let subject = currentSubject ?? (jwt_decode(response.data.access_token) as any).sub

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

            Api.client.get<Api.User>("/users/@me")
                .then((response) => dispatch(setUser(response.data)))
                .catch()

            navigate("/")
        } catch (error) {
            setError("Unknown error occurred")

            if (error instanceof AxiosError) {
                let err = error as AxiosError<Api.Code, any>

                switch (err.response?.data.code) {
                    case 100:
                        setError(t("auth:confirm-email"))
                        break
                    case 101:
                        setError(t("auth:invalid-credentials"))
                        break
                    case 107:
                        setError(t("auth:account-disabled"))
                        break
                }
            }

            setDisabled(false)
        }
    }

    return <>
        <form className={"form"} onSubmit={login}>
            <h1>{t("welcome-back")}</h1>

            <Input id={"username"}
                   label={t("username")}
                   type={"text"}
                   error={error}
                   onChange={e => setEmail(e.target.value)}
                   required/>

            <Input id={"password"}
                   label={t("password")}
                   type={"password"}
                   error={error}
                   onChange={e => setPassword(e.target.value)}
                   required/>

            <button disabled={disabled} type={"submit"} className={"button"} style={{marginBottom: "0.2em"}}>
                {t("login")}
            </button>

            <Link className={"link"} to={"/auth/register"}>{t("need-account")}</Link>
        </form>
    </>
}
