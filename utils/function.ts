export const dmToCm = (val: number): number => val * 10

export const hmToKg = (val: number): number => val / 10

export const formatString = (input: string): string => {
  // Replace hyphens with spaces and capitalize the first letter of each word
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
