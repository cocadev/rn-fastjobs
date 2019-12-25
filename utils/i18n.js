import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import { Localization } from 'expo';
import en from './en.json';
import cn from './cn.json'
import th from './th.json'
import bm from './bm.json'
import id from './id.json'

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: "languageDetector",
  async: true, // flags below detection to be async
  detect: (callback) => { return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => { callback(locale); }) },
  // detect: callback => {
  //   return /*'en'; */ Localization.getCurrentLocaleAsync().then(
  //     lng => {
  //       callback(lng.replace("_", "-"));
  //     }
  //   );
  // },
  init: () => { },
  cacheUserLanguage: () => { }
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: "en",
    resources: { en, cn, th, bm, id },
    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    }
  });

export default i18n;
