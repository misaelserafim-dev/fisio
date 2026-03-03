export function clearHeader(headers: Headers): Record<string, string> {
  const obj = Object.fromEntries(headers);
  obj.total = obj?.["x-wp-total"];
  obj.totalPages = obj?.["x-wp-totalpages"];
  return obj;
}
