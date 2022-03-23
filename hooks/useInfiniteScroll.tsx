import { useState, useEffect, Ref, useRef, useCallback } from 'react';
import { debounce, useThrottledEffect } from './useThrottledEffect';

const useInfiniteScroll = (callback : CallableFunction) => {
  const [isFetching, setIsFetching] = useState<any>(false);
  const ref : any = useRef(null);
  const stop = useRef(false); // to stop calling callback once True
  

  useThrottledEffect(() => {
    // mounts window listener and call debounceScroll, once in every 500ms
    window.addEventListener("scroll", debounceScroll());
    return () => window.removeEventListener("scroll", debounceScroll());
  }, 500);

  useThrottledEffect(
    // execute callback when isFetching becomes true, once in every 500ms
    () => {
      if (!isFetching) {
        return;
      } else {
        // Execute the fetch more data function
        callback();
      }
    },
    500,
    [isFetching]
  );

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <=
        Math.floor(document.documentElement.offsetHeight * 0.75) ||
      isFetching
    )
      // return if below 75% scroll or isFetching is false then don't do anything
      return;
    // if stop (meaning last page) then don't set isFetching true
    if (!stop.current) setIsFetching(true);
  }

  function debounceScroll() {
    // execute the last handleScroll function call, in every 100ms
    return debounce(handleScroll, 100, false);
  }
  return [isFetching, setIsFetching, stop];
}
export default useInfiniteScroll;