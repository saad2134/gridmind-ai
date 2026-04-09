"use client";

import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from "next-themes";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  );
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="theme"
    >
      <ThemeContextProvider mounted={mounted}>{children}</ThemeContextProvider>
    </NextThemeProvider>
  );
}

function ThemeContextProvider({ children, mounted }: { children: ReactNode; mounted: boolean }) {
  const { theme, setTheme } = useNextTheme();
  
  return (
    <ThemeContext.Provider value={{ theme: mounted ? (theme ?? "system") : "system", setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}