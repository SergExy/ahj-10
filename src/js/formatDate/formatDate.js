export default function formatDate(ms) {
  const date = new Date(ms);

  const dd = date.getDate().toString().padStart(2, 0);
  const MM = (date.getMonth() + 1).toString().padStart(2, 0);
  const YY = date.getFullYear().toString().slice(-2);
  const hh = date.getHours().toString().padStart(2, 0);
  const mm = date.getMinutes().toString().padStart(2, 0);

  return `${dd}.${MM}.${YY} ${hh}:${mm}`;
}
