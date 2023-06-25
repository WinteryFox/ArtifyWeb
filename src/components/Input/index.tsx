import {ChangeEventHandler, MouseEventHandler, useState} from "react";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Input(props: {
    id: string
    label: string
    type: "text" | "email" | "password" | "search" | "tel"
    onChange: ChangeEventHandler<HTMLInputElement>
    required?: boolean | null
    placeholder?: string | null
    error?: string | null
}) {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisible: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        setPasswordVisible(!passwordVisible)
    }

    return <>
        <label htmlFor={props.id}>
            {props.label}
            <span className={"required"}>
                {props.required && "*"} {props.error && <span> - {props.error}</span>}
            </span>
        </label>

        <div className={"input"}>
            <div className={"input-container"}>
                <input type={passwordVisible ? "text" : props.type}
                       id={props.id}
                       onChange={e => props.onChange(e)}
                       required={props.required ?? false}/>
            </div>

            {props.type == "password" &&
                <button onClick={togglePasswordVisible}>
                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash}/>
                </button>}
        </div>
    </>
}