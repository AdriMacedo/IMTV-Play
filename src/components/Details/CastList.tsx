import type { CastMember } from "../../types/interfaces";

interface CastListProps {
  cast: CastMember[];
}

function CastList({ cast }: CastListProps) {
  return (
    <div>
      <h2>CAST</h2>
      <div>
        {cast.map((actor) => (
          <div key={actor.id}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <div> NO IMAGE </div> // colocar aqui uma imagem vazia
            )}
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CastList;
