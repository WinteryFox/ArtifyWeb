import styles from './page.module.sass'
import {RouteParams, useTranslation} from "@/app/i18n";

// noinspection JSUnusedGlobalSymbols
export default async function Home(params: RouteParams) {
    const {t} = await useTranslation(params.params.language)

    return (
        <main className={styles.main}>
            {t("slogan")}
        </main>
    )
}
