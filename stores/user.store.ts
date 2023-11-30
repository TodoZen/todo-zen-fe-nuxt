import { LoginResDTO } from "~/__generated__/data-contracts";

interface UserStore {
  user: LoginResDTO | null;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserStore => ({
    user: LocalStorage.getItem<LoginResDTO>("userInfo"),
  }),
  actions: {
    setUser: function (userInfo: LoginResDTO | null) {
      this.$patch({ user: userInfo });
      if (userInfo) {
        LocalStorage.set("userInfo", userInfo);
      } else {
        LocalStorage.remove("userInfo");
      }
    },
  },
});
