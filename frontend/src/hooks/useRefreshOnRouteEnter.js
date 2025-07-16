import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useRefreshOnRouteEnter = (targetPath, callback) => {
  const location = useLocation();
  const hasRun = useRef(false);

  useEffect(() => {
    if (location.pathname === targetPath && !hasRun.current) {
      callback();
      hasRun.current = true;
    }
  }, [location.pathname, targetPath, callback]);
};

export default useRefreshOnRouteEnter;
