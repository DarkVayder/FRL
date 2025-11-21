import { NormalizedReview } from "../lib/api";

interface ReviewCardProps {
  review: NormalizedReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Helper to determine badge color based on rating
  const getBadgeColor = (rating: number) => {
    if (rating >= 8) return "bg-green-100 text-green-800";
    if (rating >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="mt-3">
      <p className="text-sm mb-2 text-gray-700">
        {review.publicReview || (
          <span className="text-gray-400 italic">No public review text</span>
        )}
      </p>

      <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-2">
        <span>By <span className="font-medium text-gray-700">{review.guest}</span></span>
        <span className="px-2 py-0.5 bg-gray-100 rounded">{review.type}</span>
      </div>

      {/* Categories with ratings */}
      <div className="mt-2 flex gap-2 flex-wrap">
        {review.categories.map((c) => (
          <span
            key={c.name}
            className={`text-xs px-2 py-1 rounded font-medium ${getBadgeColor(c.rating)}`}
          >
            {c.name}: {c.rating}
          </span>
        ))}
      </div>
    </div>
  );
}
