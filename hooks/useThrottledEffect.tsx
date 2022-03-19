import { useEffect, useRef } from "react";

export const useThrottledEffect = (callback : CallableFunction, delay : number, deps : any[] = []) => {
    const lastRan = useRef(Date.now());
  
    useEffect(() => {
      const handler = setTimeout(function () {
        if (Date.now() - lastRan.current >= delay) {
          callback();
          lastRan.current = Date.now();
        }
      }, delay - (Date.now() - lastRan.current));
  
      return () => {
        clearTimeout(handler);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay, ...deps]);
  };


  export function debounce(func : any, wait : number, immediate: boolean) {
    let timeout : any;
    return function () {
        //@ts-ignore
      let context = this,
        args = arguments;
      let later = function () {
        timeout = undefined;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }