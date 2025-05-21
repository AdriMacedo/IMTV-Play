import type { CastMember } from "../../types/interfaces";
import { profile } from "../../utils/imagePath";

interface CastListProps {
  cast: CastMember[];
}

function CastList({ cast }: CastListProps) {
  return (
    <div>
      <h2>CAST</h2>
      <div>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <div key={actor.id}>
              <img
                src={
                  actor.profile_path ? `${profile}${actor.profile_path}` : ""
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </div>
          ))
        ) : (
          <p>No cast information available</p>
        )}
      </div>
    </div>
  );
}

export default CastList;
