// https://nuxt.com/docs/api/configuration/nuxt-config
import chalk from "chalk";
const { PROFILE } = process.env;

console.log(chalk.blue(`✨✨✨ ${PROFILE} is running. ✨✨✨`));

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  vue: {
    runtimeCompiler: true, //추가
  },
  modules: ["nuxt-quasar-ui", "@pinia/nuxt"],
  quasar: {
    lang: "ko-KR",
    plugins: [
      "Notify",
      "LocalStorage",
      "SessionStorage",
      "Cookies",
      "Loading",
      "LoadingBar",
    ],
    config: {
      // notify
      loadingBar: {
        color: "secondary",
      },
    },
    extras: {
      svgIcons: ["material-icons", "mdi-v7"],
    },
  },
  css: ["~/assets/css/main.css"],
  nitro: {
    devProxy: {
      // 개발 API
      "/api": {
        target: "http://localhost:8080/api",
        changeOrigin: true,
      },
    },
  },
  typescript: {
    // https://nuxt.com/docs/getting-started/installation#prerequisites
    shim: false,
  },
});
