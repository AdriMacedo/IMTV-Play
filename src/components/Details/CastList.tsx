import type { CastMember } from "../../types/interfaces";
import { profile } from "../../utils/imagePath";
import "../../assets/styles/_common.scss";

interface CastListProps {
  cast: CastMember[];
}

function CastList({ cast }: CastListProps) {
  return (
    <div className="cast-section">
      <h2>CAST</h2>
      <div className="cast-wrapper">
      <span className="scroll-indicator left scroll">❮</span>
        <div className="cast-list">
          {cast.length > 0 ? (
            cast.map((actor) => (
              <div key={actor.id} className="cast-card">
                <div className="cast-photo">
                  <img
                    src={
                      actor.profile_path
                        ? `${profile}${actor.profile_path}`
                        : ""
                    } alt={actor.name}
                  />
                </div>
                <div className="cast-info">
                  <h4 className="cast-name">{actor.name}</h4>
                  <p className="cast-character">{actor.character}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No cast information available</p>
          )}
        </div>
        <span className="scroll-indicator right scroll">❯</span>
      </div>
    </div>
  );
}

export default CastList;
