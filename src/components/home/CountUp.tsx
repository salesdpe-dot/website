/*
 * A figure such as "1,102" or "4.7/5", shown as it is. It used to count up from nothing, but a screenshot or a quick
 * scroll could catch it half way ("1,065 homes"), which reads as a wrong figure. Now the final figure is in the
 * server HTML and never changes. The name and props stay, so callers need no change.
 */
export function CountUp({ value }: { value: string }) {
  return <>{value}</>;
}
