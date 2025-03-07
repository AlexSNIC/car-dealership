export default function Display({ path }) {
  const pathString = path
    .map((value) => (value ? value + " > " : ""))
    .join("")
    .slice(0, -3);
  return (
    <div className="display">
      <div className="database__title">{pathString}</div>
    </div>
  );
}
