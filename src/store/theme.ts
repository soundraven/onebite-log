import type { Theme } from "@/types";
import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

type State = {
  theme: Theme;
};

const initialState: State = {
  theme: "light",
};

const useThemeStore = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setTheme: (theme: Theme) => {
            const htmlTag = document.documentElement;

            // 1. 다크모드 여부 결정
            const isDark =
              theme === "dark" ||
              (theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

            // 2. 한 번에 적용
            htmlTag.classList.toggle("dark", isDark);

            // (선택) 시스템 UI 색상도 같이 맞춰주기
            htmlTag.style.colorScheme = isDark ? "dark" : "light";

            set({ theme });
          },
        },
      })),
      {
        name: "ThemeStore",
        partialize: (store) => ({
          theme: store.theme,
        }),
      },
    ),
    { name: "ThemeStore" },
  ),
);

export const useTheme = () => {
  const theme = useThemeStore((store) => store.theme);
  return theme;
};

export const useSetTheme = () => {
  const setTheme = useThemeStore((store) => store.actions.setTheme);
  return setTheme;
};
