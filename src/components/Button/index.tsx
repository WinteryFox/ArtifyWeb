import "./index.sass"

export default function Button(props: {children: string | null | JSX.Element}) {
    return (
        <button className={"button"}>
            {props.children}
        </button>
    )
}
