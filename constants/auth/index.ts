import { ValidationRule } from "quasar";

export const USERNAME_RULES: ValidationRule<string>[] = [
  (value) => !!value?.trim() || "사용자ID를 입력해 주세요.",
  (value) =>
    (value.length >= 3 && value.length <= 20) ||
    "사용자ID를 3~20자리로 입력하세요.",
];

export const PASSWORD_RULES: ValidationRule<string>[] = [
  (value) => !!value?.trim() || "비밀번호를 입력해 주세요.",
  (value) =>
    (value.length >= 4 && value.length <= 20) ||
    "비밀번호를 4~20자리로 입력하세요.",
];
