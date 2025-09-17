// src/utils/ScrollNavigation.js
// Helper functions to integrate with navbar or other navigation

let scrollController = null;

export const setScrollController = (controller) => {
  scrollController = controller;
};

export const navigateToSection = (sectionName) => {
  if (!scrollController) return;

  const sectionMap = {
    'hero': 0,
    'showcase': 1,
    'experience': 2,
    'tech': 3,
    'contact': 4,
    'footer': 5
  };

  const sectionIndex = sectionMap[sectionName.toLowerCase()];
  if (sectionIndex !== undefined) {
    scrollController.goToSection(sectionIndex);
  }
};

export const getCurrentSectionInfo = () => {
  if (!scrollController) return null;
  return scrollController.getCurrentSection();
};

// Hook for React components to get current section
export const useCurrentSection = () => {
  // This would need to be implemented with state management
  // For now, it's a simple getter
  return getCurrentSectionInfo();
};