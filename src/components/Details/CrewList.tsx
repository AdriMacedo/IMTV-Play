import type { CrewMember } from "../../types/interfaces";
import "../../assets/styles/_common.scss";

interface CrewListProps {
  crew: CrewMember[];
}
function CrewList({ crew }: CrewListProps) {
  const hasItems = crew.length > 5;
  return (
    <div className="cast-section">
      <h2>CREW</h2>
      <div className="cast-wrapper">
        {hasItems && <span className="scroll-indicator left scroll">❮</span>}
        <div className="cast-list">
          {crew.length > 0 ? (
            crew.map((member) => (
              <div key={member.id} className="cast-card">
                <div className="cast-info">
                  <h4 className="cast-name">{member.name}</h4>
                  <p className="cast-character">{member.job}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No crew information available</p>
          )}
        </div>
        {hasItems && <span className="scroll-indicator right scroll">❯</span>}
      </div>
    </div>
  );
}

export default CrewList;
