import { Link } from "react-router-dom";
import type { Movie, TV } from "../../types/interfaces";
import { profile } from "../../utils/imagePath";
import "../../assets/styles/_common.scss";

interface SimilarListProps {
  items: (Movie | TV)[];
  type: "movie" | "tv";
}

function SimilarList({ items, type }: SimilarListProps) {
  const hasItems = items.length > 5;
  return (
    <section className="media-section similar">
      <h2>MORE LIKE THIS</h2>
      <div className="media-wrapper">
        {hasItems && <span className="scroll-indicator left">❮</span>}
        <div className="media-list scroll similar">
          {items.length > 0 ? (
            items.map((media) => (
              <Link to={`/${type}/${media.id}`} key={media.id}>
                <img
                  className="similar-images"
                  src={
                    media.poster_path ? `${profile}${media.poster_path}` : ""
                  }
                  alt={"title" in media ? media.title : media.name}
                />
              </Link>
            ))
          ) : (
            <p>No related content found</p>
          )}
        </div>
        {hasItems && <span className="scroll-indicator right">❯</span>}{" "}
      </div>
    </section>
  );
}

export default SimilarList;
