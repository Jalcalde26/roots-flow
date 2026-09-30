import { createContext, useContext } from "react";

const LayoutContext = createContext(null);

export function useLayoutContext() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayoutContext debe usarse dentro de RootsflowLayout");
  return ctx;
}

export default LayoutContext;