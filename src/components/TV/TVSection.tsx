import type { TV } from "../../types/interfaces";
import TVCard from "./TVCard";
import "../../assets/styles/_common.scss"

interface TVSectionProps {
  title: string;
  tv: TV[];
  className: "grid" | "scroll";
}

function TVSection({ title, tv , className}: TVSectionProps) {
  return (
    <section className="media-section">
      <h2 className="media-section-title">{title}</h2>
      <div className={`media-list ${className}`}> 
        {tv.map((tv) => (
          <TVCard key={tv.id} tv={tv} />
        ))}
      </div>
    </section>
  );
}

export default TVSection;
