import { Link } from "react-router-dom";
import type { TV } from "../../types/interfaces";
import { poster } from "../../utils/imagePath";

interface TVCardProps {
  tv: TV;
}

function TVCard({ tv }: TVCardProps) {
  const renderStars = (voteAverage: number) => {
    const stars = voteAverage ? Math.round(voteAverage / 2) : 0;

    const filledStars = "★".repeat(stars);
    const emptyStars = "☆".repeat(5 - stars);

    return filledStars + emptyStars;
  };
  return (
    <li key={tv.id}>
      <Link to={`/tv/${tv.id}`}>
        <img src={`${poster}${tv.poster_path || ""}`} alt={tv.name} />
      </Link>
      <h3>{tv.name}</h3>
      <p>{tv.first_air_date.slice(0, 4)}</p>
      <p>{renderStars(tv.vote_average)}</p>
    </li>
  );
}
export default TVCard;
