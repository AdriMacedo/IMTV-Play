import { Link } from "react-router-dom";
import type { Movie, TV } from "../../types/interfaces";
import { poster } from "../../utils/imagePath";

interface SimilarListProps {
  items: (Movie | TV)[];
  type: "movie" | "tv";
}

function SimilarList({ items, type }: SimilarListProps) {
  return (
    <div>
      <h2>MORE LIKE THIS</h2>
      <div>
        {items.length > 0 ? (
          items.map((media) => (
            <Link to={`/${type}/${media.id}`} key={media.id}>
              <img
                src={media.poster_path ? `${poster}${media.poster_path}` : ""}
                alt={"title" in media ? media.title : media.name}
              />
            </Link>
          ))
        ) : (
          <p>No related content found</p>
        )}
      </div>
    </div>
  );
}

export default SimilarList;
