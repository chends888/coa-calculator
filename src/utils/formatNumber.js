/**
 * Formats a number for display: abbreviates millions/billions with M/B
 * suffixes, and falls back to comma-separated digits for anything smaller.
 *
 * Examples:
 *   formatNumber(950)          -> "950"
 *   formatNumber(12500)        -> "12,500"
 *   formatNumber(1500000)      -> "1.5M"
 *   formatNumber(2000000)      -> "2M"
 *   formatNumber(3250000000)   -> "3.25B"
 */
export const formatNumber = (num) => {
  const value = Number(num);
  if (Number.isNaN(value)) return String(num);

  const abs = Math.abs(value);

  if (abs >= 1_000_000_000) {
    return trimTrailingZeros(value / 1_000_000_000) + "B";
  }
  if (abs >= 1_000_000) {
    return trimTrailingZeros(value / 1_000_000) + "M";
  }

  // Below a million: keep exact value with comma separators.
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Rounds to 2 decimals and strips unnecessary trailing zeros
// (e.g. 2.00 -> "2", 1.50 -> "1.5", 1.23 -> "1.23").
const trimTrailingZeros = (num) => {
  return num.toFixed(2).replace(/\.?0+$/, "");
};

export default formatNumber;
