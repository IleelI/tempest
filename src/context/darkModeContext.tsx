import type { ReactNode } from "react";
import { useContext } from "react";
import { createContext } from "react";
import type { UseDarkModeReturn } from "hooks/useDarkMode/useDarkMode";
import useDarkMode from "hooks/useDarkMode/useDarkMode";

type DarkModeContextType = UseDarkModeReturn;
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

type DarkModeProviderType = {
  children: ReactNode;
  prefersSystemSettings?: boolean;
};
function DarkModeProvider({
  children,
  prefersSystemSettings,
}: DarkModeProviderType) {
  const darkMode = useDarkMode(prefersSystemSettings);

  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider"
    );
  }
  return context;
};

export { DarkModeProvider, useDarkModeContext };
