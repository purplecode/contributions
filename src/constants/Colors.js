let palette = [
  '#F34235',
  '#E81D62',
  '#9B26AF',
  '#6639B6',
  '#3E50B4',
  '#2095F2',
  '#009587',
  '#00BBD3',
  '#02A8F3',
  '#4BAE4F',
  '#8AC249',
  '#CCDB38',
  '#FEEA3A',
  '#FEC006',
  '#FE9700',
  '#FE5621',
  '#785447',
  '#9D9D9D',
  '#5F7C8A'
];

let cache = {};
let currentIdx = 0;

export default {
  getColor(key) {
    if (!cache[key]) {
      cache[key] = palette[(currentIdx++) % palette.length];
    }
    return cache[key];
  }
}