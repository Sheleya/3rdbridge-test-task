export const capitalize = (value: string) => {
  return value
    .split(/(\s|-|,)/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}