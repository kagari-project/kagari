import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import appConfig from '../config';

interface SettingState {
  menuOpened: boolean;
}

interface SettingActions {
  updateSettings: (data: Partial<SettingState>) => void;
}

export const useSettingStore = create<SettingState & SettingActions>()(
  devtools(
    persist(
      (setState) => ({
        menuOpened: false,
        updateSettings: (values) => setState(values),
      }),
      {
        name: `${appConfig.localStoragePrefix}.settings`,
      },
    ),
  ),
);
