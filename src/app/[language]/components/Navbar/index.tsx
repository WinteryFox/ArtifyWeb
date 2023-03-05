import {useTranslation} from "@/app/i18n";

export default async function Index(params: { language: string }) {
    const {t} = await useTranslation(params.language)

    return (
        <header>
            <nav>
                {t("name")}
            </nav>
        </header>
    )
}
