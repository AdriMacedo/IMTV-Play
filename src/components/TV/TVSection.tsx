import type { TV } from "../../types/interfaces";
import TVCard from "./TVCard";
import "../../assets/styles/_common.scss";
import Spinner from "../Spinner/Spinner";

interface TVSectionProps {
  title: string;
  tv: TV[];
  className: "grid" | "scroll";
  loading: boolean;
}

function TVSection({ title, tv, className, loading = false }: TVSectionProps) {
  return (
    <section className="media-section">
      <h2 className="media-section-title">{title}</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="media-wrapper">
          <span className="scroll-indicator left">❮</span>
          <div className={`media-list ${className}`}>
            {tv.map((tv) => (
              <TVCard key={tv.id} tv={tv} />
            ))}
          </div>
          <span className="scroll-indicator right">❯</span>
        </div>
      )}
    </section>
  );
}

export default TVSection;
