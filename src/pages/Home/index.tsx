import "./index.sass"
import React, {useEffect, useState} from "react";
import {Api, client} from "../../api";
import {Link} from "react-router-dom";

export default function Home() {
    const [illustrations, setIllustrations] = useState<Array<Api.Illustration> | null>(null)

    useEffect(() => {
        client.get<Array<Api.Illustration>>("/illustrations")
            .then(illustrations => setIllustrations(illustrations.data))
    }, [])

    return (
        !illustrations ? (
            <>loading</>
        ) : (
            <ul className={"mosaic"}>
                {illustrations.map((illustration) => (
                    <li key={illustration.id.toString()} className={"mosaic-element"}>
                        <Link to={`/illustrations/${illustration.id}`}>
                            <img loading={"lazy"} className={"mosaic-image"} alt={illustration.title}
                                 src={`http://localhost:8080/api/assets/${illustration.hashes[0]}?size=512`}
                                 srcSet={`http://localhost:8080/api/assets/${illustration.hashes[0]} 2x`}/>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    )
}
