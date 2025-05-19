import type { TV } from "../../types/interfaces";
import TVCard from "./TVCard";

interface TVSectionProps {
  title: string;
  tv: TV[];
}

function TVSection({ title, tv }: TVSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {tv.map((tv) => (
          <TVCard key={tv.id} tv={tv} />
        ))}
      </ul>
    </section>
  );
}

export default TVSection;
