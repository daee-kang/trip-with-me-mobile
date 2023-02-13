import { createContext } from 'react';

export const ThemeModeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});
