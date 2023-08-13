export const getRandomString = () => {
  const chars = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // upper
    'abcdefghijklmnopqrstuvwxyz', // lower
    '0123456789', // numbers
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // either
  ];

  return [1, 1, 1, 4]
    .map((len, i) =>
      Array(len)
        .fill(chars[i])
        .map((x) => x[Math.floor(Math.random() * x.length)])
        .join('')
    )
    .concat()
    .join('')
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};
