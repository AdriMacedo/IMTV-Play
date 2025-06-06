import { Link } from "react-router-dom";
import type { TV } from "../../types/interfaces";
import { poster } from "../../utils/imagePath";
import StarRating from "../StarRating/StarRating";
import "../../assets/styles/_common.scss";

interface TVCardProps {
  tv: TV;
}

function TVCard({ tv }: TVCardProps) {
  return (
    <Link to={`/tv/${tv.id}`} aria-label={`View details for ${tv.name}`}>
      <div key={tv.id} className="card">
        <img src={`${poster}${tv.poster_path || ""}`} alt={tv.name} />
        <h3 className="card-title">{tv.name}</h3>
        <div className="footer-items">
          <p className="release-date">{tv.first_air_date.slice(0, 4)}</p>
          <StarRating voteAverage={tv.vote_average} />
        </div>
      </div>
    </Link>
  );
}
export default TVCard;
