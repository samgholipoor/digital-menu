export default (argsArray) => {
  let currentIndex = 0;
  return () => {
    const returnValue = argsArray[currentIndex];
    currentIndex += 1;
    return returnValue;
  };
};
