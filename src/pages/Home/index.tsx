import "./index.sass"
import React, {useEffect, useState} from "react";
import {Api} from "../../api";
import {Link} from "react-router-dom";

export default function Home() {
    const [illustrations, setIllustrations] = useState<Array<Api.Illustration> | null>(null)

    useEffect(() => {
        Api.client.get<Array<Api.Illustration>>("/illustrations")
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
                            <picture>
                                <source srcSet={`${Api.baseUrl}/assets/${illustration.hashes[0]}?size=512`}
                                        media={"(min-width: 1000px)"}/>
                                <source srcSet={`${Api.baseUrl}/assets/${illustration.hashes[0]}?size=256`}
                                        media={"(min-width: 600px)"}/>
                                <img alt={illustration.title} className={"mosaic-image"}
                                     src={`${Api.baseUrl}/assets/${illustration.hashes[0]}?size=512`}/>
                            </picture>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    )
}
