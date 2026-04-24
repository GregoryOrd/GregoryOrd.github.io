/**
 * ResponsiveManager - Centralized responsive design utility
 * Replaces duplicated sizing() functions and deprecated APIs
 * 
 * Usage:
 *   ResponsiveManager.initialize();
 *   ResponsiveManager.onBreakpointChange((breakpoint) => { ... });
 *   ResponsiveManager.getBreakpoint(); // 'mobile', 'tablet', 'desktop'
 *   ResponsiveManager.isLandscape(); // true/false
 */

const ResponsiveManager = {
  // Breakpoint definitions (in pixels)
  BREAKPOINTS: {
    mobile: 0,      // 0px - 767px
    tablet: 768,    // 768px - 1023px
    desktop: 1024   // 1024px+
  },

  // State
  currentBreakpoint: null,
  isCurrentlyLandscape: null,
  listeners: [],
  navbarHeight: 50,
  resizeObserver: null,
  resizeTimeout: null,

  /**
   * Initialize responsive manager
   * Call once on page load
   */
  initialize() {
    this.updateBreakpoint();
    this.syncNavbarHeight();
    
    // Use throttled resize handler (modern approach, replaces onresize attribute)
    window.addEventListener('resize', () => this.throttledResize());
    window.addEventListener('orientationchange', () => this.handleOrientationChange());
    
    // If ResizeObserver available, watch navbar iframe for height changes
    if (window.ResizeObserver) {
      this.initResizeObserver();
    }
  },

  /**
   * Determine current breakpoint based on window width
   */
  updateBreakpoint() {
    let newBreakpoint;
    if (window.innerWidth < this.BREAKPOINTS.tablet) {
      newBreakpoint = 'mobile';
    } else if (window.innerWidth < this.BREAKPOINTS.desktop) {
      newBreakpoint = 'tablet';
    } else {
      newBreakpoint = 'desktop';
    }

    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;
      this.notifyListeners();
    }

    return newBreakpoint;
  },

  /**
   * Check if device is in landscape orientation
   * Uses modern window.matchMedia instead of deprecated window.orientation
   */
  isLandscape() {
    return window.matchMedia('(orientation: landscape)').matches;
  },

  /**
   * Get current breakpoint ('mobile', 'tablet', 'desktop')
   */
  getBreakpoint() {
    return this.currentBreakpoint;
  },

  /**
   * Register callback for breakpoint changes
   * Useful for pages that need to adjust layout on resize
   */
  onBreakpointChange(callback) {
    this.listeners.push(callback);
  },

  /**
   * Notify all listeners of breakpoint change
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentBreakpoint);
      } catch (err) {
        console.error('ResponsiveManager listener error:', err);
      }
    });
  },

  /**
   * Handle orientation change without page reload
   * Replaces deprecated window.onorientationchange = location.reload()
   */
  handleOrientationChange() {
    // Small delay to ensure media queries have recalculated
    setTimeout(() => {
      this.updateBreakpoint();
      this.syncNavbarHeight();
    }, 100);
  },

  /**
   * Throttled resize handler
   * Prevents excessive updates during resize dragging
   */
  throttledResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.updateBreakpoint();
      this.syncNavbarHeight();
    }, 150); // 150ms debounce
  },

  /**
   * Sync navbar height from iframe and apply to elements
   * Replaces hardcoded padding calculations in sizing()
   */
  syncNavbarHeight() {
    try {
      const navbarFrame = document.querySelector('.navbarFrame');
      if (!navbarFrame || !navbarFrame.contentDocument) {
        return;
      }

      const navBar = navbarFrame.contentDocument.getElementById('NavigationBar');
      if (navBar) {
        this.navbarHeight = navBar.offsetHeight;
      }

      // Apply navbar height to carousel rows if they exist
      const carouselRow = document.getElementById('CarouselRow');
      if (carouselRow) {
        carouselRow.style.paddingTop = this.navbarHeight + 'px';
      }

      // Apply navbar padding to info sections if they exist
      const infoSection = document.getElementById('info');
      if (infoSection) {
        infoSection.style.paddingBottom = (this.navbarHeight + 10) + 'px';
      }
    } catch (err) {
      // Cross-origin iframe access may fail; gracefully degrade
      console.debug('ResponsiveManager: Could not access navbar iframe', err);
    }
  },

  /**
   * Initialize ResizeObserver to watch navbar iframe
   * More efficient than polling on every resize
   */
  initResizeObserver() {
    const navbarFrame = document.querySelector('.navbarFrame');
    if (!navbarFrame) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.syncNavbarHeight();
    });

    this.resizeObserver.observe(navbarFrame);
  },

  /**
   * Get helper for media query testing
   * Usage: ResponsiveManager.matches('(max-width: 768px)')
   */
  matches(mediaQueryString) {
    return window.matchMedia(mediaQueryString).matches;
  },

  /**
   * Cleanup (optional, useful if page is dynamically unloaded)
   */
  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    clearTimeout(this.resizeTimeout);
    this.listeners = [];
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ResponsiveManager.initialize();
  });
} else {
  // DOM already loaded
  ResponsiveManager.initialize();
}
