// components/scrollTop/scrollTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page whenever the route changes
  }, [pathname]);

  return null; // No visible UI, just a side effect of scroll
};

export default ScrollToTop;
