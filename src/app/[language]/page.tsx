import styles from './page.module.css'
import {useTranslation} from "@/app/i18n";

// noinspection JSUnusedGlobalSymbols
export default async function Home(params: { language: string }) {
  const {t} = await useTranslation(params.language)

  return (
    <main className={styles.main}>
      Henlo, world!
    </main>
  )
}
