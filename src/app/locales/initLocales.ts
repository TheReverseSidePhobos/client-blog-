import intl from "react-intl-universal";

const locales = {
  "ru-RU": require("./ru-RU.json"),
  "en-US": require("./en-US.json"),
};

export const initLocales = (name: string): void => {
  intl.init({
    currentLocale: name,
    locales,
  });
};
