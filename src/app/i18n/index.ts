import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'
// @ts-ignore
import {createInstance, ReactOptions} from "i18next";

export const initI18next = async (language: string, ns: string) => {
    // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
    const i18nInstance = createInstance()
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
        .init(getOptions(language, ns))
    return i18nInstance
}

export async function useTranslation(language: string, ns: string = "common", options: ReactOptions = {}) {
    const i18nextInstance = await initI18next(language, ns)
    return {
        t: i18nextInstance.getFixedT(language, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
        i18n: i18nextInstance
    }
}

export interface RouteParams {
    params: {
        language: string
    }
}
