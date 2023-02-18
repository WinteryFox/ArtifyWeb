// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import common from "@/app/i18n/locales/en/common.json";

declare module "i18next" {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS;
        // custom resources type
        resources: {
            common: typeof common;
        };
        // other
    }
}
