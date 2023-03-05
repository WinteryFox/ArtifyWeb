// @ts-ignore
import {InitOptions} from "i18next";

export const fallbackLanguage = "en"
export const languages = [fallbackLanguage, "ja"]
export const defaultNS = "common"

export function getOptions (language = fallbackLanguage, ns = defaultNS): InitOptions {
    return {
        //debug: true,
        supportedLngs: languages,
        // preload: languages,
        fallbackLng: fallbackLanguage,
        lng: language,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    }
}
