import ID from "@/types/id";

interface GridColumnProps {
  items: { id: ID }[];
  header: string;
  emptyMessage: string;
  Element: React.ElementType;
}

export default function GridColumn({
  items,
  header,
  emptyMessage,
  Element,
}: GridColumnProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{header}</h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <Element key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">{emptyMessage}</p>
      )}
    </div>
  );
}
