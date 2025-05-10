// Utility function to format numbers into short form
export const formatShortNumber = (value) => {
  const num = Number(value);

  if (num >= 1_000_000_000) return `${Math.floor(num / 1_000_000_000)}B+`;
  if (num >= 1_000_000) return `${Math.floor(num / 1_000_000)}M+`;
  if (num >= 1_000) return `${Math.floor(num / 1_000)}K+`;

  return `${num}`;
};

// Filter items that end in the current month
export const filterThisMonth = (items) => {
  const now = new Date();
  return items.filter((item) => {
    const date = new Date(item.end_date || item.created);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
};

// Filter items that end in the current year
export const filterThisYear = (items) => {
  const currentYear = new Date().getFullYear();
  return items.filter((item) => {
    const date = new Date(item.end_date || item.created);
    return date.getFullYear() === currentYear;
  });
};

// Filter items that end in the previous year
export const filterLastYear = (items) => {
  const lastYear = new Date().getFullYear() - 1;
  return items.filter((item) => {
    const date = new Date(item.end_date || item.created);
    return date.getFullYear() === lastYear;
  });
};