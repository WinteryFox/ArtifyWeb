import {Link, useParams} from "react-router-dom";
import "./index.sass"
import {Api} from "../../api";
import React, {useEffect, useState} from "react";
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Illustration() {
    const {id} = useParams()
    const [illustration, setIllustration] = useState<Api.Illustration | null>(null)

    useEffect(() => {
        Api.client.get(`/illustrations/${id}`)
            .then(illustration => setIllustration(illustration.data))
    }, [id])

    if (!illustration)
        return <>loading</>

    return (
        <div className={"artwork"}>
            <main>
                {illustration.hashes.map((hash) =>
                    <img key={hash as string}
                         alt={illustration.title}
                         src={`${Api.baseUrl}/assets/${hash}`}/>)}
            </main>
            <aside>
                <div className={"content"}>
                    <Link to={`/users/${illustration.author.id}`} className={"author"}>
                        {illustration.author.avatar ?
                            <img alt={"avatar"} src={`${Api.baseUrl}/assets/${illustration.author.avatar}`}/> :
                            <FontAwesomeIcon icon={faCircleUser} className={"avatar"}/>}

                        <div className={"text"}>
                            <div className={"username"}>{illustration.author.username}</div>
                            <div className={"handle"}>@{illustration.author.handle}</div>
                        </div>
                    </Link>
                    <div className={"title"}>{illustration.title}</div>
                    <div>
                        <div className={"body"}>
                            {illustration.body}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
