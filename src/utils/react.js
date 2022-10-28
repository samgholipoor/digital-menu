import { useEffect, useRef, useState } from 'react';
import typeOf from './typeOf';

export const useEventListener = (element, ...eventListenerArgs) => {
  useEffect(() => {
    if (element) {
      element.addEventListener(...eventListenerArgs);
    }
    return () => {
      if (element) {
        element.removeEventListener(...eventListenerArgs);
      }
    };
  }, []);
};

export const mergeClassNames = (...args) => args.reduce((result, current) => {
  const type = typeOf(current);
  if (type === 'array') {
    result.push(...mergeClassNames(current));
  } else if (type === 'object') {
    Object.keys(current).forEach((key) => {
      const value = current[key];
      if (value) {
        result.push(key);
      }
    });
  } else if (type === 'function') {
    result.push(current);
  } else if (current) {
    result.push(current);
  }
  return result;
}, []).join(' ');

export const useTraceUpdate = (props) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        // eslint-disable-next-line no-param-reassign
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      // eslint-disable-next-line no-console
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
};

export const useTimeout = () => {
  const [timer, setTimer] = useState(null);
  useEffect(() => () => clearTimeout(timer), []);
  return [
    (...args) => setTimer(setTimeout(...args)),
    () => clearTimeout(timer),
  ];
};
