interface MobileMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  styles: any;
}

export function MobileMenuButton({ menuOpen, toggleMenu, styles }: Omit<MobileMenuProps, 'closeMenu'>) {
  return (
    <button
      className={`${styles.menuToggle} ${menuOpen ? styles.active : ''}`}
      onClick={toggleMenu}
      aria-label="Menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export function MobileMenuOverlay({ menuOpen, closeMenu, styles }: Omit<MobileMenuProps, 'toggleMenu'>) {
  return (
    <div
      className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
      onClick={closeMenu}
    ></div>
  );
}
