export interface Categorizable {
  category: string;
}

export function filterByCategory<T extends Categorizable>(
  items: readonly T[],
  category: string
): T[] {
  return category === 'All'
    ? [...items]
    : items.filter(item => item.category === category);
}
