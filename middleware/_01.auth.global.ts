export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  const { path } = to;

  // 로그인
  if (!isGuestPath(path) && !auth.isLoggedIn()) {
    return navigateTo("/auth/login", { replace: true });
  }

  if (
    (path === "/auth/login" || path === "/auth/signup") &&
    auth.isLoggedIn()
  ) {
    auth.logout();
    return;
  }
});

function isGuestPath(path: string) {
  // 로그인
  const GUEST_PATH_LIST: string[] = ["/auth/login", "/auth/signup"];

  return GUEST_PATH_LIST.includes(path);
}
