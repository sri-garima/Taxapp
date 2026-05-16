export function fmt(num) {
  if (num === null || isNaN(num) || num === '') return '₹0';
  return '₹' + Number(num).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export function fmtNum(num) {
  if (!num) return '0';
  return Number(num).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export function toNum(val) {
  if (val === '' || val === null) return 0;
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}

export function calc80CTotal(data) {
  if (!data || !data.has80CItems || !data.investments80C) return 0;
  let total = 0;
  for (const key of data.has80CItems) {
    total += toNum(data.investments80C[key]);
  }
  return total;
}
