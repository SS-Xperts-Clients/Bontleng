import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const HEADER_OFFSET = 96;

function focusMain() {
  const main = document.querySelector('main');
  if (!main) return;

  main.setAttribute('tabindex', '-1');
  main.focus({ preventScroll: true });
}

function scrollToElement(element) {
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
}

export function ScrollManager() {
  const location = useLocation();
  const previousKey = useRef(location.key);

  useEffect(() => {
    const isFirstRun = previousKey.current === location.key;
    previousKey.current = location.key;

    window.requestAnimationFrame(() => {
      if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        const target = document.getElementById(id);

        if (target) {
          target.setAttribute('tabindex', '-1');
          scrollToElement(target);
          window.setTimeout(() => target.focus({ preventScroll: true }), 350);
          return;
        }
      }

      window.scrollTo({ top: 0, behavior: isFirstRun ? 'auto' : 'smooth' });
      window.setTimeout(focusMain, isFirstRun ? 0 : 350);
    });
  }, [location.pathname, location.hash, location.key]);

  return null;
}