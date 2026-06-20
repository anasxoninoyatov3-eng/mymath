import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      isDarkMode: false,
      isMobileMenuOpen: false,
      toggleSidebar: () => set((state: UiState) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      toggleDarkMode: () => set((state: UiState) => ({ isDarkMode: !state.isDarkMode })),
      toggleMobileMenu: () => set((state: UiState) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
