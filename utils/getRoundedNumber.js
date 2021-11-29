export const getRoundedNum = (num) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  if (num > 1000000 && num < 1000000000) {
    return `${(num / 1000000).toFixed(0)}M`;
  }
  if (num > 1000000000 && num < 1000000000000) {
    return `${(num / 1000000000).toFixed(2)}B`;
  }
  return `${(num / 1000000000000).toFixed(2)}T`;
};
