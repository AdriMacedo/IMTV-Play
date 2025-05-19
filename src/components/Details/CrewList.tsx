import type { CrewMember } from "../../types/interfaces";

interface CrewListProps {
  crew: CrewMember[];
}
function CrewList({ crew }: CrewListProps) {
  return (
    <div>
      <h2>CREW</h2>
      <div>
        {crew.length > 0 ? (
          crew.map((member) => (
            <div key={member.id}>
              <p>{member.name}</p>
              <p>{member.job}</p>
            </div>
          ))
        ) : (
          <p>No crew information available</p>
        )}
      </div>
    </div>
  );
}

export default CrewList;
