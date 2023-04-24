import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export default function Index() {
    const error = useRouteError()
    console.error(error)

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <div>
                <h1>404: Not found</h1>
            </div>
        }
    }

    return (
        <div>
            <h1>Something went wrong! Try another page.</h1>
        </div>
    )
}
