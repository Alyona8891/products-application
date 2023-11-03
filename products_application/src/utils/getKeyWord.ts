export function getKeyWord(): string {
  const keyWord = localStorage.getItem('alyona8891_keyword');
  if (keyWord) {
    return keyWord;
  } else {
    return '';
  }
}
