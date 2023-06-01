import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {FormEventHandler, useState} from "react";
import Input from "../../../components/Input";
import {Api} from "../../../api";
import {AxiosError} from "axios";

export default function Index() {
    const {t} = useTranslation(["auth"])
    const [error, setError] = useState<string | null>(null)

    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [handle, setHandle] = useState("")
    const [username, setUsername] = useState("")

    const register: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        setDisabled(true)

        try {
            await Api.client.post(
                "/register",
                {
                    email,
                    password,
                    handle,
                    username
                } as Api.RegisterRequest
            )
        } catch (error) {
            setError("Unknown error occurred")

            if (error instanceof AxiosError) {
                let err = error as AxiosError<Api.Code, any>

                switch (err.response?.data?.code) {
                    case 102:
                        setError(t("auth:invalid-password"))
                        break
                    case 103:
                        setError(t("auth:email-taken"))
                        break
                }
            }
        }

        setDisabled(false)
    }

    return <>
        <form className={"form"} onSubmit={register}>
            <h1>{t("create-account")}</h1>

            <Input id={"email"}
                   label={t("email")}
                   type={"email"}
                   error={error}
                   onChange={e => setEmail(e.target.value)}
                   required/>

            <Input id={"password"}
                   label={t("password")}
                   type={"password"}
                   onChange={e => setPassword(e.target.value)}
                   required/>

            <Input id={"handle"}
                   label={t("handle")}
                   type={"text"}
                   onChange={e => setHandle(e.target.value)}
                   required/>

            <Input id={"username"}
                   label={t("username")}
                   type={"text"}
                   onChange={e => setUsername(e.target.value)}
                   required/>

            <button disabled={disabled}
                    type={"submit"}
                    className={"button"}
                    style={{marginBottom: "0.2em"}}>
                {t("register")}
            </button>

            <Link className={"link"} to={"/auth/login"}>{t("have-account")}</Link>
        </form>
    </>
}
