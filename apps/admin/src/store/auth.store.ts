import createReactStore from 'zustand';
import vanilla from 'zustand/vanilla';
import { persist, devtools } from 'zustand/middleware';
import { getProfile } from '../api';
import router from '../config/router';
import { User } from '../typings';
import appConfig from '../config';

interface AuthState {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  isLoading: boolean;
  login: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  getProfile: () => Promise<void>;
}

export const authStore = vanilla<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        isLoading: false,
        login: (user: User, accessToken: string, refreshToken?: string) =>
          set({ user, accessToken, refreshToken }),
        logout: () =>
          set({
            user: undefined,
            accessToken: undefined,
            refreshToken: undefined,
          }),
        getProfile: async () => {
          try {
            set({ isLoading: true });
            const res = await getProfile();
            set({ user: res.data });
          } catch (e) {
            router.navigate(appConfig.loginUrl, { replace: true });
            throw e;
          } finally {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: `${appConfig.localStoragePrefix}.auth`,
      },
    ),
  ),
);

export const useAuthStore = createReactStore(authStore);
