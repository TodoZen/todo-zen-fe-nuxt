<script setup lang="ts">
import { LoginReqDTO } from "~/__generated__/data-contracts";
import { USERNAME_RULES, PASSWORD_RULES } from "@/constants/auth";

const { $api } = useNuxtApp();
const $q = useQuasar();
const userStore = useUserStore();

const USER_ID_COOKIE_NAME = "🍪username🍪";

// 쿠키에 저장된 아이디
const userId = Cookies.get(USER_ID_COOKIE_NAME);

const user = reactive<LoginReqDTO>({ username: "", password: "" });

const rememberMe = ref(!!userId);

const login = async () => {
  try {
    const { data: result } = await $api.login(user);
    if (result.code !== "20000" || !result.data) {
      $q.notify({
        message: result.msg,
        color: "warn",
      });
      return;
    }

    userStore.setUser(result.data);

    LocalStorage.set("userInfo", result.data);
    LocalStorage.set("accessToken", result.data.accessToken);

    // 아이디 저장
    if (rememberMe.value) {
      Cookies.set(USER_ID_COOKIE_NAME, user.username, {
        expires: 365, // days
      });
    } else {
      Cookies.remove(USER_ID_COOKIE_NAME);
    }

    $q.notify({
      message: "로그인 되었습니다.",
      color: "secondary",
    });

    navigateTo("/");
  } catch (e) {
    console.error(e);
  }
};
</script>
<template>
  <div class="row items-center justify-center window-height">
    <q-form @submit="login">
      <q-card class="q-pa-lg">
        <q-card-section class="q-gutter-md">
          <h5 class="text-h5 q-my-lg text-bold text-center">로그인</h5>
          <q-input
            v-model="user.username"
            autofocus
            type="text"
            placeholder="사용자ID를 입력해 주세요."
            autocomplete="username"
            :rules="USERNAME_RULES"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon :name="mdiAccountOutline" /> </template
          ></q-input>
          <q-input
            v-model="user.password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            autocomplete="current-password"
            :rules="PASSWORD_RULES"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon :name="mdiLockOutline" /> </template
          ></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            type="submit"
            unelevated
            color="primary"
            size="lg"
            class="full-width"
            label="로그인"
          />
        </q-card-actions>
        <q-card-section class="q-my-sm q-py-none">
          <div class="row items-center justify-between">
            <q-toggle v-model="rememberMe" label="아이디 저장" dense />
            <a
              class="text-grey cursor-pointer"
              @click.prevent="navigateTo('/forgot-account')"
              >아이디/비밀번호 찾기</a
            >
          </div>
        </q-card-section>
        <q-card-section class="text-center q-py-none">
          <p class="text-grey-6">
            아직 회원이 아니신가요?
            <a
              class="text-secondary cursor-pointer"
              style="text-decoration: underline"
              @click.prevent="navigateTo('/signup')"
              >회원가입</a
            >
          </p>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>
<style scoped>
.q-card {
  min-width: 330px;
}
</style>
