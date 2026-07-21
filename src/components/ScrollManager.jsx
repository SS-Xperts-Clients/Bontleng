import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const HEADER_OFFSET = 96;
const MAX_TARGET_ATTEMPTS = 8;

function focusMain() {
  const main = document.querySelector('main');
  if (!main) return;

  main.setAttribute('tabindex', '-1');
  main.focus({ preventScroll: true });
}

function getTargetTop(element) {
  const rect = element.getBoundingClientRect();

  if (element.dataset.scrollAlign === 'center') {
    return rect.top + window.scrollY - (window.innerHeight - rect.height) / 2;
  }

  return rect.top + window.scrollY - HEADER_OFFSET;
}

function scrollToElement(element) {
  window.scrollTo({ top: Math.max(getTargetTop(element), 0), behavior: 'smooth' });
}

export function ScrollManager() {
  const location = useLocation();
  const previousKey = useRef(location.key);

  useEffect(() => {
    const isFirstRun = previousKey.current === location.key;
    previousKey.current = location.key;

    function scrollToHashTarget(attempt = 0) {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);

      if (!target) {
        if (attempt < MAX_TARGET_ATTEMPTS) {
          window.setTimeout(() => scrollToHashTarget(attempt + 1), 50);
        }
        return;
      }

      target.setAttribute('tabindex', '-1');
      scrollToElement(target);
      window.setTimeout(() => target.focus({ preventScroll: true }), 350);
    }

    window.requestAnimationFrame(() => {
      if (location.hash) {
        scrollToHashTarget();
        return;
      }

      window.scrollTo({ top: 0, behavior: isFirstRun ? 'auto' : 'smooth' });
      window.setTimeout(focusMain, isFirstRun ? 0 : 350);
    });
  }, [location.pathname, location.hash, location.key]);

  return null;
}