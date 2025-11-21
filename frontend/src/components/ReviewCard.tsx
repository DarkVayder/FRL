import { NormalizedReview } from "../lib/api";

interface ReviewCardProps {
  review: NormalizedReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Badge colors based on rating
  const getBadgeColor = (rating: number) => {
    if (rating >= 8) return "bg-green-100 text-green-800";
    if (rating >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="mt-3 p-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Public review */}
      <p className="text-gray-700 text-sm mb-2">
        {review.publicReview || <span className="text-gray-400 italic">No public review text</span>}
      </p>

      {/* Guest info */}
      <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-2 items-center">
        <span>By <span className="font-medium text-gray-700">{review.guest}</span></span>
        <span className="px-2 py-0.5 bg-gray-100 rounded">{review.type}</span>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mt-2">
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
