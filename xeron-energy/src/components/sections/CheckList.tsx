import { FiCheck } from "react-icons/fi";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function CheckList({
  items,
  columns = 2,
}: {
  items: string[];
  columns?: 1 | 2;
}) {
  return (
    <Stagger
      className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      gap={0.06}
    >
      {items.map((item) => (
        <StaggerItem key={item}>
          <div className="flex items-start gap-3 rounded-2xl glass p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-volt/15 text-volt">
              <FiCheck className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm text-frost">{item}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
