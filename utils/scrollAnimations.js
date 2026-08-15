/**
 * Returns true if `el` is already visible in the viewport by at least
 * `threshold` of its own area (mirrors IntersectionObserver's threshold
 * semantics, but can be checked synchronously on mount).
 */
function isElementVisible(el, threshold) {
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;

  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  const visibleHeight =
    Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth =
    Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

  if (visibleHeight <= 0 || visibleWidth <= 0) return false;

  const visibleRatio =
    (visibleHeight * visibleWidth) / (rect.height * rect.width);
  return visibleRatio >= threshold;
}

/**
 * Wires up the scroll-reveal animation for elements matching `selector`.
 *
 * Elements already visible in the viewport at call time are revealed
 * instantly, with their CSS transition suppressed for that first frame —
 * so a page refresh (or navigation) that lands already scrolled to a
 * section doesn't replay a multi-hundred-ms fade for content the user
 * never actually scrolled past. Elements below the fold are left alone
 * and animate normally as they're scrolled into view.
 *
 * Returns a cleanup function (unobserve + disconnect).
 */
export function initScrollAnimations({
  selector = '.observe',
  threshold = 0.2,
  className = 'in-view',
} = {}) {
  const targets = Array.from(document.querySelectorAll(selector));

  const alreadyVisible = targets.filter((el) =>
    isElementVisible(el, threshold)
  );
  if (alreadyVisible.length) {
    alreadyVisible.forEach((el) =>
      el.classList.add('no-transition', className)
    );
    // Let the browser commit the instant, transition-less state first,
    // then drop the guard so future changes (e.g. a locale switch that
    // resets and replays the animation) still transition normally.
    requestAnimationFrame(() => {
      alreadyVisible.forEach((el) => el.classList.remove('no-transition'));
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold,
    }
  );

  targets.forEach((item) => observer.observe(item));

  return () => {
    targets.forEach((item) => observer.unobserve(item));
    observer.disconnect();
  };
}
