export default function classNames(...rest) {
  const classes = [];

  rest.forEach((arg) => {
    if (!arg) {
      return;
    }

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
}
