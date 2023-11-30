const isLoggedIn = () => {
  const userStore = useUserStore();
  // console.log({ bool: !!userStore.user, user: userStore.user });

  return !!userStore.user;
};
const logout = () => {
  const userStore = useUserStore();
  userStore.setUser(null);

  // LocalStorage.clear();
  LocalStorage.remove("userInfo");
  LocalStorage.remove("accessToken");
  LocalStorage.remove("refreshToken");

  navigateTo("/");
};

export const auth = {
  isLoggedIn,
  logout,
};
