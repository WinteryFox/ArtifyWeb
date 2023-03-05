import {RouteParams, useTranslation} from "@/app/i18n";

export default async function Head(params: RouteParams) {
    const {t} = await useTranslation(params.params.language)

    return (
        <>
            <title>{t("name")}</title>
            <meta content="width=device-width, initial-scale=1" name="viewport"/>
            <meta name="description" content={t("description")}/>
            <link rel="icon" href="/favicon.ico"/>
        </>
    )
}
