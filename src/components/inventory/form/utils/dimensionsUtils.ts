
export const convertToInches = (meters: number): number => {
  if (typeof meters !== 'number' || isNaN(meters)) return 0;
  return Number((meters * 39.37).toFixed(2));
};

export const convertToMeters = (inches: number): number => {
  if (typeof inches !== 'number' || isNaN(inches)) return 0;
  return Number((inches / 39.37).toFixed(4));
};

export const formatDisplayValue = (value: unknown, useInches: boolean): string => {
  if (value === undefined || value === null) return "";
  const numValue = Number(value);
  if (isNaN(numValue) || numValue === 0) return "";
  return useInches ? convertToInches(numValue).toFixed(2) : numValue.toFixed(2);
};

export const DIMENSION_LIMITS = {
  maxLength: 60, // 60m = ~2362.2"
  maxWidth: 1.82, // 1.82m = ~71.65"
};
