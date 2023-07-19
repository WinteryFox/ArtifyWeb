import "./index.sass"
import React, {useEffect, useState} from "react";
import {Api} from "../../api";
import Thumbnail from "../../components/Thumbnail";
import Carousel from "../../components/Carousel";
import {useTranslation} from "react-i18next";

export default function Home() {
    const {t} = useTranslation(["home"])

    const [following, setFollowing] = useState<Array<Api.Illustration>>([])
    const [recent, setRecent] = useState<Array<Api.Illustration>>([])

    useEffect(() => {
        Api.client.get<Array<Api.Illustration>>("/illustrations?mode=4")
            .then(illustrations => setFollowing(illustrations.data))

        Api.client.get<Array<Api.Illustration>>("/illustrations?mode=3")
            .then(illustrations => setRecent(illustrations.data))
    }, [])

    return <section className={"carousels"}>
        <section>
            {following.length == 0 ?
                <></> :
                <>
                    <h1>{t("carousels.following")}</h1>
                    <Carousel>
                        {following.map((illustration) =>
                            <li key={illustration.id.toString()} className={"mosaic-element"}>
                                <Thumbnail illustration={illustration}/>
                            </li>)}
                    </Carousel>
                </>}
        </section>

        <section>
            {recent.length == 0 ?
                <></> :
                <>
                    <h1>{t("carousels.recent")}</h1>
                    <Carousel>
                        {recent.map((illustration) =>
                            <li key={illustration.id.toString()} className={"mosaic-element"}>
                                <Thumbnail illustration={illustration}/>
                            </li>)}
                    </Carousel>
                </>}
        </section>
    </section>
}
