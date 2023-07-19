import {Api} from "../../api";
import {Link} from "react-router-dom";
import React from "react";
import "./index.sass";

export default function Thumbnail(props: {
    illustration: Api.Illustration
}) {
    return <Link to={`/illustrations/${props.illustration.id}`} className={"thumbnail"}>
        <picture>
            <source srcSet={`${Api.baseUrl}/assets/${props.illustration.hashes[0]}?size=512`}
                    media={"(min-width: 1000px)"}/>
            <source srcSet={`${Api.baseUrl}/assets/${props.illustration.hashes[0]}?size=256`}
                    media={"(min-width: 600px)"}/>
            <img alt={props.illustration.title}
                 src={`${Api.baseUrl}/assets/${props.illustration.hashes[0]}?size=512`}/>
        </picture>

        <div>
            <div>
                <p>{props.illustration.title}</p>
            </div>

            <div>
                <p>{props.illustration.author.username}</p>
            </div>
        </div>
    </Link>
}
