import { useState } from "react";

export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  return {
    menuOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  };
}
