type SpecLineProps = {
  items: readonly string[];
};

export function SpecLine({ items }: SpecLineProps) {
  return (
    <p className="spec-line">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </p>
  );
}
