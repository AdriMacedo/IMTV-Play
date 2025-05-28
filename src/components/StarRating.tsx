interface StarRatingProps {
  voteAverage: number;
}

function StarRating({ voteAverage }: StarRatingProps) {
  const rating = voteAverage / 2;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars > 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="stars">
      {"★"
        .repeat(fullStars)
        .split("")
        .map((star, index) => (
          <span key={index} className="gold">{star}</span>
        ))}
      {halfStar && (
      <span className="half-star">
        <span className="gold">★</span>
        <span className="gray">★</span>
    </span>
      )}
      {"★"
        .repeat(emptyStars)
        .split("")
        .map((star, index) => (
          <span key={index} className="gray">{star}</span>
        ))}
    </div>
  );
}

export default StarRating;
