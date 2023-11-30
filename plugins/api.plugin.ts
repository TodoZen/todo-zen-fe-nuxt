import { Api } from "~/__generated__/Api";

const AUTH_HEADER = "Authorization";
const TOKEN_TYPE = "BEARER";

export default defineNuxtPlugin((nuxtApp) => {
  const api = new Api({ baseURL: "/" });

  api.instance.interceptors.request.use((config) => {
    const accessToken = LocalStorage.getItem("accessToken");
    if (accessToken) {
      config.headers[AUTH_HEADER] = `${TOKEN_TYPE} ${accessToken}`;
    }
    return config;
  });

  api.instance.interceptors.response.use(
    function onFulfilled(response) {
      return response;
    },
    async function onRejected(error) {
      if (error.response.data) {
        return Promise.resolve(error.response);
      } else if (error.response.status === 401) {
        // alert("인증 에러");
        const refreshToken = LocalStorage.getItem("refreshToken");

        if (!refreshToken) {
          auth.logout();
          return Promise.reject(error);
        }

        try {
          // TODO 리프레시토큰으로 액세스토큰 발급
          // const response = await api.refresh({ refreshToken });
          // if (response) {
          //   const { accessToken, refreshToken } = response.data.token;
          //   LocalStorage.set("accessToken", accessToken);
          //   LocalStorage.set("refreshToken", refreshToken);
          //   // 재전송
          //   return await api.instance.request(error.config);
          // }
        } catch (e) {
          auth.logout();
          return Promise.reject(error);
        }
      } else if (error.response.status === 403) {
        // alert("인가 에러");
      } else if (error.response.status === 500) {
        // alert("예기치 못한 에러가 발생했습니다.");
      }

      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
